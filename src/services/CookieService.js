import cookie from 'react-cookies';
import { token } from 'Src/constants';

const setTokenCookie = (value) => {
    cookie.save(token, value, { path: '/' });
};

const getTokenCookie = () => {
    return cookie.load(token);
};

const deleteTokenCookie = () => {
    cookie.remove(token, { path: '/' });
};

export { setTokenCookie, getTokenCookie, deleteTokenCookie };


