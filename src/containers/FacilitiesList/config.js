import {
    OperationStatusRenderer,
    OwnerRenderer
} from 'Components/CellRenderer';
import { GRID_CONFIG } from 'Constants/app.const';


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
        editable: GRID_CONFIG.editable,
        sortable: GRID_CONFIG.sortable,
        resizable: GRID_CONFIG.resizable,
        filter: GRID_CONFIG.filter,
        flex: GRID_CONFIG.flex,
        minWidth: 70,
    },
    rowHeight: GRID_CONFIG.rowHeight,
    headerHeight: GRID_CONFIG.headerHeight,
    suppressContextMenu: GRID_CONFIG.suppressContextMenu,
    frameworkComponents: {
        OperationStatusRenderer: OperationStatusRenderer,
        OwnerRenderer: OwnerRenderer
    }
};
