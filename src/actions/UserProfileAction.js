import * as CommonService from "Src/utils/services";
import { USER_PROFILE_URL } from 'Src/routes';
import { GET } from "Src/constants";
import * as CookieService from 'Services/CookieService';
import { 
    GET_USER_PROFILE
} from 'Reducers/Types';
import { dispatchAction } from 'Actions/common';

export const getUserProfile = () => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(`${USER_PROFILE_URL}${CookieService.getUserId()}/`, GET, {}, {})
    if(response.status === 200) {
        return dispatch(dispatchAction(GET_USER_PROFILE, response));
    }
    return response;
};
