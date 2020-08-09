const setLocalStorage = (data, key) => {
    if (typeof data !== 'string' && typeof key !== 'string') return;
    
    window.localStorage.setItem(key, data);
};

export default setLocalStorage;