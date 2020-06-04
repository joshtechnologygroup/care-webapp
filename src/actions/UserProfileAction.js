import * as CommonService from "Src/utils/services";
import { USER_PROFILE_URL } from 'Src/routes';
import { GET, PATCH } from "Src/constants";
import * as CookieService from 'Services/CookieService';
import { 
    GET_USER_PROFILE, UPDATE_USER_PROFILE_ERROR, SET_UPATE_USER_PROFILE_API_STATE, UPDATE_USER_PROFILE
} from 'Reducers/Types';
import { dispatchAction } from 'Actions/common';

export const getUserProfile = () => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(`${USER_PROFILE_URL}${CookieService.getUserId()}/`, GET, {}, {})
    if(response.status === 200) {
        return dispatch(dispatchAction(GET_USER_PROFILE, response));
    }
    return response;
};

export const updateUserProfile = (data) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(`${USER_PROFILE_URL}${CookieService.getUserId()}/`, PATCH, data, {})
    if(response.status === 200) {
        return dispatch(dispatchAction(UPDATE_USER_PROFILE, response));
    } else if (response.status === 400) {
        return dispatch(dispatchAction(UPDATE_USER_PROFILE_ERROR, response));
    }
    return response;
};

export const setUpdateProfileApiStatus = (data) => (dispatch) => {
    dispatch({
        type: SET_UPATE_USER_PROFILE_API_STATE,
        data: data
    })
}

