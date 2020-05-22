import {
  DownloadIconRenderer
} from 'Components/CellRenderer';

export const CONFIG  = {
      columnDefs: [
        // {
        //   field: 'athlete',
        //   minWidth: 170,
        //   checkboxSelection: function(params) {
        //     return params.columnApi.getRowGroupColumns().length === 0;
        //   },
        //   headerCheckboxSelection: function(params) {
        //     return params.columnApi.getRowGroupColumns().length === 0;
        //   },
        // },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: '', cellRenderer: 'DownloadIconRenderer' },
      ],
      // autoGroupColumnDef: {
      //   headerName: 'Group',
      //   minWidth: 170,
      //   field: 'athlete',
      //   valueGetter: function(params) {
      //     if (params.node.group) {
      //       return params.node.key;
      //     } else {
      //       return params.data[params.colDef.field];
      //     }
      //   },
      //   headerCheckboxSelection: true,
      //   cellRenderer: 'agGroupCellRenderer',
      //   cellRendererParams: { checkbox: true },
      // },
      defaultColDef: {
        // enableRowGroup: true,
        // enablePivot: true,
        // enableValue: true,
        flex: 1,
        minWidth: 100,
        sortable: true, // Set is true for sorting
        resizable: true, // Set is true for column resizable
        suppressMenu: true, // Set it false to show menu options
        suppressMovable: false, // Set it true to stop column re-ordering
        filter: true,
        editable: false, // Set true in case editing cells
      },
    //   rowSelection: 'multiple',
      // rowGroupPanelShow: 'always',
      // pivotPanelShow: 'always',
      suppressContextMenu: true, // Set true to hide cell option menu that opens on right click
      rowHeight: 60,
      headerHeight: 60,
      rowSelection: 'single',
      rowData: [],
      frameworkComponents: {
        DownloadIconRenderer: DownloadIconRenderer,
      }
};