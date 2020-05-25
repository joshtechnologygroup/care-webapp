import {
  FacilityTypeRenderer,
  OperationStatusRenderer
} from 'Components/CellRenderer';
import { GRID_CONFIG } from 'Constants/app.const';


export const CONFIG = {
  columnDefs: [
    { headerName: 'ICMR ID', field: 'idICMR', cellRendererParams: { isSortable: true } },
    { headerName: 'Govt. ID', field: 'idGovt', cellRendererParams: { isSortable: true } },
    { headerName: 'Facility ID', field: 'idFacility', minWidth: 100, cellRendererParams: { isSortable: true } },
    { headerName: 'Patient Name', field: 'patientName', minWidth: 120 },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Age(Years)', field: 'ageYears', minWidth: 100, cellRendererParams: { isSortable: true } },
    { headerName: 'Age(Months)', field: 'ageMonths', minWidth: 110 },
    { headerName: 'Contact Number', field: 'contactNo', minWidth: 130 },
    { headerName: 'Address', field: 'address', },
    { headerName: 'Address District', field: 'addressDistrict', minWidth: 140 },
    { headerName: 'Cluster Group', field: 'clusterGroup', minWidth: 120 },
    { headerName: 'Status', field: 'status', },
    { headerName: 'COVID-19 Status', field: 'covidStatus', minWidth: 135, },
    { headerName: 'Clinical Status', field: 'clinicalStatus', minWidth: 120, cellRenderer: 'OperationStatusRenderer', },
    { headerName: 'Clinical Status updated At', field: 'clinicalStatusUpdatedAt', minWidth: 180 },
    { headerName: 'Portea called At', field: 'porteaCalled', minWidth: 140 },
    { headerName: 'Portea Able to contact Patient/Relative', field: 'porteaContact', minWidth: 250 },
    { headerName: 'Facility Name', field: 'facilityName', minWidth: 120 },
    { headerName: 'Facility District', field: 'facilityDistrict', minWidth: 120 },
    { headerName: 'Facility Type', field: 'facilityType', cellRenderer: 'FacilityTypeRenderer', minWidth: 120 },
    { headerName: 'Facility Ownership Type', field: 'facilityOwnershipType', minWidth: 170, },
  ],
  defaultColDef: {
    editable: GRID_CONFIG.editable,
    sortable: GRID_CONFIG.sortable,
    resizable: GRID_CONFIG.resizable,
    filter: GRID_CONFIG.filter,
    flex: GRID_CONFIG.flex,
    minWidth: GRID_CONFIG.minWidth,
  },
  pagination: GRID_CONFIG.pagination,
  rowHeight: GRID_CONFIG.rowHeight,
  headerHeight: GRID_CONFIG.headerHeight,
  suppressContextMenu: GRID_CONFIG.suppressContextMenu,
  frameworkComponents: {
    FacilityTypeRenderer: FacilityTypeRenderer,
    OperationStatusRenderer: OperationStatusRenderer
  }
};
