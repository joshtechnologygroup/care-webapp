import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import GridColumns from './GridColumns';
import './TableComponent.scss';

class TableComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      api: null,
    };

    this.onGridReady = this.onGridReady.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onGridReady(e) {
    console.log(e);
    this.setState({api: e})
    // this.props.onGridReady(e);
  }

  onChange(e, data) {
    console.log(e.target.value, data, this.state.api);
    if(this.state.api && this.state.api.columnApi) {
      this.state.api.columnApi.setColumnVisible(e.target.value, data)
    }
    // this.props.onGridReady(e);
  }

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
            pagination={this.props.pagination}
            onGridReady={this.onGridReady}
            rowData={this.props.rowData}
            frameworkComponents={this.props.frameworkComponents}
          />
          <GridColumns columnDefs={this.props.columnDefs} open={this.props.showColumnsPanel} onChange={this.onChange} onClose={this.props.onCloseColumnsPanel} />
        </div>
      </div>
    );
  }
}

export default TableComponent;
