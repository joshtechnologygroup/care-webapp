import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { PropTypes } from 'prop-types';
import _ from 'underscore';

import TableComponent from 'Components/TableComponent';
import { getTransferList } from "Actions/TransferAction";
import PaginationController from 'Components/PaginationController';
import { CONFIG } from './config';
import Sort from 'Components/Sort';
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
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);
    const [sortOption, setSortOption] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    // Handle has more.
    useEffect(() => {
        if (!_.isEmpty(transferList)) {
            setHasPrev(offset - transferList.length >= 0 ? true : false);
            setHasMore(offset + transferList.length < count ? true : false);
        }
    }, [transferList, offset, count]);

    useEffect(() => {
        
    }, [sortOption, sortOrder])

    useEffect(() => {
        if (!_.isEmpty(transferList)) {
            transferList.map(transfer => {
                transfer.status = TRANSFER_STATUS_CHOICES[transfer.status];
                return transfer;
            });
        }
    }, [transferList]);

    const fetchMoreTransfers = () => {
        if (hasMore) {
            setOffset(offset + transferList.length);
        }
    };

    const fetchPrevTransfers = () => {
        if (hasPrev) {
            setOffset(offset - transferList.length);
        }
    };

    useEffect(() => {
        fetchTransferList({
            ...queryParams,
            offset: offset,
        });
    }, [queryParams, offset, fetchTransferList]);

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
            onSelect={(val) => setSortOption(val)}
            options={CONFIG.columnDefs}
            onToggleSort={(toggleVal => setSortOrder(toggleVal))} />
        </Grid>
        <Grid item xs={12} sm={4} >

          <PaginationController
            resultsShown={10}
            totalResults={56}
            onFirst={() => {
                setOffset(0);
            }}
            onPrevious={() => fetchMoreTransfers()}
            onNext={() => fetchPrevTransfers()}
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
        rowData={transferList}
        showColumnsPanel={showColumnsPanel}
        onCloseColumnsPanel={() => { setShowColumnsPanel(false) }}
      />
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
