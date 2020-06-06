import * as CommonService from "Src/utils/services";
import * as Routes from 'Src/routes';
import { POST, PUT } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';
import * as HttpStatus from 'http-status-codes'


/**
 * create the inventory
 * @param {object} body: contains details of the inventory 
 */
const createInventories = (body) => async (dispatch) => {
    const inventory_response = await CommonService.makeAuthorizedApiCall(Routes.CREATE_INVENTORY_URL, POST, body, {});
    if(inventory_response.ok) {
        dispatch({
            type: ReducerTypes.SET_ERROR_CREATE_INVENTORY,
            error: false
        });
        return { status : true};
    } else if (inventory_response.status === HttpStatus.BAD_REQUEST) {
        const data = await inventory_response.json();
        dispatch({
            type: ReducerTypes.SET_ERROR_CREATE_INVENTORY,
            error: data.non_field_errors[0]
        });
        return { status: false, error: data.non_field_errors[0] };
    }
};

/**
 * update the inventory
 * @param {object} body: contains details of the inventory
 * @param {number} id: id used to update inventory
 */
const updateInventories = (body, id) => async (dispatch) => {
    const inventory_response = await CommonService.makeAuthorizedApiCall(`${Routes.CREATE_INVENTORY_URL}${id}/`, PUT, body, {})
    if(inventory_response.ok) {
        dispatch({
            type: ReducerTypes.SET_ERROR_CREATE_INVENTORY,
            error: false
        });
        return { status : true};
    } else if (inventory_response.status === HttpStatus.BAD_REQUEST) {
        dispatch({
            type: ReducerTypes.SET_ERROR_CREATE_INVENTORY,
            error: data.non_field_errors[0]
        });
        const data = await inventory_response.json();
        return { status: false, error: data.non_field_errors[0] };
    }
};


export { createInventories, updateInventories } ;
