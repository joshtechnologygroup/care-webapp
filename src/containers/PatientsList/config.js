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
        { field: 'total' },
      ],
      autoGroupColumnDef: {
        headerName: 'Group',
        minWidth: 170,
        field: 'athlete',
        valueGetter: function(params) {
          if (params.node.group) {
            return params.node.key;
          } else {
            return params.data[params.colDef.field];
          }
        },
        headerCheckboxSelection: true,
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: { checkbox: true },
      },
      defaultColDef: {
        editable: true,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
      },
    //   rowSelection: 'multiple',
      rowGroupPanelShow: 'always',
      pivotPanelShow: 'always',
      rowData: [],
};