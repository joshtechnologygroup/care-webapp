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
        newState.results = newState.results.map(result => {
            if(result.id === action.data.id) {
                result.status = action.data.status;
                result.status_updated_at = action.data.status_updated_at;
                result.comments = action.data.comments;
            }
            return result
        })
        return newState;
    }
    return state;
};

export { transfers };
