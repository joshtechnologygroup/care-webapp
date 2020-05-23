import {
    LOGIN_URL,
    LOGOUT_URL
} from 'Src/routes';

async function LoginUserService(email, password) {
    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    return await response;
}

async function LogoutUserService(token) {
    const response = await fetch(LOGOUT_URL, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${ token }`,
        },
    });
    return await response;
}

export {
    LoginUserService,
    LogoutUserService
};
