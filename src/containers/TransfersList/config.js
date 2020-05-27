import {
  FacilityStatusRenderer,
} from 'Components/CellRenderer';
import { GRID_CONFIG } from 'Constants/app.const';


export const CONFIG = {
  columnDefs: [
    { headerName: 'ICMR ID', field: 'patient.icmr_id', cellRendererParams: { isSortable: true } },
    { headerName: 'Govt. ID', field: 'patient.govt_id' },
    { headerName: 'Patient Name', field: 'patientName', minWidth: 120 },
    { headerName: 'Gender', field: 'patient.gender' },
    { headerName: 'Age(Years)', field: 'patient.years', minWidth: 100 },
    { headerName: 'Age(Months)', field: 'patient.months', minWidth: 110 },
    { headerName: 'Contact Mobile No.', field: 'patient.phone_number', minWidth: 140 },
    {
      headerName: 'From Facility', children: [
        { headerName: 'Facility ID', field: 'from_facility.facility_code', minWidth: 100 },
        { headerName: 'Facility Name', field: 'from_facility.name', minWidth: 120 },
        { headerName: 'Requested At', field: 'requested_at', minWidth: 120 },
      ]
    },
    {
      headerName: 'To Facility', children: [
        { headerName: 'Facility ID', field: 'new_facility.facility_code', minWidth: 100 },
        { headerName: 'Facility Name', field: 'new_facility.name', minWidth: 120 },
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
