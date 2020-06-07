import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import _ from "underscore";
import moment from "moment";

import TableComponent from "Components/TableComponent";
import { getTransferList } from "Actions/TransferAction";
import PaginationController from "Components/PaginationController";
import { CONFIG } from "./config";
import Sort from "Components/Sort";
import Filters from "Components/Filters";
import {
    multiSelectBooleanFilterCallback,
    numberFilterCallbackWithRange,
    fillBooleanFilterOptions
} from "Src/utils/listFilter";
import {
    getTransferDependencies
} from "Actions/FacilitiesAction";
import {
    TRANSFER_STATUS_CHOICES,
    GENDER_CHOICES,
    GENDER_LIST_MAPPING,
    transferStatus,
} from "Constants/app.const";
import { DATE_FORMAT } from 'Src/constants';
import { multiSelectDateCallBack } from "../../utils/listFilter";
import {PAGINATION_LIMIT} from 'Src/constants';

export function TransfersList(props) {
    const { 
        fetchTransferList, 
        fetchTransferDependencies, 
        transferList, 
        shortFacilityLists, 
        queryParams, 
        count 
    } = props;
    const itemsPerPage = PAGINATION_LIMIT;

    const [showColumnsPanel, setShowColumnsPanel] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);
    const [ordering, setOrdering] = useState(null);
    const [sortType, setSortType] = useState(null);
    const [orderingParam, setOrderingParam] = useState(null);
    const [selectedParams, setSelectedParams] = useState({});

    // Handle has more.
    useEffect(() => {
        if (!_.isEmpty(transferList)) {
            setHasPrev(offset > 0 ? true : false);
            setHasMore(offset + itemsPerPage < count ? true : false);
        }
    }, [transferList, offset, count]);

    useEffect(() => {
        if (_.isEmpty(shortFacilityLists)) {
            fetchTransferDependencies();
        }
    },[]);

    const updateTransferList = transferList => {
        if (!_.isEmpty(transferList)) {
            const updatedTransferList = [];
            transferList.forEach(transferObj => {
                const updatedObj = { ...transferObj };
                updatedObj.status = TRANSFER_STATUS_CHOICES[transferObj.status];
                if(updatedObj.status_updated_at) {
                    updatedObj.status_updated_at = moment(transferObj.status_updated_at).format(DATE_FORMAT);
                }
                updatedObj.requested_at = moment(transferObj.requested_at).format(DATE_FORMAT)
                updatedObj.gender = GENDER_CHOICES[transferObj.gender];
                updatedTransferList.push(updatedObj);
                return updatedObj;
            });
            return updatedTransferList;
        }
        return transferList;
    };

    const fetchMoreTransfers = () => {
        if (hasMore) {
            setOffset(offset + itemsPerPage);
        }
    };

    const fetchPrevTransfers = () => {
        if (hasPrev) {
            setOffset(offset - itemsPerPage);
        }
    };

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
        fetchTransferList(options);
    }, [queryParams, offset, fetchTransferList, orderingParam]);

    const applyFilter = () => {
        const options = {
            ...queryParams,
            ...selectedParams,
            offset: offset,
        };
        if (orderingParam) {
            options.ordering = orderingParam;
        }
        fetchTransferList(options);
    }

    useEffect(() => {
        if(!_.isEmpty(shortFacilityLists)) {
            const facilityList = Object.keys(shortFacilityLists).map(facilityItem => {
                return shortFacilityLists[facilityItem].name;
            })
            CONFIG.columnDefs = fillBooleanFilterOptions(CONFIG.columnDefs, {
                'gender': GENDER_LIST_MAPPING.map(gender => gender.name),
                'to_facility': facilityList,
                'from_facility': facilityList,
                'status': transferStatus.map(status => status.name)
            });            
        }
    }, [shortFacilityLists]);

    const sortByValue = val => {
        setOrdering(val);
    };

    const handleBooleanCallBack = val => {
        // make sure to match param dict key and required list key are same
        if (!_.isEmpty(shortFacilityLists)){
            const requiredLists = {
                gender: GENDER_LIST_MAPPING,
                from_facility: Object.keys(shortFacilityLists).map(facilityItem => shortFacilityLists[facilityItem]), 
                to_facility: Object.keys(shortFacilityLists).map(facilityItem => shortFacilityLists[facilityItem]), 
                status: transferStatus
            };
            setSelectedParams({
                ...multiSelectBooleanFilterCallback(
                    selectedParams,
                    requiredLists,
                    val
                ),
            });
        }
    };

    return (
        <React.Fragment>
            <Grid
                container
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
                        handleStringCallBack={(field, value) =>
                        { setSelectedParams({
                                ...selectedParams,
                                [field]: value
                            })
                        }}
                        handleApplyFilter={() => { 
                            applyFilter();
                            setShowOverlay(false);
                        }}
                        handleBooleanCallBack={val =>
                            handleBooleanCallBack(val)
                        }
                        handleNumberCallBack={(val) =>
                            setSelectedParams({
                                ...numberFilterCallbackWithRange(
                                    selectedParams,
                                    val
                                ),
                            })
                        }
                        handleDateCallBack={
                            (val) => {
                                setSelectedParams({...multiSelectDateCallBack(selectedParams, val)})
                            }
                        }
                        handleReset={() => {
                            setSelectedParams({});
                            fetchTransferList();
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
                                (offset + itemsPerPage) / itemsPerPage
                            )}
                            totalResults={Math.ceil(count / itemsPerPage)}
                            onFirst={() => {
                                setOffset(0);
                            }}
                            onPrevious={() => fetchPrevTransfers()}
                            onNext={() => fetchMoreTransfers()}
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
                    rowData={updateTransferList(transferList)}
                    showColumnsPanel={showColumnsPanel}
                    onCloseColumnsPanel={() => {
                        setShowColumnsPanel(false);
                    }}
                />
            </div>
        </React.Fragment>
    );
}

TransfersList.propTypes = {
    transferList: PropTypes.arrayOf(PropTypes.object),
    queryParams: PropTypes.object,
    count: PropTypes.number,
};

TransfersList.defaultProps = {
    transferList: [],
    fetchTransferList: () => {},
    queryParams: {},
    count: 0,
};

const mapStateToProps = state => {
    const { transfers, shortFacilities } = state;
    return {
        transferList: transfers.results,
        count: transfers.count,
        shortFacilityLists: {...shortFacilities.results},
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTransferList: params => {
            dispatch(getTransferList(params));
        },
        fetchTransferDependencies: params => {
            dispatch(getTransferDependencies(params));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransfersList);
