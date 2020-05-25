import {
  OperationStatusRenderer,
  OwnerRenderer,
} from "Components/CellRenderer";
import { GRID_CONFIG } from "Constants/app.const";

export const CONFIG = {
  columnDefs: [
    { headerName: "Facility Code", field: "facility_code", minWidth: 110 },
    { headerName: "Name", field: "name", minWidth: 150 },
    { headerName: "Address", field: "address", minWidth: 120 },
    { headerName: "district", field: "district", minWidth: 100 },
    { headerName: "Facility Type", field: "facility_type", minWidth: 90 },
    {
      headerName: "Facility Ownership Type",
      field: "owned_by",
      minWidth: 140,
    },
    { headerName: "Total #", field: "total_patient", minWidth: 130, isSortable: true },
    {
      headerName: "Positive Patient #",
      field: "positive_patient",
      minWidth: 120,
      isSortable: true
    },
    {
      headerName: "Negative Patient #",
      field: "negative_patient",
      minWidth: 140,
    },
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
    OwnerRenderer: OwnerRenderer,
  },
};
