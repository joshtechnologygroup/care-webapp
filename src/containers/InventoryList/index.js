import React, {useState, useEffect} from 'react';
import TableComponent from 'Components/TableComponent';
import Grid from '@material-ui/core/Grid';
import Sort from 'Components/Sort';
import { CONFIG } from './config';
import moment from 'moment';
import PaginationController from 'Components/PaginationController';
import { connect } from 'react-redux';
import { getInventoryList, getInventoryDependencies } from 'Actions/FacilitiesAction';
import _ from "underscore";
export function InventoryList(props) {
  const [showColumnsPanel, setShowColumnsPanel] = useState(false);
  const [ offset, setOffset ] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const {
    fetchInventoryList,
    fetchInventoryDependencies,
    inventoryList,
    queryParams,
    inventoryTypesList,
    facilityList,
    count,
  } = props;
  const itemsPerPage = 2

  const updateInventoryListWithNames = (
    facilityList,
    inventoryTypesList,
    inventoryList,
  ) => {
    if (
        !_.isEmpty(inventoryTypesList) &&
        !_.isEmpty(facilityList)
    ) { 
      inventoryList.map(inventory => {
            const date = new Date(inventory.updated_at)
            inventory.updated_at = moment(date)
            const inventoryType = inventoryTypesList.find(      
              inventoryType => inventoryType.id === inventory.item
            );
            if (inventoryType) {
              inventory.item = inventoryType.name;
            }
            const facilityListType = facilityList.find(
                facilityListType => facilityListType.id === inventory.facility
            );
            if (facilityListType) {
              inventory.facility = facilityListType.name;
            }
            return inventory;
        });
    }
    console.log(inventoryList)
    return inventoryList;
};
useEffect(() => {
  if (!_.isEmpty(inventoryList)) {
      setHasPrev(offset - inventoryList.length >= 0 ? true : false);
      setHasMore(offset + inventoryList.length < count ? true : false);
  }
}, [inventoryList, offset, count]);

const fetchMoreInventory = () => {
  if (hasMore) {
      setOffset(offset + inventoryList.length);
  }
};

const fetchPrevInventory = () => {
  if (hasPrev) {
      setOffset(offset - inventoryList.length);
  }
};

  useEffect(() => {
      if (!inventoryTypesList || !facilityList) {
        fetchInventoryDependencies();
      }
  });

  useEffect(() => {
      fetchInventoryList({
        ...queryParams,
        offset: offset,
      });
    }, [queryParams, offset, fetchInventoryList]);
  
  // const fetchMoreInventory = () => {
  //     const lastPage = Math.floor((props.count - 1) / itemsPerPage) * itemsPerPage;
  //     if (offset + props.inventoryList.length <= lastPage) {
  //         setOffset(offset + props.inventoryList.length);
  //     }
  // };

  // const fetchPrevInventory = () => {
  //     if (offset - props.inventoryList.length >= 0) {
  //         setOffset(offset - InventoryList.length);
  //     }
  // };

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
        <Grid item xs={12} sm={4}>

          <PaginationController
            resultsShown={1}
            totalResults={count}
            onFirst={() => {
              setOffset(0);
          }}
            onPrevious={() => fetchPrevInventory()}
            onNext={() => fetchMoreInventory()}
            onLast={() => {
                setOffset(Math.floor((props.count - 1) / itemsPerPage) * itemsPerPage);
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
        rowData={updateInventoryListWithNames(
          facilityList,
          inventoryTypesList,
          inventoryList
        )}
        showColumnsPanel={showColumnsPanel}
        onCloseColumnsPanel={() => { setShowColumnsPanel(false) }}
      />
    </React.Fragment>
  );
}


InventoryList.defaultProps = {
  inventoryList: [],
  fetchInventoryList: () => {},
  fetchInventoryDependencies: () => {},
  queryParams: {},
  count: 0,
};

const mapStateToProps = state => {
  const { inventory, inventoryTypes, facilities } = state;
  return {
      inventoryList: inventory.results,
      count: inventory.count,
      inventoryTypesList: inventoryTypes.results,
      facilityList: facilities.results,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      fetchInventoryList: params => {
          dispatch(getInventoryList(params));
      },
      fetchInventoryDependencies: params => {
          dispatch(getInventoryDependencies(params));
      },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryList);
