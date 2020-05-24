const SERVER = process.env.REACT_APP_SERVER
const API_V1 = 'api/v1/';
export const LOGIN_URL = SERVER + API_V1 + 'accounts/login/';
export const LOGOUT_URL = SERVER + API_V1 + 'accounts/logout/';

// Facilities
export const FACILITY_LIST_URL = SERVER + API_V1 + 'facilities/facility'
export const FACILITY_TYPE_LIST_URL = SERVER + API_V1 + 'facilities/facility-type'

// commons
export const DISTRICT_LIST_URL = SERVER + API_V1 + 'accounts/districts/'
export const OWNERSHIP_TYPE_LIST_URL = SERVER + API_V1 + 'commons/ownership-type/'
