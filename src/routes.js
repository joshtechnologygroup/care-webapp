const SERVER = process.env.REACT_APP_SERVER
const API_V1 = 'api/v1/';
export const LOGIN_URL = SERVER + API_V1 + 'accounts/login/';
export const LOGOUT_URL = SERVER + API_V1 + 'accounts/logout/';
export const PASSWORD_FORGOT_URL = SERVER + API_V1 + 'accounts/forgot-password/';
export const PASSWORD_RESET_URL = SERVER + API_V1 + 'accounts/password-reset-confirm/{0}/{1}/';

// Facilities
export const FACILITY_LIST_URL = SERVER + API_V1 + 'facilities/facility'
export const FACILITY_TYPE_LIST_URL = SERVER + API_V1 + 'facilities/facility-type'

// commons
export const DISTRICT_LIST_URL = SERVER + API_V1 + 'accounts/districts/'
export const OWNERSHIP_TYPE_LIST_URL = SERVER + API_V1 + 'commons/ownership-type/'

// Patients
export const PATIENT_LIST_URL = SERVER + API_V1 + 'patients/?limit={0}&offset={1}'
export const CLINICAL_STATUS_LIST_URL = SERVER + API_V1 + 'patients/clinical-status/'
export const CLUSTER_GROUP_LIST_URL = SERVER + API_V1 + 'patients/patient-groups/'
export const COVID_STATUS_LIST_URL = SERVER + API_V1 + 'patients/covid-status/'

//Patient Transfers
export const TRANSFER_LIST_URL = SERVER + API_V1 + 'patients/patient-transfer/'
export const TRANSFER_UPDATE_URL = SERVER + API_V1 + 'patients/patient-transfer/'
