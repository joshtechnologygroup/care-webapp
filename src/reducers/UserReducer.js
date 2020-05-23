import { USER } from 'Reducers/Types';

const initialState = {
  id: null,
};

export default function (state = initialState, action) {    
    switch (action.type) {

        case USER:
            return {...state,...action.data};

        default:
            return state;
    }
}
