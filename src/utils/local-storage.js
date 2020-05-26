export const setData = (key, value) => {
    if(key && window && window.localStorage) {
         window.localStorage.setItem(key, value);
    }
};

export const getData = (key) => {
    if(key && window && window.localStorage) {
        return window && window.localStorage && window.localStorage.getItem(key);
    }
};

export default {
    setData,
    getData
};
