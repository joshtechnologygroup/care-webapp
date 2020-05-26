import React, {useState, useEffect} from 'react';
import TableComponent from 'Components/TableComponent';
import Grid from '@material-ui/core/Grid';
import Sort from 'Components/Sort';
import { CONFIG } from './config';
import PaginationController from 'Components/PaginationController';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInventoryList } from 'Actions/FacilitiesAction';

export function InventoryList(props) {
  const [showColumnsPanel, setShowColumnsPanel] = useState(false);
  const [ offset, setOffset ] = useState(0);
  const itemsPerPage = 4

  const handleOffset = async (offset) => {
      const response = await props.getInventoryList(offset);
      if(response)
      setOffset(offset);
  }
  
  const fetchMoreInventory = () => {
      const lastPage = Math.floor((props.count - 1) / itemsPerPage) * itemsPerPage;
      if (offset + props.inventoryList.length <= lastPage) {
          setOffset(offset + props.inventoryList.length);
      }
  };

  const fetchPrevInventory = () => {
      if (offset - props.inventoryList.length >= 0) {
          setOffset(offset - InventoryList.length);
      }
  };

  useEffect(() => {
    handleOffset(offset)
  }, [offset]);

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
            totalResults={props.count}
            onFirst={() => {
              setOffset(0);
          }}
            onFirst={() => { handleOffset(0) }}
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
        rowData={props.inventoryList}
        showColumnsPanel={showColumnsPanel}
        onCloseColumnsPanel={() => { setShowColumnsPanel(false) }}
      />
    </React.Fragment>
  );
}


const mapStateToProps = (state) => ({
  inventoryList:state.inventory.inventory,
  count:state.inventory.count
});

InventoryList.propTypes = {
  inventoryList: PropTypes.array.isRequired,
  getInventoryList: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getInventoryList })(InventoryList);
