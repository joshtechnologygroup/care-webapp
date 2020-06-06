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
  email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, // eslint-disable-line
  phone_number: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im // eslint-disable-line
}

// range filter constants
export const EQUAL_TO = "Equals To";
export const LESS_THAN = "Less Than";
export const GREATER_THAN = "Greater Than";
export const LESS_THAN_EQUAL_TO = "Less Than Equal To";
export const GREATER_THAN_EQUAL_TO = "Greater Than Equal To";
export const RANGE = "Range";

export const genderChoices = [
    {
        id: 1,
        name: 'Male',
        title: 'Male',
        value: 1,
    },
    {
        id: 2,
        name: 'Female',
        title: 'Female',
        value: 2,
    },
    {
        id: 3,
        name: 'Non-binary gender',
        title: 'Non-binary gender',
        value: 3,
    },
];

export const transferStatus = [
    {
        id: 1,
        name: 'Pending',
    },
    {
        id: 2,
        name: 'Accepted',
    },
    {
        id: 3,
        name: 'Rejected',
    },
]


export const booleanStatuses = {
  positiveNegative: [
    {
      value: 1,
      name: 'Positive'
    },
    {
      value: 2,
      name: 'Negative'
    },
    {
      value: 3,
      name: 'Result awaited'
    },
    {
      value: 4,
      name: 'Not tested Yet'
    },
  ]
}

export const reachableStatus = [
  {
    id: 1,
    value: true,
    name: 'Contacted',
    theme: 'success'
  },
  {
    id: 2,
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

export const clinicalStatusChoices = [
  {
    "id": 1,
    "name": "Asymptomatic"
  },
  {
    "id": 2,
    "name": "Mild symptoms"
  },
  {
    "id": 3,
    "name": "severe symptoms"
  },
  {
    "id": 4,
    "name": "inward without oxygen"
  },
  {
    "id": 5,
    "name": "inward with oxygen"
  },
  {
    "id": 6,
    "name": "ICU without ventilator"
  },
  {
    "id": 7,
    "name": "ICU with ventilator"
  },
  {
    "id": 8,
    "name": "Other"
  }
]

export const CovidStatusChoices = [
  {
      "id": 1,
      "name": "Positive"
  },
  {
      "id": 2,
      "name": "Negative"
  },
  {
      "id": 3,
      "name": "Result awaited"
  },
  {
      "id": 4,
      "name": "Not tested Yet"
  }
]

export const diseaseChoices = [
  {
    "id": 1,
    "name": "Dizzyness"
  },
  {
    "id": 2,
    "name": "Hyponatremia"
  },
  {
    "id": 3,
    "name": "Overhydration"
  },
  {
    "id": 4,
    "name": "Thirst"
  },
  {
    "id": 5,
    "name": "psychogenic polydipsia"
  },
  {
    "id": 6,
    "name": "Allergy"
  },
  {
    "id": 8,
    "name": "Sore throat"
  }
]

export const symptomChoices =  [
  {
    "id": 1,
    "name": "Dizzyness"
  },
  {
    "id": 2,
    "name": "Fever"
  },
  {
    "id": 3,
    "name": "Tiredness"
  },
  {
    "id": 4,
    "name": "Difficulty Breathing"
  },
  {
    "id": 5,
    "name": "Chest Pain"
  },
  {
    "id": 6,
    "name": "Dry Cough"
  },
  {
    "id": 7,
    "name": "Cold"
  },
  {
    "id": 8,
    "name": "Sore throat"
  },
  {
    "id": 9,
    "name": "Diarrhoea"
  },
  {
    "id": 10,
    "name": "Body Ache"
  }
]

export const facility_status_choices =  [
  {
      "id": 2,
      "name": "Admitted to Facility",
      "theme": "danger"
  },
  {
      "id": 3,
      "name": "Transferred to another Facility",
      "theme": "warning"
  },
  {
      "id": 4,
      "name": "Discharged",
      "theme": "success"
  }
]

export const facilityStatusChoices = [
  {
      "id": 1,
      "name": "Home Isolation"
  },
  {
      "id": 2,
      "name": "Admitted to Facility",
      "theme": "danger"
  },
  {
      "id": 3,
      "name": "Transferred to another Facility",
      "theme": "warning"
  },
  {
      "id": 4,
      "name": "Discharged",
      "theme": "success"
  },
  {
    "id": 5,
    "name": "Dead",
    "theme": "danger"
  }
]

export const countryChoices =  [
  {
      "id": 1,
      "name": "India"
  },
  {
      "id": 2,
      "name": "United States"
  },
  {
      "id": 3,
      "name": "South Korea"
  },
  {
      "id": 4,
      "name": "Japan"
  },
  {
      "id": 5,
      "name": "Nepal"
  },
  {
      "id": 6,
      "name": "Sri Lanka"
  },
  {
      "id": 7,
      "name": "Mauritius"
  }
]

export const stateChoices = [
  {
    "id": 1,
    "name": "Delhi"
  },
  {
    "id": 2,
    "name": "Uttar Pradesh"
  },
  {
    "id": 3,
    "name": "Haryana"
  },
  {
    "id": 4,
    "name": "Maharashtra"
  },
  {
    "id": 5,
    "name": "Karnataka"
  },
  {
    "id": 6,
    "name": "Kerala"
  }
]


export const relationshipChoices =  [
  {
      "id": 1,
      "name": "Self"
  },
  {
      "id": 2,
      "name": "Father"
  },
  {
      "id": 3,
      "name": "Mother"
  },
  {
      "id": 4,
      "name": "Sibling"
  },
  {
      "id": 5,
      "name": "Spouse"
  },
  {
      "id": 6,
      "name": "Son"
  },
  {
      "id": 7,
      "name": "Daughter"
  },
  {
      "id": 8,
      "name": "Friend"
  },
  {
      "id": 9,
      "name": "Other relative"
  }
]

export const labTestStatusChoices =  [
  {
      "id": 1,
      "name": "Sample Sent"
  },
  {
      "id": 2,
      "name": "Report Pending",
      "theme": "warning"
  },
  {
      "id": 3,
      "name": "Positive",
      "theme": "danger"
  },
  {
      "id": 4,
      "name": "Negative",
      "theme": "success"
  },
  {
      "id": 5,
      "name": "Presumptive Positive",
      "theme": "danger-light"
  },
  {
      "id": 6,
      "name": "Test Inconclusive",
      "theme": "primary"
  }
]

export const patient_status_choices = [
  {
      "id": 1,
      "name": "Home Isolation",
      "theme": "warning"
  },
  {
      "id": 2,
      "name": "Recovered",
      "theme": "success"
  },
  {
      "id": 3,
      "name": "Dead",
      "theme": "danger"
  }
]

export const patient_facility_status_choices = [
  {
      "id": 1,
      "name": "Home Isolation",
      "theme": "warning"
  },
  {
      "id": 2,
      "name": "Recovered",
      "theme": "success"
  },
  {
      "id": 3,
      "name": "Dead",
      "theme": "danger"
  },
  {
      "id": 4,
      "name": "Facility exists",
      "theme": "success"
  }
]