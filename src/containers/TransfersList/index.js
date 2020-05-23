import React from 'react';

import TableComponent from 'Components/TableComponent';
import { patients } from 'Mockdata/patients_list.json';
import { CONFIG } from './config';

export function TransfersList(props) {

	return (
		<div>
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
				rowData={patients}
			/>
		</div>
	);
}

export default TransfersList;
