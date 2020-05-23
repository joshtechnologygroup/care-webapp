import { 
    SET_USER,
    CLEAR_USER,
} from 'Reducers/Types';

const initialState = {
  id: null,
};

export default function (state = initialState, action) {    

    switch (action.type) {

        case SET_USER:
            return {...state,...action.data};

        case CLEAR_USER:
            return {...initialState}

        default:
            return state;
    }
}
