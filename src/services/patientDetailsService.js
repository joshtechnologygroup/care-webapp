import * as CommonService from "Src/utils/services";
import * as Routes from 'Src/routes';
import { POST, PUT } from "Src/constants";

/**
 * common service for portie and family members to create or update object
 * @param {object} body: details regarding portie or family member associated with patient 
 * @param {id} id: only when details required to be updated 
 */
async function makeAuthorizedPatientDetailsApiCall(body, id = null) {
    let url = Routes.PATIENT_FAMILY_MEMBER_URL;
    let method = POST;
    if(id) {
        method = PUT;
        url += `${id}/`;
    }
    return  CommonService.makeAuthorizedApiCall(url, method, body, {}, {})
}

export { makeAuthorizedPatientDetailsApiCall };
