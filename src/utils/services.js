import { POST, PATCH, PUT, APPLICATION_JSON } from "Src/constants";
import * as CookieService from 'Services/CookieService';

async function makeApiCall(base_url, method, body = {}, headers = {}, params = {} ) {
    const url = new URL(base_url);
    for (const x in params) url.searchParams.append(x, params[x])
    if(method === POST || method === PATCH || method === PUT) {
        return await fetch(url.href, {
            method: method,
            headers: headers,
            body: body,
        });
    }
    else {
        return await fetch(url.href, {
            method: method,
            headers: headers,
        });
    }
}

async function makeAuthorizedApiCall(base_url, method, body = {}, params = {} ) {
    const headers = {
        'Authorization': `Token ${ CookieService.getTokenCookie() }`, 
        'Content-Type': APPLICATION_JSON,
    };
    return makeApiCall(base_url, method, body, headers, params)
}

export { makeApiCall, makeAuthorizedApiCall };
