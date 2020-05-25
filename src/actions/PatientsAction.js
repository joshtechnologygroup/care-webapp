import * as CommonService from "Src/utils/services";
import { 
    GET, 
    MAPPING_PATIENTS_ATTRIBUTES, 
    CLINICAL_STATUS_UPDATED_AT, 
    PORTEA_CALLED_AT 
} from "Src/constants";
import { 
    PATIENT_LIST_URL, 
    CLINICAL_STATUS_LIST_URL, 
    DISTRICT_LIST_URL, 
    CLUSTER_GROUP_LIST_URL,
    COVID_STATUS_LIST_URL
} from 'Src/routes';
import * as HttpStatus from 'http-status-codes'
import moment from 'moment';
import {
    GET_PATIENT_LIST
} from 'Reducers/Types'

const getPatientList = (page) => async (dispatch) => {
    const patient_list_response = await CommonService.makeAuthorizedApiCall(PATIENT_LIST_URL, GET, {}, { page: page });
    if(patient_list_response.status === HttpStatus.OK)
    {
        const patient_list = await patient_list_response.json();
        const clinical_list_response = await CommonService.makeAuthorizedApiCall(CLINICAL_STATUS_LIST_URL, GET, {}, {});
        const district_list_response = await CommonService.makeAuthorizedApiCall(DISTRICT_LIST_URL, GET, {}, {});
        const cluster_group_list_response = await CommonService.makeAuthorizedApiCall(CLUSTER_GROUP_LIST_URL, GET, {}, {});
        const covid_status_list_response = await CommonService.makeAuthorizedApiCall(COVID_STATUS_LIST_URL, GET, {}, {});
        if(
            (clinical_list_response.status === HttpStatus.OK) &
            (district_list_response.status === HttpStatus.OK) &
            (cluster_group_list_response.status === HttpStatus.OK) &
            (covid_status_list_response.status === HttpStatus.OK) 
        ){
            const clinical_list = await clinical_list_response.json();
            const district_list = await district_list_response.json();
            const cluster_group_list = await cluster_group_list_response.json();
            const covid_status_list = await covid_status_list_response.json();
            let results = { patients: [], count: patient_list.count }
            patient_list.results.forEach(( patient, index ) => {
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
            const joinById = {
                'clinicalStatus': clinical_list, 
                'addressDistrict': district_list, 
                'clusterGroup': cluster_group_list, 
                'covidStatus': covid_status_list
            }
            for ( var id in joinById ){
                // eslint-disable-next-line no-loop-func
                results.patients.forEach(patient => joinById[id].results.forEach(value => {
                        if(value.id === patient[id]){
                            patient[id] = value.name
                        }
                    })
                );
            }

            dispatch({
                type: GET_PATIENT_LIST,
                data: results
            });
            return true;
        }
        else{
            return false;
        }
    }
    return (patient_list_response.status === HttpStatus.OK);
};

export { getPatientList };
