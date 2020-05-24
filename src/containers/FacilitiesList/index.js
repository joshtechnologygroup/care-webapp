import React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import TableComponent from "Components/TableComponent";
import Grid from '@material-ui/core/Grid';

import { CONFIG } from "./config";
import { getFacilitiesList, getFacilityTypeList } from "Actions/FacilitiesAction";
import { getDistrictList, getOwnershipTypeList } from "Actions/CommonAction";
import PaginationController from 'Components/PaginationController';

export function FacilitiesList(props) {
    const {
        fetchFacilityList,
        fetchFacilityTypeList,
        fetchDistrictList,
        fetchFacilityOwnershipTypeList,
        list,
        queryParams,
        distrcitsList,
        ownershipTypesList,
        facilityTypesList,
    } = props;

    useEffect(() => {
        fetchFacilityList({});
    }, [queryParams]);

    useEffect(() => {
        fetchFacilityTypeList();
        fetchDistrictList();
        fetchFacilityOwnershipTypeList();
    }, []);

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="flex-start"
      >
        <PaginationController
          resultsShown={10}
          totalResults={56}
          onFirst={() => { console.log('on First Page') }}
          onPrevious={() => { console.log('on Previous Page') }}
          onNext={() => { console.log('on Next Page') }}
          onLast={() => { console.log('on Last Page') }}
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
        rowData={list}
      />
    </React.Fragment>
  );
}

FacilitiesList.defaultProps = {
    list: [],
    fetchFacilityList: () => {},
    queryParams: {},
};

const mapStateToProps = state => {
    const { facilities, districts, ownershipTypes, facilityTypes } = state;
    return {
        list: facilities.results,
        distrcitsList: districts.results,
        ownershipTypesList: ownershipTypes.results,
        facilityTypesList: facilityTypes.results,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchFacilityList: params => {
            dispatch(getFacilitiesList(params));
        },
        fetchFacilityTypeList: params => {
            dispatch(getFacilityTypeList(params));
        },
        fetchDistrictList: params => {
            dispatch(getDistrictList(params));
        },
        fetchFacilityOwnershipTypeList: params => {
            dispatch(getOwnershipTypeList(params));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FacilitiesList);
