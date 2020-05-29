import {
  FacilityStatusRenderer,
} from 'Components/CellRenderer';
import { GRID_CONFIG } from 'Constants/app.const';


export const CONFIG = {
  columnDefs: [
    { headerName: 'ICMR ID', field: 'icmr_id', cellRendererParams: { isSortable: true } },
    { headerName: 'Govt. ID', field: 'govt_id', cellRendererParams: { isSortable: true } },
    { headerName: 'Patient Name', field: 'patient_name', minWidth: 120, cellRendererParams: { isSortable: true } },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Age(Years)', field: 'year', minWidth: 100, cellRendererParams: { isSortable: true } },
    { headerName: 'Age(Months)', field: 'month', minWidth: 110, cellRendererParams: { isSortable: true } },
    { headerName: 'Contact Mobile No.', field: 'phone_number', minWidth: 140, cellRendererParams: { isSortable: true } },
    {
      headerName: 'From Facility', children: [
        { headerName: 'Facility ID', field: 'from_facility_id', minWidth: 100 },
        { headerName: 'Facility Name', field: 'from_facility_name', minWidth: 120 },
        { headerName: 'Requested At', field: 'requested_at', minWidth: 120 },
      ],
    },
    {
      headerName: 'To Facility', children: [
        { headerName: 'Facility ID', field: 'to_facility_id', minWidth: 100 },
        { headerName: 'Facility Name', field: 'to_facility_name', minWidth: 120 },
        { headerName: 'Status', field: 'status', minWidth: 110, cellRenderer: 'FacilityStatusRenderer' },
        { headerName: 'Status Updated At', field: 'status_updated_at', minWidth: 130 },
        { headerName: 'Comments', field: 'comments', minWidth: 140 },
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
