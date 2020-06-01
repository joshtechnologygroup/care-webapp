import {
  FacilityTypeRenderer,
  OperationStatusRenderer,
} from 'Components/CellRenderer';
import { PatientRenderer } from 'Components/CellRenderer/PatientRenderer'
import { GRID_CONFIG } from 'Constants/app.const';

export const CONFIG = {
  columnDefs: [
    { headerName: 'ICMR ID', field: 'icmr_id', cellRendererParams: { isSortable: true }, hide: true },
    { headerName: 'Govt. ID', field: 'govt_id', cellRendererParams: { isSortable: true } },
    { headerName: 'Patient Name', cellRenderer: 'PatientRenderer', field: 'name', minWidth: 120 },
    { headerName: 'Gender', field: 'gender' , cellRendererParams: { filterType: 'boolean', options: [ 'Male', 'Female', 'Others'] }},
    { headerName: 'Age(Years)', field: 'year', minWidth: 100, cellRendererParams: { isSortable: true, filterType: 'number' } },
    { headerName: 'Age(Months)', field: 'month', minWidth: 110, cellRendererParams: { filterType: 'number' } },
    { headerName: 'Contact Number', field: 'phone_number', minWidth: 130 },
    { headerName: 'Address', field: 'address', },
    { headerName: 'Address District', field: 'district', minWidth: 140, cellRendererParams: { filterType: 'boolean', options: [] } },
    {
      headerName: 'Cluster Group',
      field: 'cluster_group',
      minWidth: 120,
      cellRendererParams: { filterType: 'boolean', options: [ ] },
      hide: true
    },
    {
      headerName: 'Status',
      field: 'patient_status',
      cellRendererParams: {
        filterType: 'boolean',
        options: [
            'Home Isolation',
            'Recovered',
            'Dead',
            'Facility Status'
        ]
      }
    },
    { headerName: 'COVID-19 Status', field: 'covid_status', minWidth: 135, cellRendererParams: {
      filterType: 'boolean',
      options: []
    }},
    { headerName: 'Clinical Status', field: 'clinical_status', minWidth: 120, cellRendererParams: {
      filterType: 'boolean',
      options: [
        'Asymptomatic',
        'Mild Symptoms',
        'Severe Symptoms',
        'In-ward without oxygen',
        'In-ward with oxygen',
        'ICU without ventilator',
        'ICU with ventilator',
        'Others'
      ]
    }},
    { headerName: 'Clinical Status updated At', field: 'clinical_status_updated_at', minWidth: 180, cellRendererParams: {
      filterType: 'date'
    },
    hide: true
    },
    { headerName: 'Portea called At', field: 'portea_called_at', minWidth: 150, cellRendererParams: {
        filterType: 'date'
    }, hide: true},
    { headerName: 'Portea Able to contact Patient/Relative', field: 'portea_able_to_connect', minWidth: 250, cellRendererParams: {
      filterType: 'boolean'
    }, hide: true},
    { headerName: 'Facility Name', field: 'facility_name', minWidth: 120, cellRendererParams: {
      filterType: 'boolean',
      options: []
    }, hide: true},
    { headerName: 'Facility District', field: 'facility_district', minWidth: 120, cellRendererParams: {
      filterType: 'boolean',
      options: []
    }, hide: true},
    { headerName: 'Facility Type', field: 'facility_type', minWidth: 120, cellRendererParams: {
      filterType: 'boolean',
      options: [
        'CDC',
        'CHC',
        'CCC'
      ]
    }, hide: true},
    { headerName: 'Facility Ownership Type', field: 'ownership_type', minWidth: 170, cellRendererParams: {
      filterType: 'boolean',
      options: [
        'Central Govt',
        'State Go vt',
        'Private'
      ]
    }, hide: true}
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
    OperationStatusRenderer: OperationStatusRenderer,
    PatientRenderer: PatientRenderer,
  },
};
