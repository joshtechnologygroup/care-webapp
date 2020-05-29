import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { PropTypes } from 'prop-types';
import _ from 'underscore';
import moment from "moment";

import TableComponent from 'Components/TableComponent';
import { getTransferList } from "Actions/TransferAction";
import PaginationController from 'Components/PaginationController';
import { CONFIG } from './config';
import Sort from 'Components/Sort';
import Filters from 'Components/Filters';
import { TRANSFER_STATUS_CHOICES } from 'Constants/app.const';

export function TransfersList(props) {
    const {
        fetchTransferList,
        transferList,
        queryParams,
        count,
    } = props;
    const itemsPerPage = 4;

    const [showColumnsPanel, setShowColumnsPanel] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);
    const [ordering, setOrdering] = useState(null);
    const [sortType, setSortType] = useState(null);
    const [orderingParam, setOrderingParam] = useState(null);

    // Handle has more.
    useEffect(() => {
        if (!_.isEmpty(transferList)) {
            setHasPrev(offset > 0 ? true : false);
            setHasMore(offset + itemsPerPage < count ? true : false);
        }
    }, [transferList, offset, count]);

    const updateTransferList = (
        transferList
    ) => {
        
        if (
            !_.isEmpty(transferList)
        ) {
            const updatedTransferList = [];
            transferList.forEach(transferObj => {
                const updatedObj = { ...transferObj };
                updatedObj.status = TRANSFER_STATUS_CHOICES[transferObj.status];
                updatedObj.status_updated_at = moment.utc(transferObj.status_updated_at, 'MM/DD/YYYY hh:mm A').local().format('MM/DD/YYYY hh:mm A')
                updatedObj.requested_at = moment.utc(transferObj.requested_at, 'MM/DD/YYYY hh:mm A').local().format('MM/DD/YYYY hh:mm A')
                updatedTransferList.push(updatedObj);
                return updatedObj;
            });
            return updatedTransferList;;
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
            offset: offset
        };
        if (orderingParam) {
            options.ordering = orderingParam
        }
        fetchTransferList(options);
    }, [queryParams, offset, fetchTransferList, orderingParam]);

    const sortByValue = val => {
        setOrdering(val);
    };

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
            onSelect={val => sortByValue(val)}
            options={CONFIG.columnDefs}
            onToggleSort={toggleVal => setSortType(toggleVal)} />
        </Grid>
        <Grid item xs={12} sm={5} >
          <PaginationController
            resultsShown={Math.ceil((offset + transferList.length) / itemsPerPage)}
            totalResults={Math.ceil((count) / itemsPerPage)}
            onFirst={() => {
                setOffset(0);
            }}
            onPrevious={() => fetchPrevTransfers()}
            onNext={() => fetchMoreTransfers()}
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
        rowData={updateTransferList(transferList)}
        showColumnsPanel={showColumnsPanel}
        onCloseColumnsPanel={() => { setShowColumnsPanel(false) }}
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
    const { transfers } = state;
    return {
        transferList: transfers.results,
        count: transfers.count,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTransferList: params => {
            dispatch(getTransferList(params));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransfersList);
