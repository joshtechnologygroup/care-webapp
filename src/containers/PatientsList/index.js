import React from 'react';
import TableComponent from 'Components/TableComponent';


import { CONFIG } from './config';
import './PatientsList.scss';

export function PatientsList(props) {

  // const [data, setData] = useState([]);

  // function onGridReady(params) {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;

  //   const httpRequest = new XMLHttpRequest();
  //   const updateData = data => {
  //     setData(data);
  //   };

  //   httpRequest.open(
  //     'GET',
  //     'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
  //   );
  //   httpRequest.send();
  //   httpRequest.onreadystatechange = () => {
  //     if (httpRequest.readyState === 4 && httpRequest.status === 200) {
  //       console.log(JSON.parse(httpRequest.responseText));
  //       updateData(JSON.parse(httpRequest.responseText));
  //     }
  //   };
  // };

  const patients = [{
    patientName: 'Patient A',
    age: 12,
    gender: 'male',
    idICMR: 786876876,
    idGovt: 76875765,
    idFacility: 7676786,
    clinicalStatus: 'Moderate',
    covidStatus: 'positive',
    healthConditions: 'Oxygen',
    admissionDate: '01/04/2020',
    dischargeDate: '01/04/2020',
    patientDistrict: 'ABCDistrict',
    facility: 'ABCFicility',
    action: 'do Action'
  },
  {
    patientName: 'Patient B',
    age: 12,
    gender: 'male',
    idICMR: 786876876,
    idGovt: 76875765,
    idFacility: 7676786,
    clinicalStatus: 'Moderate',
    covidStatus: 'positive',
    healthConditions: 'Oxygen',
    admissionDate: '01/04/2020',
    dischargeDate: '01/04/2020',
    patientDistrict: 'ABCDistrict',
    facility: 'ABCFicility',
    action: 'do Action'
  },
  {
    patientName: 'Patient B',
    age: 12,
    gender: 'male',
    idICMR: 786876876,
    idGovt: 76875765,
    idFacility: 7676786,
    clinicalStatus: 'Moderate',
    covidStatus: 'positive',
    healthConditions: 'Oxygen',
    admissionDate: '01/04/2020',
    dischargeDate: '01/04/2020',
    patientDistrict: 'ABCDistrict',
    facility: 'ABCFicility',
    action: 'do Action'
  }];
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
        cellStyle={CONFIG.cellStyle}
        rowData={patients}
      />
    </div>
  );
}

export default PatientsList;
