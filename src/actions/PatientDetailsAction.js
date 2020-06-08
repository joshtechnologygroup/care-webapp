import * as CommonService from "Src/utils/services";
import * as Routes from 'Src/routes';
import { GET, PUT } from "Src/constants";
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
        let error = "Some Errors occurs";
        if(data.icmr_id && data.govt_id) {
            error = data.icmr_id[0] + "\n" + data.govt_id[0]
        }
        else if(data.icmr_id) {
            error = data.icmr_id[0];
        }
        else if(data.govt_id) {
            error = data.govt_id[0];
        } 
        return { status: false, error: error };
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
        return { status: false, error: "Some Errors occurs" };
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
        return { status: false, error: "Some Errors occurs" };
    }
};

/**
 * fetch the cluster group required for showing personal details
 */
const fetchClusterGroup = () => async (dispatch) => {
    return await dispatch(dispatchDependentActions(
        [
            [Routes.CLUSTER_GROUP_LIST_URL, GET, {}, {}],
        ],
        [
            ReducerTypes.GET_CLUSTER_GROUP_LIST,
        ]
    ));
};

/**
 * fetch the dependencies required to show patient contac details
 */
const fetchContactDependencies = () => async (dispatch) => {
    return await dispatch(dispatchDependentActions(
        [
            [Routes.DISTRICT_LIST_URL, GET, {}, {}],
            [Routes.STATE_LIST_URL, GET, {}, {}],
        ],
        [
            ReducerTypes.GET_DISTRICT_LIST,
            ReducerTypes.GET_STATE_LIST
        ]
    ));
};


export { updatePatientPersonalDetails, updatePatientContactDetails, updatePatientMedicationDetails, fetchClusterGroup, fetchContactDependencies };
