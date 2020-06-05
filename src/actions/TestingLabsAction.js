import * as CommonService from "Src/utils/services";
import * as Routes from 'Src/routes';
import { GET, POST, PUT } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';

/**
 * creating the patient sample test
 * @param {object} body: body of the patient sample test object 
 */
const createSampleTest = (body) => async (dispatch) => {
    const testing_lab_response = await CommonService.makeAuthorizedApiCall(Routes.CREATE_PATIENT_SAMPLE_TEST_URL, POST, body,  {});
    if(testing_lab_response.ok) {
        return { status : true }
    } else {
        const testing_lab_response_data = await testing_lab_response.json();
        return { status: false, error: "random create message generated in UI for now"}
    }
};

/**
 * updating the patient sample test details
 * @param {object} body: body of the patient sample test object 
 * @param {number} patientId: id of the patient whose sample is tested
 */
const updateSampleTest = (body, patientId) => async (dispatch) => {
    const testing_lab_response = await CommonService.makeAuthorizedApiCall(`${Routes.CREATE_PATIENT_SAMPLE_TEST_URL}${patientId}/`, PUT, body,  {});
    if(testing_lab_response.ok) {
        return { status : true }
    } else {
        const testing_lab_response_data = await testing_lab_response.json();
        return { status: false, error: "random update message generated in UI for now"}
    }
};
export { createSampleTest, updateSampleTest };