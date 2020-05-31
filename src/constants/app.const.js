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

// range filter constants
export const EQUAL_TO = "Equals To";
export const LESS_THAN = "Less Than";
export const GREATER_THAN = "Greater Than";
export const RANGE = "Range"

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
        name: 'Others',
        title: 'Others',
        value: 'Others',
    },
];


export const booleanStatuses = {
  positiveNegative: [
    {
      value: 1,
      name: 'Positive'
    },
    {
      value: 2,
      name: 'Negative'
    }
  ]
}

export const reachableStatus = [
  {
    value: true,
    name: 'Contacted',
    theme: 'success'
  },
  {
    value: false,
    name: 'Not Reachable',
    theme: 'danger'
  }
]

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


export const STATUS_LIST_MAPPING = [
  {
    id: 'home-isolation',
    name: 'Home Isolation',
  },
  {
    id: 'recovered',
    name: 'Recovered',
  },
  {
    id: 'dead',
    name: 'Dead',
  },
  {
    id: 'facility-status',
    name: 'Facility Status',
  }
]

export const GENDER_CHOICES = {
    1: 'Male', 
    2: 'Female', 
    3: 'Non Binary'
}

export const GENDER_MAPPING_PROPS = {
  'Male' : 1,
  'Female': 2,
  'Others': 3
}
