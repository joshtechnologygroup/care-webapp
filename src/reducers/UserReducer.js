import { USER } from 'Reducers/Types';

const initialState = {
  id: null,
  first_name:null,
  last_name:null,
  email: null,
  age: null,
  gender: null,
  phone_number: null
};

export default function (state = initialState, action) {    
    switch (action.type) {

        case USER:
            return {
                ...state,
                id: action.data.id,
                first_name: action.data.first_name,
                last_name: action.data.last_name,
                email: action.data.email,
                age: action.data.age,
                gender: action.data.gender,
                phone_number: action.data.phone_number
            };

        default:
            return state;
    }
}
