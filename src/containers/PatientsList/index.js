import React, { useState, useEffect } from 'react';
import TableComponent from 'Components/TableComponent';
import Grid from '@material-ui/core/Grid';
import * as StringUtils from 'Src/utils/stringformatting';

import { CONFIG } from './config';
import moment from "moment";
import { getPatientList, getsPatientDependencies } from 'Actions/PatientsAction';
import Sort from 'Components/Sort';
import PaginationController from 'Components/PaginationController';
import { PATIENT_LIST_URL } from 'Src/routes';
import { PAGINATION_LIMIT, CLINICAL_STATUS_UPDATED_AT, PORTEA_CALLED_AT } from 'Src/constants'
// import { patients } from 'Mockdata/patients_list.json';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export function PatientsList( props ) {
  const [showColumnsPanel, setShowColumnsPanel] = useState(false);
  const [ page, setPage ] = useState(0);
  const [ patients, setPatients ] = useState([]);
  const [ totalPages, setTotalPages ] = useState(0)

  // getting all the denpendencies related to patient list
  useEffect(() => {
    if (!props.districts_list || !props.clinical_status_list || !props.cluster_group_list || !props.covid_status_list)
      props.getsPatientDependencies();
  });

  // setting all the foreign key to there corresponding values
  useEffect(() => {
    const { districts_list, clinical_status_list, cluster_group_list, covid_status_list, patients } = props
    if( districts_list && clinical_status_list && cluster_group_list && covid_status_list && patients ){
      const joinById = {
        'clinical_status': clinical_status_list,
        'district': districts_list,
        'cluster_group': cluster_group_list,
        'covid_status': covid_status_list
      }
      let update_patients = Object.assign([], props.patients);

      update_patients.forEach((attr) => {
        let date = new Date(attr[CLINICAL_STATUS_UPDATED_AT])
        attr[CLINICAL_STATUS_UPDATED_AT] = moment(date).fromNow();
        date = new Date(attr[PORTEA_CALLED_AT])
        attr[PORTEA_CALLED_AT] = date.toDateString();
      });

      Object.keys(joinById).forEach((id) => {
        update_patients.forEach(patient => joinById[id].forEach(value => {
          if(value.id === patient[id]){
            patient[id] = value.name
          }
        }));
      })
      setTotalPages(Math.floor(props.count/PAGINATION_LIMIT) - 1)
      setPatients(update_patients);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ props.patients ]); // if the list changes then again set all the foreign keys


  // when the component loads bring the patients list
  useEffect(() => {
      handleApiCall(StringUtils.formatVarString(PATIENT_LIST_URL,[ PAGINATION_LIMIT, 0 ]), 0);
      //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  const handleApiCall = async ( url, next_page ) => {
    props.getPatientList( url );
    setPage( next_page );
  }

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={3} >
          <Sort
            onSelect={(val) => console.log(`Sort By ${val} using API`)}
            options={CONFIG.columnDefs}
            onToggleSort={(toggleVal => console.log(`Sort By ${toggleVal} using API`))} />
        </Grid>
        <Grid item xs={12} sm={4} >
          <PaginationController
            resultsShown={page || 0}
            totalResults={totalPages || 0}
            onFirst={() => handleApiCall( StringUtils.formatVarString(PATIENT_LIST_URL,[ PAGINATION_LIMIT, 0 ]) , 0 )}
            onNext={() => { if( props.next ) handleApiCall( props.next, page+1 )}}
            onPrevious={() => { if( props.prev ) handleApiCall( props.prev, page-1 )} }
            onLast={() => handleApiCall( StringUtils.formatVarString(PATIENT_LIST_URL,[ PAGINATION_LIMIT, PAGINATION_LIMIT * totalPages ]), totalPages )}
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
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  patients: state.patients.results,
  count: state.patients.count,
  next: state.patients.next,
  prev: state.patients.previous,
  districts_list: state.districts.results,
  clinical_status_list: state.clinicalStatus.results,
  cluster_group_list: state.clusterGroup.results,
  covid_status_list: state.clinicalStatus.results
});

PatientsList.propTypes = {
  patients: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  next: PropTypes.string.isRequired,
  prev: PropTypes.string.isRequired,
  districts_list: PropTypes.array.isRequired,
  clinical_status_list: PropTypes.array.isRequired,
  cluster_group_list: PropTypes.array.isRequired,
  covid_status_list: PropTypes.array.isRequired,
  getPatientList: PropTypes.func.isRequired,
  getsPatientDependencies: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getPatientList, getsPatientDependencies })(PatientsList);
