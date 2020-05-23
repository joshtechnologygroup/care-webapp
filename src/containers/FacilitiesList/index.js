import React from 'react';
import TableComponent from 'Components/TableComponent';

import { CONFIG } from './config';
import { facilities } from 'Mockdata/facilities_list.json';
import './FacilitiesList.scss';
import PaginationController from 'Components/PaginationController';

export function FacilitiesList(props) {

  return (
    <div className="facility">
      <div className="facility__pagination-container">
        <PaginationController
          resultsShown={10}
          totalResults={56}
          onFirst={() => { console.log('on First Page') }}
          onPrevious={() => { console.log('on Previous Page') }}
          onNext={() => { console.log('on Next Page') }}
          onLast={() => { console.log('on Last Page') }}
          onShowList={() => { console.log('on Show List') }}
        />
      </div>
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
        rowData={facilities}
      />
    </div>
  );
}

export default FacilitiesList;
