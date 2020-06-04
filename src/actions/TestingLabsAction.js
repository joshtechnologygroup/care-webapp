import * as CommonService from "Src/utils/services";
import * as Routes from 'Src/routes';
import { GET, POST, PUT } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';

/**
 * 
 * @param {object} body: body of the patient sample test object 
 * @param {number} patientId: id of the patient whose sample is tested
 */
const createUpdateSampleTest = (body, patientId = null) => async (dispatch) => {
    let url = Routes.GET_TESTING_LAB_LIST_URL;
    let method = POST;
    if(patientId) {
        method = PUT;
        url += `${patientId}/`;
    }
    const testing_lab_response = await CommonService.makeAuthorizedApiCall(url, method, body,  {});
    if(testing_lab_response.ok) {
        return { status : true }
    } else {
        const testing_lab_response_data = await testing_lab_response.json();
        return { status: false, error: "random generated in UI for now"}
    }
};

export { createUpdateSampleTest };