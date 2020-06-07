import React, { useState } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import TableComponent from "Components/TableComponent";
import Grid from "@material-ui/core/Grid";
import { PropTypes } from "prop-types";
import _ from "underscore";
import { CONFIG } from "./config";
import {
    getFacilitiesList,
    getFacilityDependencies,
} from "Actions/FacilitiesAction";
import PaginationController from "Components/PaginationController";
import Sort from "Components/Sort";
import Filters from "Components/Filters";
import {
    multiSelectBooleanFilterCallback,
    multiSelectNumberFilterCallback,
} from "Src/utils/listFilter";
import {PAGINATION_LIMIT} from 'Src/constants';

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
    const itemsPerPage = PAGINATION_LIMIT;

    const [showColumnsPanel, setShowColumnsPanel] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [ordering, setOrdering] = useState(null);
    const [sortType, setSortType] = useState(null);
    const [orderingParam, setOrderingParam] = useState(null);
    const [selectedParams, setSelectedParams] = useState({});

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
            const mappedFacilityList = [];
            facilityList.forEach(facility => {
                const mappedFacility = { ...facility };
                const district = districtsList.find(
                    district => district.id === facility.district
                );
                if (district) {
                    mappedFacility.district = district.name;
                }
                const ownershipType = ownershipTypesList.find(
                    ownershipType => ownershipType.id === facility.owned_by
                );
                if (ownershipType) {
                    mappedFacility.owned_by = ownershipType.name;
                }
                const facilityType = facilityTypesList.find(
                    facilityType => facilityType.id === facility.facility_type
                );
                if (facilityType) {
                    mappedFacility.facility_type = facilityType.name;
                }
                mappedFacilityList.push(mappedFacility);
            });
            return mappedFacilityList;
        }
        return facilityList;
    };

    // Handle has more.
    useEffect(() => {
        if (!_.isEmpty(facilityList)) {
            setHasPrev(offset > 0 ? true : false);
            setHasMore(offset + itemsPerPage < count ? true : false);
        }
    }, [facilityList, offset, count]);

    const fetchMoreFacilites = () => {
        if (hasMore) {
            setOffset(offset + itemsPerPage);
        }
    };

    const fetchPrevFacilities = () => {
        if (hasPrev) {
            setOffset(offset - itemsPerPage);
        }
    };

    useEffect(() => {
        if (!facilityTypesList || !districtsList || !ownershipTypesList) {
            fetchFacilityDependencies();
        }
    }, []);

    useEffect(() => {
        if (ordering && sortType !== "none") {
            setOrderingParam(sortType === "asec" ? ordering : `-${ordering}`);
        } else {
            setOrderingParam(null);
        }
    }, [ordering, sortType]); 

    useEffect(() => {
        const options = {
            ...queryParams,
            offset: offset,
        };
        if (orderingParam) {
            options.ordering = orderingParam;
        }
        fetchFacilityList(options);
    }, [queryParams, offset, fetchFacilityList, orderingParam]);

    const applyFilter = () => {
        const options = {
            ...queryParams,
            ...selectedParams,
            offset: offset,
        };
        if (orderingParam) {
            options.ordering = orderingParam;
        }
        fetchFacilityList(options);
    }

    const sortByValue = val => {
        setOrdering(val);
    };

    const handleBooleanCallBack = val => {
        // make sure to match param dict key and required list key are same
        const requiredLists = {
            district: districtsList,
        };
        setSelectedParams({
            ...multiSelectBooleanFilterCallback(
                selectedParams,
                requiredLists,
                val
            ),
        });
    };

    useEffect(() => {
        if (districtsList) {
            CONFIG.columnDefs[2].cellRendererParams.options = districtsList.map(
                district => district.name
            );
        }
    }, [districtsList]);

    return (
        <React.Fragment>
            <Grid
                container
                direction
                alignItems="center"
                className={`container-padding ${
                    showOverlay
                        ? "filter-container-overlay"
                        : "filter-container"
                }`}
            >
                <Grid item xs={12} sm={12}>
                    <Filters
                        options={CONFIG.columnDefs}
                        onSeeMore={() => {
                            setShowOverlay(!showOverlay);
                        }}
                        handleBooleanCallBack={val =>
                            handleBooleanCallBack(val)
                        }
                        handleNumberCallBack={(field, val) =>
                            setSelectedParams({
                                ...multiSelectNumberFilterCallback(
                                    selectedParams,
                                    field,
                                    val
                                ),
                            })
                        }
                        handleApplyFilter={() => { 
                            applyFilter();
                            setShowOverlay(false);
                        }}
                        handleReset={() => {
                            setSelectedParams({});
                            fetchFacilityList();
                        }}
                    />
                </Grid>
            </Grid>
            <div
                onClick={() => setShowOverlay(!showOverlay)}
                className={showOverlay ? "overlay overlay-show" : "overlay"}
            ></div>
            <div className="container-padding">
                <Grid
                    className="sort-pagination"
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={4}>
                        <Sort
                            onSelect={val => sortByValue(val)}
                            options={CONFIG.columnDefs}
                            onToggleSort={toggleVal => setSortType(toggleVal)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <PaginationController
                            resultsShown={Math.ceil(
                                (offset + facilityList.length) / itemsPerPage
                            )}
                            totalResults={Math.ceil(count / itemsPerPage)}
                            onFirst={() => {
                                setOffset(0);
                            }}
                            onPrevious={() => fetchPrevFacilities()}
                            onNext={() => fetchMoreFacilites()}
                            onLast={() => {
                                setOffset(
                                    Math.floor((count - 1) / itemsPerPage) *
                                        itemsPerPage
                                );
                            }}
                            onShowList={() => {
                                setShowColumnsPanel(!showColumnsPanel);
                            }}
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
                    onCloseColumnsPanel={() => {
                        setShowColumnsPanel(false);
                    }}
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
