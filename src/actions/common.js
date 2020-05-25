import * as HttpStatus from 'http-status-codes';

const dispatchAction = (actionType, response) => async (dispatch) => {
    const data = await response.json();
    if (response.status === HttpStatus.OK) {
        dispatch({
            type: actionType,
            data: data
        });
        return { status: response.ok };
    } else {
        return { status: response.ok, error_message: data.non_field_errors };
    }
}

export { dispatchAction }
