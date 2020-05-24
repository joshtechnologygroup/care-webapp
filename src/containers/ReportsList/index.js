import React, {useState} from 'react';
import TableComponent from 'Components/TableComponent';
import Grid from '@material-ui/core/Grid';

import PaginationController from 'Components/PaginationController';
import { CONFIG } from './config';
import './ReportsList.scss';

export function ReportsList(props) {
  const [data, setData] = useState([]);

  function onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      setData(data);
    };

    httpRequest.open(
      'GET',
      'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };
  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="flex-start"
      >
        <PaginationController
          resultsShown={10}
          totalResults={56}
          onFirst={() => { console.log('on First Page') }}
          onPrevious={() => { console.log('on Previous Page') }}
          onNext={() => { console.log('on Next Page') }}
          onLast={() => { console.log('on Last Page') }}
          onShowList={() => { console.log('on Show List') }}
        />
      </Grid>
        <TableComponent
          modules={CONFIG.modules}
          columnDefs={CONFIG.columnDefs}
          rowHeight={CONFIG.rowHeight}
          headerHeight={CONFIG.headerHeight}
          autoGroupColumnDef={CONFIG.autoGroupColumnDef}
          defaultColDef={CONFIG.defaultColDef}
          rowSelection={CONFIG.rowSelection}
          rowGroupPanelShow={CONFIG.rowGroupPanelShow}
          pivotPanelShow={CONFIG.pivotPanelShow}
          onGridReady={onGridReady}
          rowData={data}
          frameworkComponents={CONFIG.frameworkComponents}
        />
    </React.Fragment>
  );
}

export default ReportsList;