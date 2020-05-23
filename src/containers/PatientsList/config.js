import {
  FacilityTypeRenderer
} from 'Components/CellRenderer';


export const CONFIG = {
  columnDefs: [
    { headerName: 'ICMR ID', field: 'idICMR' },
    { headerName: 'Govt. ID', field: 'idGovt' },
    { headerName: 'Facility ID', field: 'idFacility', minWidth: 100 },
    { headerName: 'Patient Name', field: 'patientName', minWidth: 120 },
    { headerName: 'Age', field: 'age', minWidth: 70 },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Clinical Status', field: 'clinicalStatus', minWidth: 120 },
    { headerName: 'Covid Status', field: 'covidStatus', minWidth: 110, },
    { headerName: 'Health Conditions', field: 'healthConditions', minWidth: 140 },
    { headerName: 'Admission Date', field: 'admissionDate', minWidth: 125 },
    { headerName: 'Discharge Date', field: 'dischargeDate', minWidth: 125 },
    { headerName: 'Patient District', field: 'patientDistrict', minWidth: 125 },
    { headerName: 'Facility Type', field: 'facilityType', minWidth: 110, cellRenderer: 'FacilityTypeRenderer' },
    { headerName: 'Facility', field: 'facility', },
    { headerName: 'Action', field: 'action' },
  ],
  defaultColDef: {
    editable: false,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 90,
  },
  rowHeight: 40,
  headerHeight: 40,
  frameworkComponents: {
    FacilityTypeRenderer: FacilityTypeRenderer,
  }
};
