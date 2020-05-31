import {
  DateRenderer
} from 'Components/CellRenderer';

import {ActionRenderer} from './ActionRenderer';

import { GRID_CONFIG } from 'Constants/app.const';


export const CONFIG = {
  columnDefs: [
    { headerName: 'Faciltiy Name', field: 'facility', minWidth: 350, cellRendererParams: { isSortable: false, filterType: 'boolean', options: [] }, hide: true },
    { headerName: 'Type', field: 'item', minWidth: 100, cellRendererParams: { isSortable: true, filterType: 'boolean', options: [] }, },
    { headerName: 'Required #', field: 'required_quantity', minWidth: 90, editable: true, cellRendererParams: { isSortable: true, filterType: 'number', filterPriority: true  },  onCellValueChanged: (data)=>{console.log('on cell change', data)} },
    { headerName: 'Current #', field: 'current_quantity', minWidth: 90, editable: true, cellRendererParams: { isSortable: true, filterType: 'number', filterPriority: true  },  onCellValueChanged: (data)=>{console.log('on cell change', data)} },
    { headerName: 'Updated At', field: 'updated_at', cellRendererParams: { isSortable: true, filterType: 'date', filterPriority: true } },
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