import React, { useState } from 'react';
import TableComponent from 'Components/TableComponent';
import Grid from '@material-ui/core/Grid';

import Sort from 'Components/Sort';
import Filters from 'Components/Filters';
import PaginationController from 'Components/PaginationController';
import { patients } from 'Mockdata/patients_list.json';
import { CONFIG } from './config';

export function PatientsList(props) {
  const [showColumnsPanel, setShowColumnsPanel] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <React.Fragment>
      <Grid container
        direction
        alignItems="center"
        className={`container-padding ${showOverlay ? "filter-container-overlay" : 'filter-container'}`}>
        <Grid item xs={12} sm={12} >
          <Filters onSeeMore={() => { setShowOverlay(!showOverlay) }} />
        </Grid>
      </Grid>
      <div className={showOverlay ? 'overlay overlay-show' : 'overlay'}></div>
      <div className="container-padding">
        <Grid
          className="sort-pagination"
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
              onShowList={() => { setShowColumnsPanel(!showColumnsPanel) }}
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
          showColumnsPanel={showColumnsPanel}
          onCloseColumnsPanel={() => { setShowColumnsPanel(false) }}
        />
      </div>
    </React.Fragment>
  );
}

export default PatientsList;
