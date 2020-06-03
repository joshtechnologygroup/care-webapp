import { 
    SET_USER,
    CLEAR_USER,
    GET_USER_PROFILE,
} from 'Reducers/Types';

const initialState = {
  id: null,
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

const profile = (state = {}, action) => {    

    switch (action.type) {

        case GET_USER_PROFILE:
            return { 
                ...state,
                ...action.data 
            };
        default:
            return state;
    }
}

export { user, profile };
