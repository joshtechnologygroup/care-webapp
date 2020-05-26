import * as CommonService from "Src/utils/services";
import * as Routes from 'Src/routes';
import { GET } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';


const getPatientList = (url) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(url, GET, {})
    const status = dispatchAction(ReducerTypes.GET_PATIENT_LIST, response)
    dispatch(response);
};

// const getPatientList = (url) => async (dispatch) => {
//     const [
//         status,
//         patient_list,
//         clinical_list,
//         district_list,
//         cluster_group_list,
//         covid_status_list
//     ] = await getPatientListService(url);
//     if(status){
//         let results = { patients: [], count: patient_list.count, next: patient_list.next, prev: patient_list.previous};
//         patient_list.results.forEach(( patient, index ) => {
//             let row = {};
//             Object.keys(MAPPING_PATIENTS_ATTRIBUTES).forEach((attr) => {
//                 if(attr === CLINICAL_STATUS_UPDATED_AT){
//                     const date = new Date(patient[attr])
//                     row[MAPPING_PATIENTS_ATTRIBUTES[attr]] = moment(date).fromNow();
//                 } else if(attr === PORTEA_CALLED_AT) {
//                     const date = new Date(patient[attr])
//                     row[MAPPING_PATIENTS_ATTRIBUTES[attr]] = date.toISOString();
//                 }
//                 else {
//                     row[MAPPING_PATIENTS_ATTRIBUTES[attr]] = patient[attr]
//                 }
//             });
//             results.patients.push(row);
//         });
//
//         const joinById = {
//             'clinicalStatus': clinical_list,
//             'addressDistrict': district_list,
//             'clusterGroup': cluster_group_list,
//             'covidStatus': covid_status_list
//         }
//
//         Object.keys(joinById).forEach((id) => {
//             results.patients.forEach(patient => joinById[id].results.forEach(value => {
//                     if(value.id === patient[id]){
//                         patient[id] = value.name
//                     }
//                 })
//             );
//         })
//
//         dispatch({
//             type: GET_PATIENT_LIST,
//             data: results
//         });
//         return results.patients.length === 0
//     }
// };

export { getPatientList };
