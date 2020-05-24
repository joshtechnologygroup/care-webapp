const SERVER = process.env.REACT_APP_SERVER
const API_V1 = 'api/v1/';
export const LOGIN_URL = SERVER + API_V1 + 'accounts/login/';
export const LOGOUT_URL = SERVER + API_V1 + 'accounts/logout/';
export const PASSWORD_FORGOT_URL = SERVER + API_V1 + 'accounts/forgot-password/';
export const PASSWORD_RESET_URL = SERVER + API_V1 + 'accounts/password-reset-confirm/';
