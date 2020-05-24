import {
  DownloadIconRenderer,
  DateRenderer
} from 'Components/CellRenderer';

import { GRID_CONFIG } from 'Constants/app.const';


export const CONFIG = {
  columnDefs: [
    { headerName: 'Report Type', field: 'reportType', minWidth: 350 },
    { headerName: 'Generated On', field: 'generatedOn', minWidth: 100, cellRenderer: 'dateRenderer' },
    { headerName: 'Start Date', field: 'startDate', minWidth: 90, cellRenderer: 'dateRenderer' },
    { headerName: 'End Date', field: 'endDate', minWidth: 90, cellRenderer: 'dateRenderer' },
    { headerName: 'End Date', field: '', cellRenderer: 'downloadIconRenderer' },
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
