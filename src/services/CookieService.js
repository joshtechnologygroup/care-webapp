import cookie from 'react-cookies';
import { TOKEN, USER_ID } from 'Src/constants';

// cookie
const setTokenCookie = (value) => {
    cookie.save(TOKEN, value, { path: '/' });
};

const getTokenCookie = () => {
    return cookie.load(TOKEN);
};

const deleteTokenCookie = () => {
    cookie.remove(TOKEN, { path: '/' });
};

// userId
const setUserId = (value) => {
    cookie.save(USER_ID, value, { path: '/' });
};

const getUserId = () => {
    return cookie.load(USER_ID);
};

const deleteUserId = () => {
    cookie.remove(USER_ID, { path: '/' });
};

export { setTokenCookie, getTokenCookie, deleteTokenCookie, getUserId, setUserId, deleteUserId };

