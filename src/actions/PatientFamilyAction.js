import * as CommonService from "Src/utils/services";
import * as Routes from 'Src/routes';
import { POST, PUT } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';
import * as HttpStatus from 'http-status-codes'

/**
 * create the patient family details associated with patient
 * @param {object} body: contains details of the patient family member  
 */
const createPatientFamilyDetails = (body) => async (dispatch) => {
    const family_member_response = await CommonService.makeAuthorizedApiCall(Routes.PATIENT_FAMILY_MEMBER_URL, POST, body, {});
    if (family_member_response.ok) {
        const data = await family_member_response.json();
        return { status: true };
    } else if (family_member_response.status === HttpStatus.BAD_REQUEST) {
        const data = await family_member_response.json();
        return { status: false, error: "dummy error generated in UI" };
    }
};

/**
 * update the patient family details associated with patient
 * @param {object} body: contains details of the patient family member  
 * @param {number} familyMemberId: patient family member id used to update family member
 */
const updatePatientFamilyDetails = (body, familyMemberId) => async (dispatch) => {
    const family_member_response = await CommonService.makeAuthorizedApiCall(`${Routes.PATIENT_FAMILY_MEMBER_URL}${familyMemberId}/`, PUT, body, {})
    if (family_member_response.ok) {
        const data = await family_member_response.json();
        return { status: true };
    } else if (family_member_response.status === HttpStatus.BAD_REQUEST) {
        const data = await family_member_response.json();
        return { status: false, error: "dummy error generated in UI" };
    }
};

export { createPatientFamilyDetails, updatePatientFamilyDetails };
