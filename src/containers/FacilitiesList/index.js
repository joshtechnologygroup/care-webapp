import React from "react";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import TableComponent from "Components/TableComponent";
import Grid from "@material-ui/core/Grid";
import { PropTypes } from "prop-types";
import _ from "underscore";

import { CONFIG } from "./config";
import {
    getFacilitiesList,
    getFacilityTypeList,
} from "Actions/FacilitiesAction";
import { getDistrictList, getOwnershipTypeList } from "Actions/MiscAction";
import PaginationController from "Components/PaginationController";

export function FacilitiesList(props) {
    const {
        fetchFacilityList,
        fetchFacilityTypeList,
        fetchDistrictList,
        fetchFacilityOwnershipTypeList,
        facilityList,
        queryParams,
        districtsList,
        ownershipTypesList,
        facilityTypesList,
        count,
    } = props;
    const itemsPerPage = 3;

    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);

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
        if (!facilityTypesList) {
            fetchFacilityTypeList();
        }
        if (!districtsList) {
            fetchDistrictList();
        }
        if (!ownershipTypesList) {
            fetchFacilityOwnershipTypeList();
        }
    });

    useEffect(() => {
        console.log(offset);
        fetchFacilityList({
            ...queryParams,
            offset: offset,
        });
    }, [queryParams, offset, fetchFacilityList]);

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
                    onFirst={() => {
                        setOffset(0);
                    }}
                    onPrevious={() => fetchPrevFacilities()}
                    onNext={() => fetchMoreFacilites()}
                    onLast={() => {
                        console.log(Math.floor((count - 1) / itemsPerPage) * itemsPerPage);
                        setOffset(Math.floor((count - 1) / itemsPerPage) * itemsPerPage);
                    }}
                    onShowList={() => {
                        console.log("on Show List");
                    }}
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
                rowData={updateFacilityListWithNames(
                    facilityList,
                    districtsList,
                    facilityTypesList,
                    ownershipTypesList
                )}
            />
        </React.Fragment>
    );
}

FacilitiesList.propTypes = {
    facilityList: PropTypes.arrayOf(PropTypes.object),
    fetchFacilityList: PropTypes.func,
    fetchFacilityTypeList: PropTypes.func,
    fetchDistrictList: PropTypes.func,
    fetchFacilityOwnershipTypeList: PropTypes.func,
    queryParams: PropTypes.object,
    count: PropTypes.number,
};

FacilitiesList.defaultProps = {
    facilityList: [],
    fetchFacilityList: () => {},
    fetchFacilityTypeList: () => {},
    fetchDistrictList: () => {},
    fetchFacilityOwnershipTypeList: () => {},
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
