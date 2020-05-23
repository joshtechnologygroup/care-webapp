import React from 'react';
import TableComponent from 'Components/TableComponent';

import { CONFIG } from './config';
import './PatientsList.scss';

import { patients } from 'Mockdata/patients_list.json';

export function PatientsList(props) {

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
        rowData={patients}
      />
    </div>
  );
}

export default PatientsList;
