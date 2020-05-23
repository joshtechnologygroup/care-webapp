
async function makeApiCall(base_url, method, body = {}, headers = {}, params = {} ) {
    const url = new URL(base_url);
    for (const x in params) url.searchParams.append(x, params[x])
    const response = await fetch(url.href, {
        method: method,
        headers: headers,
        body: body,
    });
    return await response;
}

export {
    makeApiCall
};
