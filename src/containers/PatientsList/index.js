import React from 'react';
import Grid from '@material-ui/core/Grid';

import TableComponent from 'Components/TableComponent';
import Sort from 'Components/Sort';
import PaginationController from 'Components/PaginationController';
import { patients } from 'Mockdata/patients_list.json';
import { CONFIG } from './config';

export function PatientsList(props) {
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
        rowData={patients}
      />
    </React.Fragment>
  );
}

export default PatientsList;
