import React, {useState} from 'react';
import TableComponent from "Components/TableComponent";
import {CONFIG} from "./config";


export default function InchargeList(props) {
    const [showColumnsPanel, setShowColumnsPanel] = useState(false);

    return (
        <React.Fragment>
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
              rowData={props.profile}
              showColumnsPanel={showColumnsPanel}
              onCloseColumnsPanel={() => {
                  setShowColumnsPanel(false);
              }}
            />
        </React.Fragment>
    );
}
