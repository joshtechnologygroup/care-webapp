import React from 'react';
import TableComponent from 'Components/TableComponent';
import Grid from '@material-ui/core/Grid';
import { CONFIG } from './config';
import { facilities } from 'Mockdata/facilities_list.json';
import PaginationController from 'Components/PaginationController';
import Sort from 'Components/Sort';

export function FacilitiesList(props) {

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={4} >
          <Sort
            onSelect={(val) => console.log(`Sort By ${val} using API`)}
            options={CONFIG.columnDefs}
            onToggleSort={(toggleVal => console.log(`Sort By ${toggleVal} using API`))} />
        </Grid>
        <Grid item xs={12} sm={5} >

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
        rowData={facilities}
      />
    </React.Fragment>
  );
}

export default FacilitiesList;
