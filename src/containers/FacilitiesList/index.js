import React from 'react';
import TableComponent from 'Components/TableComponent';

import { CONFIG } from './config';
import { facilities } from 'Mockdata/facilities_list.json';
export function FacilitiesList(props) {

    return (
        <div>
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
