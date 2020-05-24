import {
  OperationStatusRenderer,
  OwnerRenderer
} from 'Components/CellRenderer';
import { GRID_CONFIG } from 'Constants/app.const';


export const CONFIG = {
  columnDefs: [
    { headerName: 'Facility Code', field: 'facilityCode', minWidth: 110 },
    { headerName: 'Name', field: 'facilityName', minWidth: 150 },
    { headerName: 'Address', field: 'facilityAddress', minWidth: 120 },
    { headerName: 'District', field: 'facilityDistrict', minWidth: 100 },
    { headerName: 'Beds #', field: 'bedsCapacity', minWidth: 90 },
    { headerName: 'Occupied Beds #', field: 'bedsOccupied', minWidth: 140 },
    { headerName: 'Available Beds #', field: 'bedsAvailable', minWidth: 130 },
    { headerName: 'Total Patient #', field: 'totalPatient', minWidth: 120 },
    { headerName: 'Positive Patient #', field: 'totalPositive', minWidth: 140 },
    { headerName: 'Negative Patient #', field: 'totalNagative', minWidth: 140 },
    { headerName: 'Doctor #', field: 'doctor', minWidth: 95 },
    { headerName: 'Nurse #', field: 'nurse', minWidth: 85 },
    { headerName: 'Other Staff #', field: 'otherStaff', minWidth: 120 },
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
    OperationStatusRenderer: OperationStatusRenderer,
    OwnerRenderer: OwnerRenderer
  }
};
