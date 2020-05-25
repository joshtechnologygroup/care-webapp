import React from 'react';
import Grid from '@material-ui/core/Grid';

import TableComponent from 'Components/TableComponent';
import { patients_transfers } from 'Mockdata/patients_transfer_list.json';
import PaginationController from 'Components/PaginationController';
import { CONFIG } from './config';

export function TransfersList(props) {

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
        frameworkComponents={CONFIG.frameworkComponents}
        cellStyle={CONFIG.cellStyle}
        rowData={patients_transfers}
      />
    </React.Fragment>
  );
}

export default TransfersList;
