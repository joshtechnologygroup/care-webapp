import {
  OperationStatusRenderer,
  OwnerRenderer
} from "Components/CellRenderer";
import { FacilityRenderer } from 'Components/CellRenderer/FacilityRenderer'
import { GRID_CONFIG } from "Constants/app.const";

export const CONFIG = {
  columnDefs: [
    { headerName: "Name", field: "name", minWidth: 250, cellRendererParams: { isSortable: true }, cellRenderer: 'FacilityRenderer' },
    { headerName: "Address", field: "address", minWidth: 120, cellRendererParams: { isSortable: true } },
    { headerName: "District", field: "district", minWidth: 100, cellRendererParams: { filterType: 'boolean', options: [] }  },
    { headerName: "Facility Type", field: "facility_type", minWidth: 90 },
    {
      headerName: "Facility Ownership Type",
      field: "owned_by",
      minWidth: 140,
    },
    { headerName: "Total #", field: "total_patient", minWidth: 130, cellRendererParams: { isSortable: true, filterType: 'number' } },
    {
      headerName: "Positive Patient #",
      field: "positive_patient",
      minWidth: 120,
      cellRendererParams: { isSortable: true, filterType: 'number' }
    },
    {
      headerName: "Negative Patient #",
      field: "negative_patient",
      minWidth: 140,
      cellRendererParams: { isSortable: true, filterType: 'number' }
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
    FacilityRenderer: FacilityRenderer
  },
};
