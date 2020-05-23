
async function Service(url, method, body = {}, headers = {}, params ) {
    url += '?'
    for (const x in params) url += x + '=' + params[x] + "&";
    url = url.slice(0, -1); 
    const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
    });
    return await response;
}

export {
    Service
};
