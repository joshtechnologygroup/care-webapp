// Requests
export const DELETE = 'DELETE';
export const POST = 'POST';
export const PATCH = 'PATCH';
export const PUT = 'PUT';
export const GET = 'GET';

export const TOKEN = 'Token';
export const APPLICATION_JSON = 'application/json';

// Mapping between patient attr and column headings
export const MAPPING_PATIENTS_ATTRIBUTES = {
    'icmr_id':'idICMR',
    'govt_id': 'idGovt',
    'facility': 'idFacility',
    'name': 'patientName',
    'gender': 'gender',
    'year': 'ageYears',
    'month':'ageMonths',
    'phone_number':'contactNo',
    'address':'address',
    'district':'addressDistrict',
    'cluster_group':'clusterGroup',
    'status':'status',
    'covid_status':'covidStatus',
    'clinical_status':'clinicalStatus',
    'clinical_status_updated_at':'clinicalStatusUpdatedAt',
    'portea_called_at':'porteaCalled',
    'portea_able_to_connect':'porteaContact',
    'facility_name':'facilityName',
    'facility_district':'facilityDistrict',
    'facility_type':'facilityType',
    'ownership_type':'facilityOwnershipType'
}
export const CLINICAL_STATUS_UPDATED_AT = 'clinical_status_updated_at'
export const PORTEA_CALLED_AT = 'portea_called_at'
export const ORDERING_KEY = 'ordering';

export const PAGINATION_LIMIT = 1
