import cookie from 'react-cookies';
import { TOKEN } from 'Src/constants';

const setTokenCookie = (value) => {
    cookie.save(TOKEN, value, { path: '/' });
}

const getTokenCookie = () => {
    return cookie.load(TOKEN);
};

const deleteTokenCookie = () => {
    cookie.remove(TOKEN, { path: '/' });
};

export { setTokenCookie, getTokenCookie, deleteTokenCookie };

