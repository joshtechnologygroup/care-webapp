import * as CommonService from "Src/utils/services";
import { GET, MAPPING_PATIENTS_ATTRIBUTES, CLINICAL_STATUS_UPDATED_AT, PORTEA_CALLED_AT } from "Src/constants";
import { PATIENT_LIST_URL } from 'Src/routes';
import * as HttpStatus from 'http-status-codes'
import moment from 'moment';
import {
    GET_PATIENT_LIST
} from 'Reducers/Types'

const getPatientList = (page) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(PATIENT_LIST_URL, GET, {}, { page: page });
    if(response.status === HttpStatus.OK)
    {
        const data = await response.json();
        let results = { patients: [], count: data.count }
        data.results.forEach(( patient, index ) => {
            let row = {};
            for(var attr in MAPPING_PATIENTS_ATTRIBUTES){
                if(attr === CLINICAL_STATUS_UPDATED_AT){
                    const date = new Date(patient[attr])
                    row[MAPPING_PATIENTS_ATTRIBUTES[attr]] = moment(date).fromNow();
                } else if(attr === PORTEA_CALLED_AT) {
                    const date = new Date(patient[attr])
                    row[MAPPING_PATIENTS_ATTRIBUTES[attr]] = date.toISOString();
                }
                else {
                    row[MAPPING_PATIENTS_ATTRIBUTES[attr]] = patient[attr] 
                }
            }
            results.patients.push(row)
        });
        dispatch({
            type: GET_PATIENT_LIST,
            data: results
        });
    }
    return (response.status === HttpStatus.OK);
};

export { getPatientList };
