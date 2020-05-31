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
        shortFacilityLists,
        count,
        value
    } = props;
    const itemsPerPage = 5;

    const updateInventoryListWithNames = (
      shortFacilityLists,
        inventoryTypesList,
        inventoryList
    ) => {
        if (!_.isEmpty(inventoryTypesList) && !_.isEmpty(shortFacilityLists)) {
            const mappedInventoryList = [];

            inventoryList.forEach(inventory => {
                const mappedInventory = { ...inventory };
                const date = new Date(inventory.updated_at);
                mappedInventory.updated_at = moment.utc(date, DATE_FORMAT)
                .local()
                .format(DATE_FORMAT);
                Object.keys(inventoryTypesList).forEach(inventoryitem =>{
                  if(inventoryTypesList[inventoryitem].id === inventory.item){
                    mappedInventory.item = inventoryTypesList[inventoryitem].name;
                    return;
                  }
                })
                Object.keys(shortFacilityLists).forEach(facilityItem =>{
                  if(shortFacilityLists[facilityItem].id === inventory.facility){
                    mappedInventory.facility = shortFacilityLists[facilityItem].name;
                    return;
                  }
                })
                mappedInventoryList.push(mappedInventory);
            });
            return mappedInventoryList;
        }
        return inventoryList;
    };

    useEffect(() => {
        if (_.isEmpty(inventoryTypesList) || _.isEmpty(shortFacilityLists)) {
            fetchInventoryDependencies();
        }
    },[]);

    useEffect(() => {
        fetchInventoryList({
            ...queryParams,
            ...selectedParams,
            offset: offset,
            facility: value
        });
    }, [queryParams, offset, fetchInventoryList, selectedParams, value]);

  //   useEffect(() => {
  //    if(createInventory){
  //      sortByValue("updated_at");
  //    }
  // }, [createInventory]);
  
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
  if (!_.isEmpty(inventoryTypesList)) {
    CONFIG.columnDefs[1].cellRendererParams.options =  Object.keys(inventoryTypesList).map(function(item) {
      return inventoryTypesList[item].name
    })
    console.log(CONFIG.columnDefs[1].cellRendererParams.options)
}
  if (!_.isEmpty(shortFacilityLists)) {
    CONFIG.columnDefs[0].cellRendererParams.options =  Object.keys(shortFacilityLists).map(function(item) {
      return shortFacilityLists[item].name
    })
  }
}, [inventoryTypesList, shortFacilityLists]);


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
          shortFacilityLists,
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
    const { inventory, inventoryTypes, shortFacilities } = state;
    return {
        inventoryList: inventory.results,
        count: inventory.count,
        inventoryTypesList: inventoryTypes,
        shortFacilityLists: shortFacilities
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
