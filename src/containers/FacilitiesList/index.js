import React, {useState} from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import TableComponent from "Components/TableComponent";
import Grid from "@material-ui/core/Grid";
import { PropTypes } from "prop-types";
import _ from "underscore";

import { CONFIG } from "./config";
import { getFacilitiesList, getFacilityDependencies } from "Actions/FacilitiesAction";
import PaginationController from 'Components/PaginationController';
import Sort from 'Components/Sort';
import Filters from "Components/Filters";

export function FacilitiesList(props) {
    const {
        fetchFacilityList,
        fetchFacilityDependencies,
        facilityList,
        queryParams,
        districtsList,
        ownershipTypesList,
        facilityTypesList,
        count,
    } = props;
    const itemsPerPage = 4;

    const [showColumnsPanel, setShowColumnsPanel] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const updateFacilityListWithNames = (
        facilityList,
        districtsList,
        facilityTypesList,
        ownershipTypesList
    ) => {
        if (
            !_.isEmpty(districtsList) &&
            !_.isEmpty(ownershipTypesList) &&
            !_.isEmpty(facilityTypesList)
        ) {
            facilityList.map(facility => {
                const district = districtsList.find(
                    district => district.id === facility.district
                );
                if (district) {
                    facility.district = district.name;
                }
                const ownershipType = ownershipTypesList.find(
                    ownershipType => ownershipType.id === facility.owned_by
                );
                if (ownershipType) {
                    facility.owned_by = ownershipType.name;
                }
                const facilityType = facilityTypesList.find(
                    facilityType => facilityType.id === facility.facility_type
                );
                if (facilityType) {
                    facility.facility_type = facilityType.name;
                }
                return facility;
            });
        }
        return facilityList;
    };

    // Handle has more.
    useEffect(() => {
        if (!_.isEmpty(facilityList)) {
            setHasPrev(offset - facilityList.length >= 0 ? true : false);
            setHasMore(offset + facilityList.length < count ? true : false);
        }
    }, [facilityList, offset, count]);

    const fetchMoreFacilites = () => {
        if (hasMore) {
            setOffset(offset + facilityList.length);
        }
    };

    const fetchPrevFacilities = () => {
        if (hasPrev) {
            setOffset(offset - facilityList.length);
        }
    };

    useEffect(() => {
        if (!facilityTypesList || !districtsList || !ownershipTypesList) {
            fetchFacilityDependencies();
        }
    });

    useEffect(() => {
        fetchFacilityList({
            ...queryParams,
            offset: offset,
        });
    }, [queryParams, offset, fetchFacilityList]);

    return (
        <React.Fragment>
            <Grid container
              direction
              alignItems="center"
              className={`container-padding ${showOverlay ? "filter-container-overlay" : 'filter-container'}`}>
              <Grid item xs={12} sm={12} >
                <Filters
                  options={CONFIG.columnDefs}
                  onSeeMore={() => { setShowOverlay(!showOverlay) }} />
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
                    onSelect={(val) => console.log(`Sort By ${val} using API`)}
                    options={CONFIG.columnDefs}
                    onToggleSort={(toggleVal => console.log(`Sort By ${toggleVal} using API`))} />
                </Grid>
                <Grid item xs={12} sm={5} >
                  <PaginationController
                      resultsShown={10}
                      totalResults={56}
                      onFirst={() => {
                          setOffset(0);
                      }}
                      onPrevious={() => fetchPrevFacilities()}
                      onNext={() => fetchMoreFacilites()}
                      onLast={() => {
                          setOffset(Math.floor((count - 1) / itemsPerPage) * itemsPerPage);
                      }}
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
                  rowData={updateFacilityListWithNames(
                      facilityList,
                      districtsList,
                      facilityTypesList,
                      ownershipTypesList
                  )}
                  showColumnsPanel={showColumnsPanel}
                  onCloseColumnsPanel={() => { setShowColumnsPanel(false) }}
              />
            </div>
        </React.Fragment>
    );
}

FacilitiesList.propTypes = {
    facilityList: PropTypes.arrayOf(PropTypes.object),
    fetchFacilityList: PropTypes.func,
    fetchFacilityDependencies: PropTypes.func,
    queryParams: PropTypes.object,
    count: PropTypes.number,
};

FacilitiesList.defaultProps = {
    facilityList: [],
    fetchFacilityList: () => {},
    fetchFacilityDependencies: () => {},
    queryParams: {},
    count: 0,
};

const mapStateToProps = state => {
    const { facilities, districts, ownershipTypes, facilityTypes } = state;
    return {
        facilityList: facilities.results,
        count: facilities.count,
        districtsList: districts.results,
        ownershipTypesList: ownershipTypes.results,
        facilityTypesList: facilityTypes.results,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchFacilityList: params => {
            dispatch(getFacilitiesList(params));
        },
        fetchFacilityDependencies: params => {
            dispatch(getFacilityDependencies(params));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FacilitiesList);
