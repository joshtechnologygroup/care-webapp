export const ReportType = [
  {
    title: 'Patient',
    value: 'patient',
  },
  {
    title: 'Facility',
    value: 'facility',
  },
];

export const FacilityStatus = [
  {
    title: 'Pending',
    value: 'pending',
  },
  {
    title: 'Accepted',
    value: 'accepted',
  },
  {
    title: 'Rejected',
    value: 'rejected',
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
  sortable: false,
  resizable: true,
  filter: false,
  flex: 1,
  suppressContextMenu: true,
  minWidth: 90,
  pagination: false,
}

export const regex = {
  email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i // eslint-disable-line
}

export const genderChoices = [
    {
        id: 1,
        name: 'Male',
        title: 'Male',
        value: 'Male',
    },
    {
        id: 2,
        name: 'Female',
        title: 'Female',
        value: 'Female',
    },
    {
        id: 3,
        name: 'Other gender',
        title: 'Other gender',
        value: 'Other',
    },
];
