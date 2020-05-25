import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';

import TableComponent from 'Components/TableComponent';
import { CONFIG } from './config';
import { getPatientList } from 'Actions/PatientsAction';
import PaginationController from 'Components/PaginationController';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export function PatientsList( props ) {
  const [ page, setPage ] = useState(1);

  const handlePage = async ( next_page ) => {
    const response = await props.getPatientList(next_page);
    if(response)
      setPage(next_page);
  }

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="flex-start"
      >
        <PaginationController
          resultsShown={1}
          totalResults={props.count}
          onFirst={() => handlePage(1)}
          onPrevious={() => handlePage(page-1)}
          onNext={() => handlePage(page+1)}
          onLast={() => handlePage(props.count)}
          onShowList={() => { console.log('on Show List') }}
        />
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
      />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  patients: state.patients.patients,
  count: state.patients.count,
});

PatientsList.propTypes = {
  patients: PropTypes.array.isRequired,
  getPatientList: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getPatientList })(PatientsList);
