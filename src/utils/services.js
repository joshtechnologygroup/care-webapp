
async function makeApiCall(base_url, method, body = {}, headers = {}, params = {} ) {
    console.log('------------------')
    const url = new URL(base_url);
    console.log('------------------')
    for (const x in params) url.searchParams.append(x, params[x])
    console.log('------------------')
    const response = await fetch(url.href, {
        method: method,
        headers: headers,
        body: body,
    });
    console.log('------------------')
    return await response;
}

export {
    makeApiCall
};
