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
            rowSelection={this.props.rowSelection}
            rowGroupPanelShow={this.props.rowGroupPanelShow}
            pivotPanelShow={this.props.pivotPanelShow}
            enableRangeSelection={true}
            pagination={true}
            onGridReady={this.props.onGridReady}
            rowData={this.props.rowData}
          />
        </div>
      </div>
    );
  }
}

export default TableComponent;
