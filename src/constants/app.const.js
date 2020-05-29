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

export const TRANSFER_STATUS_CHOICES = {
    1: 'Pending', 
    2: 'Accepted', 
    3: 'Rejected'
}

export const regex = {
  email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i // eslint-disable-line
}

export const genderChoices = [
    {
        title: 'Male',
        value: 'Male',
    },
    {
        title: 'Female',
        value: 'Female',
    },
    {
        title: 'Other gender',
        value: 'Other',
    },
];


export const GENDER_LIST_MAPPING = [
    {
        id: 1,
        name: 'Male',
    },
    {
        id: 2,
        name: 'Female',
    },
    {
        id: 3,
        name: 'Others',
    }
]

export const GENDER_CHOICES = {
    1: 'Male', 
    2: 'Female', 
    3: 'Non Binary'
}
