import cookie from 'react-cookies';
import { TOKEN, USER_ID } from 'Src/constants';

const setTokenCookie = (value) => {
    cookie.save(TOKEN, value, { path: '/' });
}

const setUserId = (value) => {
    cookie.save(USER_ID, value, { path: '/' });
}

const getTokenCookie = () => {
    return cookie.load(TOKEN);
};

const getUserId = () => {
    return cookie.load(USER_ID);
};

const deleteTokenCookie = () => {
    cookie.remove(TOKEN, { path: '/' });
};

export { setTokenCookie, getTokenCookie, deleteTokenCookie, getUserId, setUserId };

