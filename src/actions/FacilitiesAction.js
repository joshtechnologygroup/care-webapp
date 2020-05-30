import * as Routes from 'Src/routes';
import * as ReducerTypes from 'Reducers/Types';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';
import * as CommonService from "Src/utils/services";
import * as facilityService from "Src/services/facilityService";
import { GET, POST, PUT } from "Src/constants";;

const getFacilitiesList = (params) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(Routes.FACILITY_LIST_URL, GET, {}, params)
    dispatch(dispatchAction(ReducerTypes.GET_FACILITY_LIST, response));
};

const getFacilityDependencies = (params) => async (dispatch) => {
    dispatch(dispatchDependentActions(
        [
            [Routes.FACILITY_TYPE_LIST_URL, GET, {}, params],
            [Routes.OWNERSHIP_TYPE_LIST_URL, GET, {}, params],
            [Routes.DISTRICT_LIST_URL, GET, {}, params],
        ],
        [ReducerTypes.GET_FACILITY_TYPE_LIST, ReducerTypes.GET_OWNERSHIP_TYPE_LIST, ReducerTypes.GET_DISTRICT_LIST]
    ));
};

const getInventoryList = (params) => async (dispatch) => {
    const inventory_list_response = await CommonService.makeAuthorizedApiCall(Routes.FACILITY_INVENTORY_LIST_URL, GET, {}, params)
    dispatch(dispatchAction(ReducerTypes.GET_FACILITY_INVENTORY_LIST, inventory_list_response));
};

const getInventoryDependencies = (params) => async (dispatch) => {
    dispatch(dispatchDependentActions(
        [
            [Routes.FACILITY_LIST_URL, GET, {}, params],
            [Routes.INVENTORY_TYPE_LIST_URL, GET, {}, params],
        ],
        [ReducerTypes.GET_FACILITY_LIST, ReducerTypes.GET_INVENTORY_TYPE_LIST]
    ));
};

const createOrUpdateInventory = (state, id = 0) => async (dispatch) => {
    let url = Routes.CREATE_INVENTORY_URL
    var method = POST
    if(id !== 0){
        method = PUT
        url += `${id}/`
    }
    const inventory_response = await facilityService.makeAuthorizedFacilityApiCall(url, method, state, {})
    if(inventory_response.ok){
        const inventory = await inventory_response.json();
    }
};

export { getFacilitiesList, getFacilityDependencies, getInventoryList, getInventoryDependencies, createOrUpdateInventory }
