import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// import { rowRendererMethodOverride, tabIntoGridByClass } from 'AppUtils';
import useStyles from './styles';

const TableComponent = (props) => {
  const {
    columnDefs,
    defaultColDef,
    suppressContextMenu,
    tableData,
    rowHeight,
    headerHeight,
    frameworkComponents,
    className,
    fullWidthCellRenderer,
    isFullWidthCell,
    rowSelection,
    rowClassRules,
    loadingOverlayComponent,
    noRowsOverlayComponent,
    onSelectionChanged,
    gridApi,
    setGridApi,
    selectedRow,
    onCellKeyPress,
    autoFocusFirstRow,
    onCellEditingStarted,
    isSeatMapOpen,
    shouldOverrideRowRenderer,
    preGridTabClass,
    focusOnGroupedRow,
    tabToNextCell,
    onCellEditingStopped,
  } = props;
  const classes = useStyles(); // TODO: Need to investigate if we can pass theme into grid
  const [gridColumnApi, setGridColumnApi] = useState(null);
  useEffect(() => {
    if (tableData.length && gridApi) {
      setTimeout(() => {
        gridApi.setRowData(tableData);
      }, 0);
      setTimeout(() => {
        gridApi.sizeColumnsToFit();
        if (selectedRow) {
          gridApi.getRowNode(selectedRow.id).setSelected(true);
          const firstCol = gridColumnApi.getAllDisplayedColumns()[0];
          gridApi.setFocusedCell(selectedRow.rowIndex, firstCol);
        }
      }, 0); // Calling it in set timeout will wait to render first
    }
    if (!tableData.length && gridApi) {
      gridApi.showNoRowsOverlay();
    }
    if (gridApi && gridColumnApi && autoFocusFirstRow && !selectedRow) {
      setTimeout(() => {
        if (tableData.length === 1) {
          gridApi.getRowNode(0).setSelected(true);
        }

        // scrolls to the first column
        const firstCol = gridColumnApi.getAllDisplayedColumns()[0];
        gridApi.ensureColumnVisible(firstCol);

        // sets focus into the first grid cell
        gridApi.setFocusedCell(0, firstCol);
      }, 0);
    }
  }, [autoFocusFirstRow, gridApi, gridColumnApi, selectedRow, tableData]);

  useEffect(() => {
    if (selectedRow && gridApi) {
      setTimeout(() => {
        gridApi.getRowNode(selectedRow.id).setSelected(true);
        const focusedCell = gridApi.getFocusedCell();
        if (!gridApi.getEditingCells().length && focusedCell.rowIndex !== selectedRow.rowIndex) {
          gridApi.setFocusedCell(selectedRow.rowIndex, gridColumnApi.getAllDisplayedColumns()[0]);
        }
      }, 0);
    }
  }, [gridApi, gridColumnApi, selectedRow]);

  const autosizeHeaders = (params) => {
    if (params.finished !== false) {
      params.api.setHeaderHeight(headerHeight);
      const headerCells = document.querySelectorAll('#myGrid .ag-header-cell-label');
      let minHeight = headerHeight;
      headerCells.forEach((cell) => {
        minHeight = Math.max(minHeight, cell.scrollHeight);
      });
      params.api.setHeaderHeight(minHeight);
    }
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
    // if (shouldOverrideRowRenderer) {
    //   rowRendererMethodOverride(params);
    // }
    if (tableData.length && params.api) {
      // params.api.hideOverlay();
    } else {
      params.api.showLoadingOverlay();
    }
    // Here we are binding resize event and updating row, column and header sizing
    window.addEventListener('resize', () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
        params.api.resetRowHeights();
        autosizeHeaders(params);
      }, 0);
    });
    // if (preGridTabClass) {
    //   tabIntoGridByClass(params, preGridTabClass, focusOnGroupedRow);
    // }
  };

  const sortChanged = (params) => {
    setTimeout(() => {
      params.api.setRowData(tableData);
    }, 100);
  };

  return (
    <div className={className}>
      <div
        id="myGrid"
        className={`ag-theme-balham ${isSeatMapOpen && 'seat-map-opened'}`}
      >
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows
          enableRangeSelection
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          suppressContextMenu={suppressContextMenu}
          frameworkComponents={frameworkComponents}
          fullWidthCellRenderer={fullWidthCellRenderer}
          isFullWidthCell={isFullWidthCell}
          onGridReady={onGridReady}
          onSortChanged={sortChanged}
          rowSelection={rowSelection}
          onSelectionChanged={onSelectionChanged}
          onColumnResized={autosizeHeaders}
          rowClassRules={rowClassRules}
          loadingOverlayComponent={loadingOverlayComponent}
          noRowsOverlayComponent={noRowsOverlayComponent}
          onCellKeyPress={onCellKeyPress}
          onCellEditingStarted={onCellEditingStarted}
          tabToNextCell={tabToNextCell}
          onCellEditingStopped={onCellEditingStopped}
        />
      </div>
    </div>
  );
};

TableComponent.propTypes = {
  columnDefs: PropTypes.array.isRequired,
  defaultColDef: PropTypes.object.isRequired,
  suppressContextMenu: PropTypes.bool.isRequired,
  tableData: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired,
  frameworkComponents: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  fullWidthCellRenderer: PropTypes.string,
  isFullWidthCell: PropTypes.func,
  headerHeight: PropTypes.number,
  rowSelection: PropTypes.string,
  rowClassRules: PropTypes.object,
  loadingOverlayComponent: PropTypes.node,
  noRowsOverlayComponent: PropTypes.node,
  onSelectionChanged: PropTypes.func,
  gridApi: PropTypes.object,
  setGridApi: PropTypes.func,
  onCellKeyPress: PropTypes.func,
  selectedRow: PropTypes.object,
  autoFocusFirstRow: PropTypes.bool,
  onCellEditingStarted: PropTypes.func,
  isSeatMapOpen: PropTypes.bool,
  shouldOverrideRowRenderer: PropTypes.bool,
  focusOnGroupedRow: PropTypes.bool,
  preGridTabClass: PropTypes.string,
  tabToNextCell: PropTypes.func.isRequired,
  onCellEditingStopped: PropTypes.func,
};

TableComponent.defaultProps = {
  fullWidthCellRenderer: '',
  isFullWidthCell: () => {},
  headerHeight: 32,
  rowSelection: '',
  rowClassRules: {},
  loadingOverlayComponent: null,
  noRowsOverlayComponent: null,
  onSelectionChanged: () => {},
  gridApi: null,
  setGridApi: () => {},
  onCellKeyPress: () => {},
  selectedRow: null,
  autoFocusFirstRow: false,
  onCellEditingStarted: () => {},
  isSeatMapOpen: false,
  shouldOverrideRowRenderer: false,
  focusOnGroupedRow: false,
  preGridTabClass: '',
  onCellEditingStopped: () => {},
};

export default TableComponent;
