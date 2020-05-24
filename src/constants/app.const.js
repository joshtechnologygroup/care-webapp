export const ReportType = [
    {
        title: 'Patient',
        value: 'patient',
    },
    {
        title: 'Fecility',
        value: 'fecility',
    },
];

export const Juridiction = [
    {
        title: 'PMC',
        value: 'PMC',
    },
    {
        title: 'PCMC',
        value: 'PCMC',
    },
    {
        title: 'DHO',
        value: 'DHO',
    },
    {
        title: 'CS',
        value: 'CS',
    }
];

export const GRID_CONFIG = {
    rowHeight: 40,
    headerHeight: 40,
    editable: false,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    suppressContextMenu: true,
    minWidth: 90,
    pagination: false,
}

export const regex = {
    email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i // eslint-disable-line
}
