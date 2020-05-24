import React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import TableComponent from "Components/TableComponent";

import { CONFIG } from "./config";
import { getFacilitiesList, getFacilityTypeList } from "Actions/FacilitiesAction";
import { getDistrictList, getOwnershipTypeList } from "Actions/CommonAction";

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
        <div>
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
                rowData={list}
            />
        </div>
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
