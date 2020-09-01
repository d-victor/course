const getCoords = elem => {
    const box = elem.getBoundingClientRect();
    
    return {
        top: box.top,
        left: box.left
    }
};

export default getCoords;
