const getLocalStorage = (key) => {
    if(typeof key !== 'string') return;

    return window.localStorage.getItem(key);
}

export default getLocalStorage;