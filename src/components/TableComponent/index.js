import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// import 'ag-grid-community/dist/styles/ag-theme-material.css';
import './TableComponent.scss';

class TableComponent extends Component {
  render() {
    return (
      <div className="grid-wrapper">
        <div
          id="myGrid"
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-balham"
        >
          <AgGridReact
            modules={this.props.modules}
            columnDefs={this.props.columnDefs}
            autoGroupColumnDef={this.props.autoGroupColumnDef}
            defaultColDef={this.props.defaultColDef}
            suppressRowClickSelection={true}
            groupSelectsChildren={true}
            debug={true}
            cellStyle={this.props.cellStyle}
            headerHeight={this.props.headerHeight}
            rowHeight={this.props.rowHeight}
            rowSelection={this.props.rowSelection}
            rowGroupPanelShow={this.props.rowGroupPanelShow}
            pivotPanelShow={this.props.pivotPanelShow}
            enableRangeSelection={true}
            pagination={false}
            onGridReady={this.props.onGridReady}
            rowData={this.props.rowData}
            frameworkComponents={this.props.frameworkComponents}
          />
        </div>
      </div>
    );
  }
}

export default TableComponent;
