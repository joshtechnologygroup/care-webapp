import {
  DownloadIconRenderer,
  DateRenderer
} from 'Components/CellRenderer';

import { GRID_CONFIG } from 'Constants/app.const';


export const CONFIG = {
  columnDefs: [
    { headerName: 'Facility Name', field: 'facilityName', minWidth: 300, cellRendererParams: { isSortable: true } },
    { headerName: 'Room Type', field: 'reportType', minWidth: 200, cellRendererParams: { isSortable: true } },
    { headerName: 'Bed Type', field: 'bedType', minWidth: 150, cellRendererParams: { isSortable: true } },
    { headerName: 'Beds #', field: 'beds', minWidth: 80, editable: true, cellRendererParams: { isSortable: true } },
    { headerName: 'Occupied Beds #', field: 'cooupiedBeds', minWidth: 80, editable: true, cellRendererParams: { isSortable: true } },
    { headerName: 'Available Beds #', field: 'availableBeds', minWidth: 80, editable: true, cellRendererParams: { isSortable: true } },
    { headerName: 'Updated At', field: 'updatedAt', minWidth: 200, cellRenderer: 'dateRenderer', cellRendererParams: { isSortable: true } },
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
