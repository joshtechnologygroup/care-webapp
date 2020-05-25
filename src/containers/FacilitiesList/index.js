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
        list,
        queryParams,
        districtsList,
        ownershipTypesList,
        facilityTypesList,
        count
    } = props;
    const itemsPerPage = 1;

    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);

    const updateFacilityListWithNames = (
        list,
        districtsList,
        facilityTypesList,
        ownershipTypesList
    ) => {
        if (
            !_.isEmpty(list) &&
            !_.isEmpty(districtsList) &&
            !_.isEmpty(facilityTypesList) &&
            !_.isEmpty(ownershipTypesList)
        ) {
            list.map(facility => {
                const districts = districtsList.filter(
                    district => district.id === facility.district
                );
                if (districts.length > 0) facility.district = districts[0].name;
                const ownershipTypes = ownershipTypesList.filter(
                    ownershipType => ownershipType.id === facility.owned_by
                );
                if (ownershipTypes.length > 0)
                    facility.owned_by = ownershipTypes[0].name;
                const facilityTypes = facilityTypesList.filter(
                    facilityType => facilityType.id === facility.facility_type
                );
                if (facilityTypes.length > 0)
                    facility.facility_type = facilityTypes[0].name;
                return facility;
            });
        }
        return list;
    };

    // Handle has more.
    useEffect(() => {
        if (!_.isEmpty(list)) {
            setHasPrev(offset - list.length >= 0 ? true : false);
            setHasMore(offset + list.length < count ? true : false);
        }
    }, [list, offset, count]);

    const fetchMoreFacilites = () => {
        if (hasMore) {
            setOffset(offset + list.length);
        }
    };

    const fetchPrevFacilities = () => {
        if (hasPrev) {
            setOffset(offset - list.length);
        }
    };

    useEffect(() => {
        if (!facilityTypesList) fetchFacilityTypeList();
        if (!districtsList) fetchDistrictList();
        if (!ownershipTypesList) fetchFacilityOwnershipTypeList();
    });

    useEffect(() => {
        fetchFacilityList({
            ...queryParams,
            offset: offset
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
                        setOffset(offset => 0);
                    }}
                    onPrevious={() => fetchPrevFacilities()}
                    onNext={() => fetchMoreFacilites()}
                    onLast={() => {
                        setOffset(offset => count - itemsPerPage);
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
                    list,
                    districtsList,
                    facilityTypesList,
                    ownershipTypesList
                )}
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
    count: PropTypes.number
};

FacilitiesList.defaultProps = {
    list: [],
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
        list: facilities.results,
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
