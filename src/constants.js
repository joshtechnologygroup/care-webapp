// Requests
export const DELETE = 'DELETE';
export const POST = 'POST';
export const PATCH = 'PATCH';
export const PUT = 'PUT';
export const GET = 'GET';

// Severity
export const SUCCESS = 'success';
export const DANGER = 'danger';
export const WARNING = 'warning';
export const INFO = 'info';

// User Types
export const DISTRICT_MANAGER = 3;
export const PORTIA = 2;
export const FACILITY_MANAGER = 1;

export const NAVIGATION_PERMISSION = [DISTRICT_MANAGER, FACILITY_MANAGER]


export const TOKEN = 'Token';
export const USER_ID = 'user-id';
export const APPLICATION_JSON = 'application/json';


export const CLINICAL_STATUS_UPDATED_AT = 'clinical_status_updated_at'
export const PORTEA_CALLED_AT = 'portea_called_at'
export const ORDERING_KEY = 'ordering';
export const MAPPING_INVENTORY_ATTRIBUTES = {
  'facility': 'facilityName',
  'facility_id': 'facility_id',
  'item': 'type',
  'required_quantity': 'requiredNo',
  'current_quantity': 'currentNo',
  'created_by': 'createdBy',
  'updated_at': 'updatedAt',
};
export const UPDATED_AT = 'updated_at';

export const PAGINATION_LIMIT = 50;
export const INITIAL_PAGE = 1;
export const OFFSET = 0;

export const FACILITY_EXISTS_ID = 4;
export const TOTAL_PATIENT_FIELDS = 16;
export const TOTAL_PROFILE_FIELDS = 11;
export const TOTAL_FACILITY_FIELDS = 5;
export const TOTAL_PERSONEL_DETAILS_FIELDS = 11;
export const TOTAL_CONTACT_DETAILS_FIELDS = 5;

export const DATE_FORMAT = "MM/DD/YYYY hh:mm A";
export const RELATIONSHIP_OPTIONS = [
  {
    "value": 1,
    "label": "Self"
  },
  {
    "value": 2,
    "label": "Father"
  },
  {
    "value": 3,
    "label": "Mother"
  },
  {
    "value": 4,
    "label": "Sibling"
  },
  {
    "value": 5,
    "label": "Spouse"
  },
  {
    "value": 6,
    "label": "Son"
  },
  {
    "value": 7,
    "label": "Daughter"
  },
  {
    "value": 8,
    "label": "Friend"
  },
  {
    "value": 9,
    "label": "Other relative"
  }
]
export const DATE_ONLY_FORMAT = "MM/DD/YYYY";
export const TIME_FORMAT = "hh:mm A";

export const FACILITY_DEFAULT = '---------------';
