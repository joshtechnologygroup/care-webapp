import * as Routes from 'Src/routes';
import * as HttpStatus from 'http-status-codes'
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
            [Routes.FACILITY_SHORT_LIST_URL, GET, {}, params],
            [Routes.INVENTORY_TYPE_LIST_URL, GET, {}, params],
        ],
        [ReducerTypes.GET_SHORT_FACILITY_LIST, ReducerTypes.GET_INVENTORY_TYPE_LIST]
    ));
};

const getTransferDependencies = (params) => async (dispatch) => {
    dispatch(dispatchDependentActions(
        [
            [Routes.FACILITY_SHORT_LIST_URL, GET, {}, params],
        ],
        [ReducerTypes.GET_SHORT_FACILITY_LIST]
    ));
};

const getProfileDependencies = (params) => async (dispatch) => {
    dispatch(dispatchDependentActions(
        [
            [Routes.FACILITY_SHORT_LIST_URL, GET, {}, params],
            [Routes.DISTRICT_LIST_URL, GET, {}, params],
            [Routes.USER_TYPE_URL, GET, {}, params],
        ],
        [ReducerTypes.GET_SHORT_FACILITY_LIST, ReducerTypes.GET_DISTRICT_LIST, ReducerTypes.USER_TYPE_LIST]
    ));
};


/**
 * Creating or Updating the Inventory 
 * @param {object} state: Body of inventory object
 * @param {number} id: id of current inventory object clicked
 */
const createOrUpdateInventory = (state, id = 0) => async (dispatch) => {
    let url = Routes.CREATE_INVENTORY_URL;
    let method = POST;
    if(id !== 0) {
        method = PUT;
        url += `${id}/`;
    }
    const inventory_response = await facilityService.makeAuthorizedFacilityApiCall(url, method, state, {})
    if(inventory_response.ok) {
        dispatch({
            type: ReducerTypes.SET_ERROR_CREATE_INVENTORY,
            error: false
        });
    } else if (inventory_response.status === HttpStatus.BAD_REQUEST) {
        const data = await inventory_response.json();
        dispatch({
            type: ReducerTypes.SET_ERROR_CREATE_INVENTORY,
            error: data.non_field_errors[0]
        });
    }
};

export { getFacilitiesList, getFacilityDependencies, getInventoryList, getInventoryDependencies, createOrUpdateInventory, getTransferDependencies, getProfileDependencies }
