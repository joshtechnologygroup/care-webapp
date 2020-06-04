import { 
    CREATE_TOAST_NOTIFICATION,
} from "Reducers/Types";

const toasts = (state = [], action) => {
    switch (action.type) {
        case CREATE_TOAST_NOTIFICATION:
            return [
                ...state,
                action.data
            ];
        default:
            return state;
    }
};

export { toasts };
