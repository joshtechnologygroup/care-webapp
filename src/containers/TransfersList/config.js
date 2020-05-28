import {
  FacilityStatusRenderer,
} from 'Components/CellRenderer';
import { GRID_CONFIG } from 'Constants/app.const';


export const CONFIG = {
  columnDefs: [
    { headerName: 'ICMR ID', field: 'idICMR', cellRendererParams: { isSortable: true, filterType: 'number', filterPriority: true } },
    { headerName: 'Govt. ID', field: 'idGovt', cellRendererParams: { isSortable: true, filterType: 'boolean' } },
    { headerName: 'Patient Name', field: 'patientName', minWidth: 120, cellRendererParams: { isSortable: true, filterType: 'date', filterPriority: true } },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Age(Years)', field: 'ageYears', minWidth: 100 },
    { headerName: 'Age(Months)', field: 'ageMonths', minWidth: 110 },
    { headerName: 'Contact Mobile No.', field: 'contactNo', minWidth: 140 },
    {
      headerName: 'From Facility', children: [
        { headerName: 'Facility ID', field: 'idFromFacility', minWidth: 100 },
        { headerName: 'Facility Name', field: 'nameFromFacility', minWidth: 120 },
        { headerName: 'Requested At', field: 'reqAtFromFacility', minWidth: 120 },
      ]
    },
    {
      headerName: 'To Facility', children: [
        { headerName: 'Facility ID', field: 'idToFacility', minWidth: 100 },
        { headerName: 'Facility Name', field: 'nameToFacility', minWidth: 120 },
        { headerName: 'Status', field: 'statusToFacility', minWidth: 110, cellRenderer: 'FacilityStatusRenderer' },
        { headerName: 'Status Updated At', field: 'upAtToFacility', minWidth: 130 },
        { headerName: 'Comments', field: 'commentsToFacility', minWidth: 140 },
      ]
    },
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
  }
};
