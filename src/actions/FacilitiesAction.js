import * as HttpStatus from 'http-status-codes'
import moment from 'moment';
import * as CommonService from "Src/utils/services";
import { FACILITY_LIST_URL, FACILITY_TYPE_LIST_URL, FACILITY_INVENTORY_LIST_URL, INVENTORY_TYPE_LIST_URL } from 'Src/routes';
import { GET, MAPPING_INVENTORY_ATTRIBUTES, UPDATED_AT } from "Src/constants";
import { GET_FACILITY_LIST, GET_FACILITY_TYPE_LIST, GET_FACILITY_INVENTORY_LIST } from 'Reducers/Types';
import { dispatchAction } from 'Actions/common';

const getFacilitiesList = (params) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(FACILITY_LIST_URL, GET, {}, params)
    dispatch(dispatchAction(GET_FACILITY_LIST, response));
};

const getFacilityTypeList = (params) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(FACILITY_TYPE_LIST_URL, GET, {}, params)
    dispatch(dispatchAction(GET_FACILITY_TYPE_LIST, response));
};

const getInventoryList = (offset) => async (dispatch) => {
    const inventory_list_response = await CommonService.makeAuthorizedApiCall(FACILITY_INVENTORY_LIST_URL, GET, {}, { offset:offset})
    const inventory_list = await inventory_list_response.json()
    const facility_list_response = await CommonService.makeAuthorizedApiCall(FACILITY_LIST_URL, GET, {}, {});
    const inventory_type_list_response = await CommonService.makeAuthorizedApiCall(INVENTORY_TYPE_LIST_URL, GET, {}, {});
    if(
        (facility_list_response.status === HttpStatus.OK) &
        (inventory_type_list_response.status === HttpStatus.OK)
    ){
        const facility_list = await facility_list_response.json();
        const inventory_type_list = await inventory_type_list_response.json();
        let results = { inventory: [], count: inventory_list.count }
        inventory_list.results.forEach(( inventory, index ) => {
            let row = {};
            for(var attr in MAPPING_INVENTORY_ATTRIBUTES){
                if(attr === UPDATED_AT){
                    const date = new Date(inventory[attr])
                    row[MAPPING_INVENTORY_ATTRIBUTES[attr]] = moment(date);
                }
                else {
                    row[MAPPING_INVENTORY_ATTRIBUTES[attr]] = inventory[attr] 
                }
            }
            results.inventory.push(row)
        });
        const joinById = {
            'facilityName': facility_list, 
            'type': inventory_type_list,
        }
        for ( var id in joinById ){
            results.inventory.forEach(inventory => joinById[id].results.forEach(value => {
                    if(value.id === inventory[id]){
                        inventory[id] = value.name
                    }
                })
            );
        }
        dispatch({
            type: GET_FACILITY_INVENTORY_LIST,
            results
        });
    return true;
}
else{
 return false;
}
};

export { getFacilitiesList, getFacilityTypeList, getInventoryList }

