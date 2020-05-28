import React, { useState, useEffect } from 'react';
import TableComponent from 'Components/TableComponent';
import Grid from '@material-ui/core/Grid';
import { GET } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import * as StringUtils from 'Src/utils/stringformatting';

import { CONFIG } from './config';
import * as Routes from 'Src/routes';
import moment from 'moment';
import { getPatientList, getsPatientDependencies } from 'Actions/PatientsAction';
import Sort from 'Components/Sort';
import Filters from 'Components/Filters';
import PaginationController from 'Components/PaginationController';
import { PATIENT_LIST_URL } from 'Src/routes';
import {
  PAGINATION_LIMIT,
  CLINICAL_STATUS_UPDATED_AT,
  PORTEA_CALLED_AT,
  INITIAL_PAGE,
  MAPPING_PROPS
} from 'Src/constants'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';


export function PatientsList( props ) {
  const [showColumnsPanel, setShowColumnsPanel] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [ page, setPage ] = useState(INITIAL_PAGE);
  const [ patients, setPatients ] = useState(null);
  const [ totalPages, setTotalPages ] = useState(INITIAL_PAGE);
  const [ currentUrl, setCurrentUrl ] = useState(StringUtils.formatVarString(PATIENT_LIST_URL,[ PAGINATION_LIMIT, 0 ]));
  const [ selectedParams, setSelectedParams ] = useState({});
  const [ ordering, setOrdering ] = useState('none');

  // getting all the denpendencies related to patient list
  useEffect(() => {
    let required_data = [[], []]

    const required = {
      'districts_list': [Routes.DISTRICT_LIST_URL, ReducerTypes.GET_DISTRICT_LIST],
      'clinical_status_list': [Routes.CLINICAL_STATUS_LIST_URL, ReducerTypes.GET_CLINICAL_STATUS_LIST],
      'cluster_group_list': [Routes.CLUSTER_GROUP_LIST_URL, ReducerTypes.GET_CLUSTER_GROUP_LIST],
      'covid_status_list': [Routes.COVID_STATUS_LIST_URL, ReducerTypes.GET_COVID_STATUS_LIST],
      'facilities':[Routes.FACILITY_LIST_URL, ReducerTypes.GET_FACILITY_LIST],
      'ownership_types':[Routes.OWNERSHIP_TYPE_LIST_URL, ReducerTypes.GET_OWNERSHIP_TYPE_LIST],
      'facility_types': [Routes.FACILITY_TYPE_LIST_URL, ReducerTypes.GET_FACILITY_TYPE_LIST]

    }

    Object.keys(required).forEach((list) => {
      if(!props[list]){
        required_data[0].push([required[list][0], GET, {}, selectedParams])
        required_data[1].push(required[list][1])
      }
    })

    props.getsPatientDependencies(required_data);
  });

  // setting all the foreign key to there corresponding values
  useEffect(() => {
    const {
      districts_list,
      clinical_status_list,
      cluster_group_list,
      covid_status_list,
      patients,
      facilities,
      ownership_types,
      facility_types
    } = props
    if(
        districts_list &&
        clinical_status_list &&
        cluster_group_list &&
        covid_status_list &&
        patients &&
        facilities &&
        ownership_types &&
        facility_types
    ){
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
          MAPPING_PROPS[value.name] = value.id;
          if(value.id === patient[id]){
            patient[id] = value.name
          }
        }));
      })

      const update_list = {
        'updated_clinical_status_list': [],
        'updated_district_list': [],
        'updated_facility_list':[],
        'updated_cluster_group_list':[],
        'updated_covid_status_list':[],
        'updated_ownership_types_list': [],
        'updated_facility_types_list': []
      }
      console.log(ownership_types);
      const props_list = {
        'updated_clinical_status_list': clinical_status_list,
        'updated_district_list': districts_list,
        'updated_facility_list': facilities,
        'updated_cluster_group_list': cluster_group_list,
        'updated_covid_status_list': covid_status_list,
        'updated_ownership_types_list': ownership_types,
        'updated_facility_types_list': facility_types
      }
      Object.keys(update_list).forEach((list_name) => {
        props_list[list_name].forEach((element)=>{
          console.log(element.name);
          update_list[list_name].push(element.name);
        })
      })

      CONFIG.columnDefs.forEach((col) => {
        if(col.field === 'facility_district' || col.field === 'district'){
          col.cellRendererParams.options = update_list['updated_district_list']
        }
        if(col.field === 'facility_name'){
          col.cellRendererParams.options = update_list['updated_facility_list']
        }
        if(col.field === 'cluster_group'){
          col.cellRendererParams.options = update_list['updated_cluster_group_list']
        }
        if(col.field === 'covid_status'){
          col.cellRendererParams.options = update_list['updated_covid_status_list']
        }
        if(col.field === 'clinical_status'){
          col.cellRendererParams.options = update_list['updated_clinical_status_list']
        }
        if(col.field === 'ownership_type'){
          col.cellRendererParams.options = update_list['updated_ownership_types_list']
        }
        if(col.field === 'facility_type'){
          col.cellRendererParams.options = update_list['updated_facility_types_list']
        }
      })


      setTotalPages(Math.ceil(props.count/PAGINATION_LIMIT))
      setPatients(update_patients);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.districts_list,
    props.clinical_status_list,
    props.cluster_group_list,
    props.covid_status_list,
    props.patients,
    props.facilities
  ]); // if the list changes then again set all the foreign keys


  // when the component loads bring the patients list
  useEffect(() => {
      handleApiCall(currentUrl, page);
      //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ selectedParams, ordering ]);

  const handleApiCall = async (url, next_page) => {
    let params = Object.assign({}, selectedParams);
    if(ordering === 'desc') {
      Object.keys(params).map(param => {
        params[param] = '-' + params[param]
      })
    }
    props.getPatientList( url, params );
    setPage(next_page);
    setCurrentUrl(url);
  }

  const handleBooleanCallBack = (field, val) => {
    val = val.map(val => MAPPING_PROPS[val])
    const update_select_params = { ...selectedParams }
    update_select_params[field] = val
    setSelectedParams({...update_select_params});
  }

  return (
    <React.Fragment>
      <Grid container
        direction
        alignItems="center"
        className={`container-padding ${showOverlay ? "filter-container-overlay" : 'filter-container'}`}>
        <Grid item xs={12} sm={12} >
          <Filters
            options={CONFIG.columnDefs}
            onSeeMore={() => { setShowOverlay(!showOverlay) }}
            handleBooleanCallBack={(field, val) => handleBooleanCallBack(field, val)}/>
        </Grid>
      </Grid>
      <div onClick={() => setShowOverlay(!showOverlay)} className={showOverlay ? 'overlay overlay-show' : 'overlay'}></div>
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
              onSelect={val =>   setSelectedParams({ 'ordering' : val })}
              options={CONFIG.columnDefs}
              onToggleSort={toggleVal => setOrdering(toggleVal)} />
          </Grid>
          <Grid item xs={12} sm={5} >
            <PaginationController
              resultsShown={page}
              totalResults={totalPages}
              onFirst={() => handleApiCall( StringUtils.formatVarString(PATIENT_LIST_URL,[ PAGINATION_LIMIT, 0 ]) ,
                INITIAL_PAGE
              )}
              onNext={() => { if( props.next ) handleApiCall( props.next, page+1, )}}
              onPrevious={() => { if( props.prev ) handleApiCall( props.prev, page-1, ) } }
              onLast={() => handleApiCall( StringUtils.formatVarString(PATIENT_LIST_URL,[ PAGINATION_LIMIT, PAGINATION_LIMIT * (totalPages - 1) ]),
                totalPages
              )}
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

const mapStateToProps = (state) => ({
  facility_types: state.facilityTypes.results,
  ownership_types: state.ownershipTypes.results,
  facilities: state.facilities.results,
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
  facility_types: PropTypes.array.isRequired,
  ownership_types: PropTypes.array.isRequired,
  facilities: PropTypes.array.isRequired,
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
