import { GET_TRANSFER_LIST, UPDATE_TRANSFER_STATUS } from "Reducers/Types";

const transfers = (state = {}, action) => {
    if (action.type === GET_TRANSFER_LIST || action.type === UPDATE_TRANSFER_STATUS) {
        return { 
            ...state,
            ...action.data 
        };
    }
    return state;
};

export { transfers };
