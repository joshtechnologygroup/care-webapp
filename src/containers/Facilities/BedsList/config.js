import {
  DownloadIconRenderer,
  DateRenderer
} from 'Components/CellRenderer';

import { GRID_CONFIG } from 'Constants/app.const';


export const CONFIG = {
  columnDefs: [
    { headerName: 'Facility Name', field: 'facility', minWidth: 300, cellRendererParams: { isSortable: true } },
    { headerName: 'Room Type', field: 'room_type', minWidth: 200, cellRendererParams: { isSortable: true } },
    { headerName: 'Bed Type', field: 'bed_type', minWidth: 150, cellRendererParams: { isSortable: true } },
    { headerName: 'Beds #', field: 'total_bed', minWidth: 80, editable: true, cellRendererParams: { isSortable: true } },
    { headerName: 'Occupied Beds #', field: 'occupied_bed', minWidth: 80, editable: true, cellRendererParams: { isSortable: true } },
    { headerName: 'Available Beds #', field: 'available_bed', minWidth: 80, editable: true, cellRendererParams: { isSortable: true } },
    { headerName: 'Updated At', field: 'updated_at', minWidth: 200, cellRendererParams: { isSortable: true } },
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
    downloadIconRenderer: DownloadIconRenderer,
    dateRenderer: DateRenderer,
  }
};
