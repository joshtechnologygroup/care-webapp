import {
  FacilityStatusRenderer,
} from 'Components/CellRenderer';
import { GRID_CONFIG } from 'Constants/app.const';
import {ActionRenderer} from './ActionRenderer';


export const CONFIG = {
  columnDefs: [
    { headerName: 'ICMR ID', field: 'icmr_id', cellRendererParams: { isSortable: true, filterType: 'string' }},
    { headerName: 'Govt. ID', field: 'govt_id', cellRendererParams: { isSortable: true, filterType: 'string' } },
    { headerName: 'Patient Name', field: 'patient_name', minWidth: 120, cellRendererParams: { isSortable: true, filterType: 'string' } },
    { headerName: 'Gender', field: 'gender', cellRendererParams: { filterType: 'boolean', options: [] } },
    { headerName: 'Age(Years)', field: 'year', minWidth: 100, cellRendererParams: { isSortable: true, filterType: 'number' } },
    { headerName: 'Age(Months)', field: 'month', minWidth: 110, cellRendererParams: { isSortable: true, filterType: 'number' } },
    { headerName: 'Contact Mobile No.', field: 'phone_number', minWidth: 140, cellRendererParams: { isSortable: true, filterType: 'string' } },
    { headerName: 'From Facility', field: 'from_facility', minWidth: 120, cellRendererParams: { filterType: 'boolean', options: [] } },
    { headerName: 'Requested At', field: 'requested_at', minWidth: 120, cellRendererParams: { isSortable: true, filterType: 'date' }, hide: true },
    { headerName: 'To Facility', field: 'to_facility', minWidth: 120, cellRendererParams: { filterType: 'boolean' } },
    { headerName: 'Status', field: 'status', minWidth: 110, cellRenderer: 'FacilityStatusRenderer', cellRendererParams: { filterType: 'boolean', options: [] } },
    { headerName: 'Status Updated At', field: 'status_updated_at', minWidth: 130, cellRendererParams: { isSortable: true, filterType: 'date' }, hide: true },
    { headerName: 'Comments', field: 'comments', minWidth: 140, hide: true },
    { headerName: 'Action', field: 'action', minWidth: 80, cellRenderer: 'actionRenderer' },
    { headerName: 'Id', field: 'id', hide: true },
],
  defaultColDef: {
    editable: GRID_CONFIG.editable,
    sortable: GRID_CONFIG.sortable,
    resizable: GRID_CONFIG.resizable,
    filter: GRID_CONFIG.filter,
    flex: GRID_CONFIG.flex,
    minWidth: 90,
  },
  rowHeight: GRID_CONFIG.rowHeight,
  headerHeight: GRID_CONFIG.headerHeight,
  suppressContextMenu: GRID_CONFIG.suppressContextMenu,
  frameworkComponents: {
    FacilityStatusRenderer: FacilityStatusRenderer,
    actionRenderer: ActionRenderer,
  }
};
