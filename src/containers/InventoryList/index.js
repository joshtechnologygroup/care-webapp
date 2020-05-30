import React, { useState, useEffect } from "react";
import TableComponent from "Components/TableComponent";
import Grid from "@material-ui/core/Grid";
import Sort from "Components/Sort";
import { CONFIG } from "./config";
import moment from "moment";
import PaginationController from "Components/PaginationController";
import { connect } from "react-redux";
import {
    getInventoryList,
    getInventoryDependencies,
} from "Actions/FacilitiesAction";
import { DATE_FORMAT } from 'Src/constants';
import _ from "underscore";
import Filters from "Components/Filters";
import { multiSelectNumberFilterCallback } from "Src/utils/listFilter";
import { createInventory } from "../../reducers/FacilityReducer";
export function InventoryList(props) {
  const [showColumnsPanel, setShowColumnsPanel] = useState(false);
  const [offset, setOffset] = useState(0);
  const [ordering, setOrdering] = useState("None")
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedParams, setSelectedParams] = useState({});

    const {
        fetchInventoryList,
        fetchInventoryDependencies,
        inventoryList,
        queryParams,
        inventoryTypesList,
        facilityList,
        count,
        value
    } = props;
    const itemsPerPage = 4;

    const updateInventoryListWithNames = (
        facilityList,
        inventoryTypesList,
        inventoryList
    ) => {
        if (!_.isEmpty(inventoryTypesList) && !_.isEmpty(facilityList)) {
            const mappedInventoryList = [];

            inventoryList.forEach(inventory => {
                const mappedInventory = { ...inventory };
                const date = new Date(inventory.updated_at);
                mappedInventory.updated_at = moment.utc(date, DATE_FORMAT)
                .local()
                .format(DATE_FORMAT);
                const inventoryType = inventoryTypesList.find(
                    inventoryType => inventoryType.id === inventory.item
                );
                if (inventoryType) {
                    mappedInventory.item = inventoryType.name;
                }
                const facilityListType = facilityList.find(
                    facilityListType =>
                        facilityListType.id === inventory.facility
                );
                if (facilityListType) {
                    mappedInventory.facility = facilityListType.name;
                }
                mappedInventoryList.push(mappedInventory);
            });
            return mappedInventoryList;
        }
        return inventoryList;
    };

    useEffect(() => {
        if (!inventoryTypesList || !facilityList) {
            fetchInventoryDependencies();
        }
    });

    useEffect(() => {
        fetchInventoryList({
            ...queryParams,
            ...selectedParams,
            offset: offset,
            facility: value
        });
    }, [queryParams, offset, fetchInventoryList, selectedParams, value]);

    useEffect(() => {
     if(createInventory){
       sortByValue("updated_at");
     }
  }, [createInventory]);
  
  const fetchMoreInventory = () => {
      const lastOffset = Math.floor((count - 1) / itemsPerPage) * itemsPerPage;
      if (offset + inventoryList.length <= lastOffset) {
          setOffset(offset + inventoryList.length);
      }
  };

  const fetchPrevInventory = () => {
      if (offset - itemsPerPage >= 0) {
          setOffset(offset - itemsPerPage);
      }
  };

    const sortByValue = val => {
        if (val === "facility" || val === "item") {
            val += "__name";
            setOrdering(val);
        } else {
            setOrdering(val);
        }
        fetchInventoryList({
            ...queryParams,
            offset: offset,
            ordering: val,
        });
    };

    const TogglesortByValue = toggleVal => {
      let order = ordering;
      if (toggleVal === "desc") {
          order = `-${ordering}`;
      }
      fetchInventoryList({
          ...queryParams,
          offset: offset,
          ordering: order,
      });
  };

useEffect(() => {
  if (inventoryTypesList) {
    CONFIG.columnDefs[1].cellRendererParams.options = inventoryTypesList.map(
        inventoryType => inventoryType.name
    );
}
if (facilityList) {
  CONFIG.columnDefs[0].cellRendererParams.options = facilityList.map(
      facility => facility.name
  );
}
}, [inventoryTypesList, facilityList]);


  return (
    <React.Fragment>
      <Grid container
              direction
              alignItems="center"
              className={`container-padding ${showOverlay ? "filter-container-overlay" : 'filter-container'}`}>
              <Grid item xs={12} sm={12} >
                <Filters
                  options={CONFIG.columnDefs}
                  onSeeMore={() => { setShowOverlay(!showOverlay) }}
                  handleBooleanCallBack={val =>
                            setSelectedParams(val)
                  }
                  handleNumberCallBack={(field, val) =>
                    setSelectedParams({
                        ...multiSelectNumberFilterCallback(
                            selectedParams,
                            field,
                            val
                        ),
                    })}
                  handleDateCallBack={(field, val) =>
                    setSelectedParams({
                        ...multiSelectNumberFilterCallback(
                            selectedParams,
                            field,
                            val
                        ),
                    })}
                  />
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
            onSelect={(val) => sortByValue(val)}
            options={CONFIG.columnDefs}
            onToggleSort={(toggleVal => TogglesortByValue(toggleVal))} />
        </Grid>
        <Grid item xs={12} sm={5}>

          <PaginationController
            resultsShown={`${
              Math.ceil((offset + InventoryList.length) / itemsPerPage)
              }`}
            totalResults={Math.ceil((count) / itemsPerPage)}
            onFirst={() => {
              setOffset(0);
          }}
            onPrevious={() => fetchPrevInventory()}
            onNext={() => fetchMoreInventory()}
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
        rowData={updateInventoryListWithNames(
          facilityList,
          inventoryTypesList,
          inventoryList
        )}
        showColumnsPanel={showColumnsPanel}
        onCloseColumnsPanel={() => { setShowColumnsPanel(false) }}
      />
      </div>
    </React.Fragment>
  );
}

InventoryList.defaultProps = {
    inventoryList: [],
    fetchInventoryList: () => {},
    fetchInventoryDependencies: () => {},
    queryParams: {},
    count: 0,
    value: "",
};

const mapStateToProps = state => {
    const { inventory, inventoryTypes, facilities, createInventory } = state;
    return {
        inventoryList: inventory.results,
        count: inventory.count,
        inventoryTypesList: inventoryTypes.results,
        facilityList: facilities.results,
        createInventory: createInventory.data
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
