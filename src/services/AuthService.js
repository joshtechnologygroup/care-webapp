import {
    LOGIN_URL,
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

export {
    LoginUserService
};
