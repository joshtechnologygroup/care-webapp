import {
    OperationStatusRenderer,
    OwnerRenderer
  } from 'Components/CellRenderer';


export const CONFIG = {
    columnDefs: [
        { headerName: 'Op. Stat.', field: 'opStatus', cellRenderer: 'OperationStatusRenderer', minWidth: 90 },
        { headerName: 'Facility Name', field: 'facilityName', minWidth: 170 },
        { headerName: 'Area', field: 'area' },
        { headerName: 'Jurisdiction', field: 'jurisdiction', minWidth: 105 },
        { headerName: 'Beds Capacity', field: 'bedsCapacity', minWidth: 120 },
        { headerName: 'ICU Capacity', field: 'icuCapacity', minWidth: 120 },
        { headerName: 'Vent. Capacity', field: 'ventCapacity', minWidth: 120 },
        { headerName: 'Doctors', field: 'doctors', minWidth: 85 },
        { headerName: 'Checklist Store', field: 'checklistStore', minWidth: 120 },
        { headerName: 'Owner.', field: 'owner', minWidth: 80, cellRenderer: 'OwnerRenderer' },
        { headerName: 'Cred.', field: 'cred' },
    ],
    defaultColDef: {
        editable: true,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 70,
    },
    rowHeight: 40,
    headerHeight: 40,
    frameworkComponents: {
        OperationStatusRenderer: OperationStatusRenderer,
        OwnerRenderer: OwnerRenderer
    }
};
