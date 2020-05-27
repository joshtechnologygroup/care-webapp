import {
  FacilityTypeRenderer,
  OperationStatusRenderer
} from 'Components/CellRenderer';
import { GRID_CONFIG } from 'Constants/app.const';


export const CONFIG = {
  columnDefs: [
    { headerName: 'ICMR ID', field: 'icmr_id', cellRendererParams: { isSortable: true } },
    { headerName: 'Govt. ID', field: 'govt_id', cellRendererParams: { isSortable: true } },
    { headerName: 'Facility ID', field: 'facility', minWidth: 100, cellRendererParams: { isSortable: true } },
    { headerName: 'Patient Name', field: 'name', minWidth: 120 },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Age(Years)', field: 'year', minWidth: 100, cellRendererParams: { isSortable: true } },
    { headerName: 'Age(Months)', field: 'month', minWidth: 110 },
    { headerName: 'Contact Number', field: 'phone_number', minWidth: 130 },
    { headerName: 'Address', field: 'address', },
    { headerName: 'Address District', field: 'district', minWidth: 140 },
    { headerName: 'Cluster Group', field: 'cluster_group', minWidth: 120 },
    { headerName: 'Status', field: 'status', },
    { headerName: 'COVID-19 Status', field: 'covid_status', minWidth: 135, },
    { headerName: 'Clinical Status', field: 'clinical_status', minWidth: 120 },
    { headerName: 'Clinical Status updated At', field: 'clinical_status_updated_at', minWidth: 180 },
    { headerName: 'Portea called At', field: 'portea_called_at', minWidth: 140 },
    { headerName: 'Portea Able to contact Patient/Relative', field: 'portea_able_to_connect', minWidth: 250 },
    { headerName: 'Facility Name', field: 'facility_name', minWidth: 120 },
    { headerName: 'Facility District', field: 'facility_district', minWidth: 120 },
    { headerName: 'Facility Type', field: 'facility_type', minWidth: 120 },
    { headerName: 'Facility Ownership Type', field: 'ownership_type', minWidth: 170, },
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
