import { GRID_CONFIG } from "Constants/app.const";

export const CONFIG = {
  columnDefs: [
    { headerName: "Name", field: "name", minWidth: 110 },
    { headerName: "phone", field: "phone_number", minWidth: 250 },
    { headerName: "Email", field: "email", minWidth: 120 },
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
  },
};
