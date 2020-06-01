import { GET_TRANSFER_LIST, UPDATE_TRANSFER_STATUS } from "Reducers/Types";

const transfers = (state = {}, action) => {
    if (action.type === GET_TRANSFER_LIST) {
        return { 
            ...state,
            ...action.data,
            error_message: {} 
        };
    }
    else if (action.type === UPDATE_TRANSFER_STATUS) {
        const newState = {...state};
        const {id, status, status_updated_at, comments } = action.data
        newState.results = newState.results.map(result => {
            if(result.id === id) {
                result.status = status;
                result.status_updated_at = status_updated_at;
                result.comments = comments;
            }
            return result
        })
        return newState;
    }
    return state;
};

export { transfers };
