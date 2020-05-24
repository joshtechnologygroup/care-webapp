import {
    OperationStatusRenderer,
    OwnerRenderer
} from 'Components/CellRenderer';
import { GRID_CONFIG } from 'Constants/app.const';


export const CONFIG = {
    columnDefs: [
        { headerName: 'Facility Code', field: 'facility_code', minWidth: 90 },
        { headerName: 'Name', field: 'name', minWidth: 170 },
        { headerName: 'Address', field: 'address' },
        { headerName: 'district', field: 'district', minWidth: 105 },
        { headerName: 'Facility Type', field: 'facility_type', minWidth: 120 },
        { headerName: 'Facility Ownership Type', field: 'owned_by', minWidth: 120 },
        { headerName: 'Total #', field: 'total_patient', minWidth: 120 },
        { headerName: 'Positive Patient #', field: 'positive_patient', minWidth: 85 },
        { headerName: 'Negative Patient #', field: 'negative_patient', minWidth: 120 },
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
