import {
  DateRenderer
} from 'Components/CellRenderer';

import {ActionRenderer} from './ActionRenderer';

import { GRID_CONFIG } from 'Constants/app.const';


export const CONFIG = {
  columnDefs: [
    { headerName: 'Faciltiy Name', field: 'facilityName', minWidth: 350, cellRendererParams: { isSortable: true } },
    { headerName: 'Type', field: 'type', minWidth: 100, cellRendererParams: { isSortable: true } },
    { headerName: 'Required #', field: 'requiredNo', minWidth: 90, editable: true, cellRendererParams: { isSortable: true },  onCellValueChanged: (data)=>{console.log('on cell change', data)} },
    { headerName: 'Current #', field: 'currentNo', minWidth: 90, editable: true, cellRendererParams: { isSortable: true },  onCellValueChanged: (data)=>{console.log('on cell change', data)} },
    { headerName: 'Updated At', field: 'updatedAt', cellRenderer: 'dateRenderer', cellRendererParams: { isSortable: true } },
    { headerName: 'Action', field: 'action', cellRenderer: 'actionRenderer' },
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
    dateRenderer: DateRenderer,
    actionRenderer: ActionRenderer,
  }
};
