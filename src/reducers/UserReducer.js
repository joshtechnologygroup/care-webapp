import { 
    SET_USER,
    CLEAR_USER,
    GET_USER_PROFILE,
} from 'Reducers/Types';
import { UPDATE_USER_PROFILE_ERROR, SET_UPATE_USER_PROFILE_API_STATE } from './Types';

const initialState = {
  id: null
};

const user = (state = initialState, action) => {    

    switch (action.type) {

        case SET_USER:
            return { ...state,...action.data };

        case CLEAR_USER:
            return {...initialState}

        default:
            return state;
    }
}

const profile = (state = {apiSuccess: null}, action) => {    

    switch (action.type) {

        case GET_USER_PROFILE:
            return { 
                ...state,
                ...action.data,
                apiSuccess: true,
                update_profile_errors: {}
            };
        case UPDATE_USER_PROFILE_ERROR:
            return { 
                ...state,
                update_profile_errors: action.data,
                apiSuccess: false,
            };
        case SET_UPATE_USER_PROFILE_API_STATE:
            return { 
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}

export { user, profile };
