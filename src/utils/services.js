import { GET, APPLICATION_JSON } from "Src/constants";
import * as CookieService from 'Services/CookieService';

async function makeApiCall(base_url, method = GET, body = {}, headers = {}, params = {} ) {
    const url = new URL(base_url);
    let options = {
        method: method,
        headers: headers,
    }
    if(method !== GET){
      options.body = body
    }
    Object.keys(params).forEach((key) => {
        const paramValue = params[key]
        if(Array.isArray(paramValue)){
            params[key].forEach((value) => url.searchParams.append(key, value))
        }
        else
            url.searchParams.append(key, paramValue);
    })
    const response = await fetch(url.href, options);
    return await response;
}

async function makeAuthorizedApiCall(base_url, method = GET, body = {}, params = {} ) {
    const headers = {
        'Authorization': `Token ${ CookieService.getTokenCookie() }`, 
        'Content-Type': APPLICATION_JSON,
    };
    return makeApiCall(base_url, method, body, headers, params)
}

export { makeApiCall, makeAuthorizedApiCall };
