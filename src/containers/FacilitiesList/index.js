import React, {useState} from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import TableComponent from "Components/TableComponent";
import Grid from '@material-ui/core/Grid';
import { PropTypes } from 'prop-types';

import { CONFIG } from "./config";
import { getFacilitiesList, getFacilityTypeList } from "Actions/FacilitiesAction";
import { getDistrictList, getOwnershipTypeList } from "Actions/MiscAction";
import PaginationController from 'Components/PaginationController';
import Sort from 'Components/Sort';

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
    const [showColumnsPanel, setShowColumnsPanel] = useState(false);

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
            resultsShown={10}
            totalResults={56}
            onFirst={() => { console.log('on First Page') }}
            onPrevious={() => { console.log('on Previous Page') }}
            onNext={() => { console.log('on Next Page') }}
            onLast={() => { console.log('on Last Page') }}
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
        rowData={list}
        showColumnsPanel={showColumnsPanel}
        onCloseColumnsPanel={() => { setShowColumnsPanel(false) }}
      />
    </React.Fragment>
  );
}

FacilitiesList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object),
    fetchFacilityList: PropTypes.func,
    fetchFacilityTypeList: PropTypes.func,
    fetchDistrictList: PropTypes.func,
    fetchFacilityOwnershipTypeList: PropTypes.func,
    queryParams: PropTypes.object,
  };

FacilitiesList.defaultProps = {
    list: [],
    fetchFacilityList: () => {},
    fetchFacilityTypeList: () => {},
    fetchDistrictList: () => {},
    fetchFacilityOwnershipTypeList: () => {},
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
