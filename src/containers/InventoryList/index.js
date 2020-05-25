import React, {useState} from 'react';
import TableComponent from 'Components/TableComponent';
import Grid from '@material-ui/core/Grid';
import { CONFIG } from './config';
import { inventory } from 'Mockdata/inventory_list.json';
import PaginationController from 'Components/PaginationController';

export function InventoryList(props) {
  const [showColumnsPanel, setShowColumnsPanel] = useState(false);
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
          onShowList={() => { setShowColumnsPanel(!showColumnsPanel) }}
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
        pagination={CONFIG.pagination}
        rowData={inventory}
        showColumnsPanel={showColumnsPanel}
        onCloseColumnsPanel={() => { setShowColumnsPanel(false) }}
      />
    </React.Fragment>
  );
}

export default InventoryList;
