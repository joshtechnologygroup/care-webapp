import * as CommonService from "Src/utils/services";
import * as Routes from 'Src/routes';
import { PUT } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';
import * as HttpStatus from 'http-status-codes'

/**
 * update the patient personal details
 * @param {object} body:  patient personal details
 * @param {number} id: id of the patient 
 */
const updatePatientPersonalDetails = (body, id) => async (dispatch) => {
    const patient_personal_response = await CommonService.makeAuthorizedApiCall(`${Routes.PERSONAL_DETAILS_URL}${id}/`, PUT, body, {});
    if (patient_personal_response.ok) {
        dispatch({
            type: ReducerTypes.FETCH_PATIENT_DETAIL_API,
            error: true
        });
        return { status: true };
    } else if (patient_personal_response.status === HttpStatus.BAD_REQUEST) {
        const data = await patient_personal_response.json();
        return { status: false, error: "dummy error generated in UI" };
    }
};

/**
 * update the patient contact details
 * @param {object} body: patient contact details
 * @param {number} id: id of the patient
 */
const updatePatientContactDetails= (body, id) => async (dispatch) => {
    const patient_contact_response = await CommonService.makeAuthorizedApiCall(`${Routes.CONTACT_DETAILS_URL}${id}/`, PUT, body, {})
    if (patient_contact_response.ok) {
        const data = await patient_contact_response.json();
        dispatch({
            type: ReducerTypes.FETCH_PATIENT_DETAIL_API,
            error: true
        });
        return { status: true };
    } else if (patient_contact_response.status === HttpStatus.BAD_REQUEST) {
        const data = await patient_contact_response.json();
        return { status: false, error: "dummy error generated in UI" };
    }
};

/**
 * update the patient medication details
 * @param {object} body: patient medication details
 * @param {number} id: id of the patient
 */
const updatePatientMedicationDetails= (body, id) => async (dispatch) => {
    const patient_medication_response = await CommonService.makeAuthorizedApiCall(`${Routes.MEDICATION_DETAILS_URL}${id}/`, PUT, body, {})
    if (patient_medication_response.ok) {
        dispatch({
            type: ReducerTypes.FETCH_PATIENT_DETAIL_API,
            error: true
        });
        return { status: true };
    } else if (patient_medication_response.status === HttpStatus.BAD_REQUEST) {
        const data = await patient_medication_response.json();
        return { status: false, error: "dummy error generated in UI" };
    }
};

export { updatePatientPersonalDetails, updatePatientContactDetails, updatePatientMedicationDetails };
