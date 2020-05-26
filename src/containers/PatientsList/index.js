import React, { useState, useEffect } from 'react';
import TableComponent from 'Components/TableComponent';
import Grid from '@material-ui/core/Grid';
import * as StringUtils from 'Src/utils/stringformatting';

import { CONFIG } from './config';
import { getPatientList } from 'Actions/PatientsAction';
import Sort from 'Components/Sort';
import PaginationController from 'Components/PaginationController';
import { PATIENT_LIST_URL } from 'Src/routes';
import { PAGINATION_LIMIT } from 'Src/constants'
// import { patients } from 'Mockdata/patients_list.json';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export function PatientsList( props ) {
  const [showColumnsPanel, setShowColumnsPanel] = useState(false);
  const [ page, setPage ] = useState(0);

  useEffect(() => {
      handleApiCall(StringUtils.formatVarString(PATIENT_LIST_URL,[ PAGINATION_LIMIT, 0 ]), 0);
      //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  const handleApiCall = async ( url, next_page ) => {
    const response = await props.getPatientList(url, next_page);
    if(!response)
      setPage(next_page)
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
            resultsShown={page}  
            totalResults={props.count-1}
            onFirst={() => handleApiCall( PATIENT_LIST_URL, 0 )}
            onPrevious={() => handleApiCall( props.prev, page-1 ) }
            onNext={() => { handleApiCall( props.next, page+1 )}}
            onLast={() => handleApiCall( StringUtils.formatVarString(PATIENT_LIST_URL,[ PAGINATION_LIMIT, PAGINATION_LIMIT * (props.count-1) ]), props.count-1 )}
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
        rowData={props.patients}
        showColumnsPanel={showColumnsPanel}
        onCloseColumnsPanel={() => { setShowColumnsPanel(false) }}
      />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  patients: state.patients.patients,
  count: state.patients.count,
  next: state.patients.next,
  prev: state.patients.prev,
});

PatientsList.propTypes = {
  patients: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  next: PropTypes.string.isRequired,
  prev: PropTypes.string.isRequired,
  getPatientList: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getPatientList })(PatientsList);
