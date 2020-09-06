const changeItemToArray = (arr = [], index1, index2, direction) => {
    if (arr.length === 0 || index1 === undefined || index2 === undefined) return arr.slice();
    
    arr = arr.slice();
    
    const indexOne = arr.indexOf(index1);
    const indexTwo = arr.indexOf(index2);
    
    if (direction) {
        arr.splice(indexTwo, 0, arr[indexOne]);
        arr.splice(indexOne + 1, 1);
    } else {
        arr.splice(indexTwo + 1, 0, arr[indexOne]);
        arr.splice(indexOne, 1);
    }
    
    return arr;
};

export default changeItemToArray;
