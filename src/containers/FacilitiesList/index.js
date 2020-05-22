import React from 'react';
import TableComponent from 'Components/TableComponent';

import { CONFIG } from './config';

export function FacilitiesList(props) {

    const patients = [{

        opStatus: 'yes',
        facilityName: 'PDEA Ayurveda Rugnalaya',
        area: 'Bhosari',
        jurisdiction: 'PMC',
        bedsCapacity: 1000,
        icuCapacity: 200,
        ventCapacity: 10,
        doctors: 8,
        checklistStore: 10,
        owner: 'Govt',
        cred: 'yes',
    },
    {

        opStatus: 'no',
        facilityName: 'PDEA Ayurveda Rugnalaya',
        area: 'Bhosari ABC',
        jurisdiction: 'PCMC',
        bedsCapacity: 1000,
        icuCapacity: 200,
        ventCapacity: 10,
        doctors: 8,
        checklistStore: 10,
        owner: 'Pvt',
        cred: 'yes',
    },
    {

        opStatus: 'yes',
        facilityName: 'PDEA Ayurveda Rugnalaya',
        area: 'Bhosari',
        jurisdiction: 'PMC',
        bedsCapacity: 1000,
        icuCapacity: 200,
        ventCapacity: 10,
        doctors: 8,
        checklistStore: 10,
        owner: 'PvtCross',
        cred: 'yes',
    },
    {

        opStatus: 'yes',
        facilityName: 'PDEA Ayurveda Rugnalaya',
        area: 'Bhosari',
        jurisdiction: 'PMC',
        bedsCapacity: 1000,
        icuCapacity: 200,
        ventCapacity: 10,
        doctors: 8,
        checklistStore: 10,
        owner: 'PvtRefresh',
        cred: 'yes',
    }];

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

export default FacilitiesList;
