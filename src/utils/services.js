import { 
  GET
} from "Src/constants";

async function makeApiCall(base_url, method = GET, body = {}, headers = {}, params = {} ) {
    const url = new URL(base_url);
    let options = {
        method: method,
        headers: headers,
    }
    if(method !== GET){
      options.body = body
    }
    for (const x in params) url.searchParams.append(x, params[x])
    const response = await fetch(url.href, options);
    return await response;
}

export {
    makeApiCall
};
