import React, {useState} from 'react';
import TableComponent from 'Components/TableComponent';


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
          onGridReady={onGridReady}
          rowData={data}
          frameworkComponents={CONFIG.frameworkComponents}
        />
    </div>
  );
}

export default ReportsList;