import { 
    GET_TRANSFER_LIST, 
    UPDATE_TRANSFER_STATUS,
    UPDATE_TRANSFER_STATUS_ERROR,
    SET_TRANSFER_UPDATE_API_STATE,
    ADD_PATIENT_TRANSFER,
    ADD_PATIENT_TRANSFER_ERROR,
    SET_TRANSFER_ADD_API_STATE,
} from "Reducers/Types";

const transfers = (state = {apiSuccess: null}, action) => {
    switch (action.type) {
        case GET_TRANSFER_LIST:
            return { 
                ...state,
                ...action.data,
                error_message: {} 
            }; 
        case UPDATE_TRANSFER_STATUS: {
            const newState = {...state};
            const {id, status, status_updated_at, comments } = action.data
            newState.results = newState.results.map(result => {
                if(result.id === id) {
                    result.status = status;
                    result.status_updated_at = status_updated_at;
                    result.comments = comments;
                }
                return result
            });
            newState.update_transfer_errors = {}; 
            newState.apiSuccess = true;
            return newState;
        }
        case ADD_PATIENT_TRANSFER:
            return {
                ...state,
                apiSuccess: true,
                add_transfer_errors: {}
            }
        case UPDATE_TRANSFER_STATUS_ERROR:
            return { 
                ...state,
                update_transfer_errors: action.data,
                apiSuccess: false
            };
        case ADD_PATIENT_TRANSFER_ERROR:
            return { 
                ...state,
                add_transfer_errors: action.data,
                apiSuccess: false
            };
        case SET_TRANSFER_UPDATE_API_STATE:
            return { 
                ...state,
                ...action.data
            };
        case SET_TRANSFER_ADD_API_STATE:
            return { 
                ...state,
                ...action.data
            };
        default:
            return state;
    }
};

export { transfers };
