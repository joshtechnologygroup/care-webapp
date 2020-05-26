import * as CommonService from "Src/utils/services";
import { 
    GET, 
} from "Src/constants";
import { 
    CLINICAL_STATUS_LIST_URL, 
    DISTRICT_LIST_URL, 
    CLUSTER_GROUP_LIST_URL,
    COVID_STATUS_LIST_URL
} from 'Src/routes';
import * as HttpStatus from 'http-status-codes'

const getPatientListService = async ( url ) => {
    const patient_list_response = await CommonService.makeAuthorizedApiCall(url, GET, {}, {});
    const clinical_list_response = await CommonService.makeAuthorizedApiCall(CLINICAL_STATUS_LIST_URL, GET, {}, {});
    const district_list_response = await CommonService.makeAuthorizedApiCall(DISTRICT_LIST_URL, GET, {}, {});
    const cluster_group_list_response = await CommonService.makeAuthorizedApiCall(CLUSTER_GROUP_LIST_URL, GET, {}, {});
    const covid_status_list_response = await CommonService.makeAuthorizedApiCall(COVID_STATUS_LIST_URL, GET, {}, {});
    if(
        (patient_list_response.status === HttpStatus.OK) &
        (clinical_list_response.status === HttpStatus.OK) &
        (district_list_response.status === HttpStatus.OK) &
        (cluster_group_list_response.status === HttpStatus.OK) &
        (covid_status_list_response.status === HttpStatus.OK)
    ){
        const patient_list = await patient_list_response.json();
        const clinical_list = await clinical_list_response.json();
        const district_list = await district_list_response.json();
        const cluster_group_list = await cluster_group_list_response.json();
        const covid_status_list = await covid_status_list_response.json();
        return [ true,  patient_list, clinical_list, district_list, cluster_group_list, covid_status_list ];
    }
    return [ false ];
};

export { getPatientListService };
