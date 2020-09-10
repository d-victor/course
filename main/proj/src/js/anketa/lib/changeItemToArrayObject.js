function changeItemToArrayObject(arr = [], oneIndex, twoIndex, direction) {
    if (!arr || !Array.isArray(arr) || oneIndex === undefined || twoIndex === undefined || direction === undefined) return arr;
    const indexArr = arr.map(obj => obj.attr['data-id']);
    
    const indexOne = indexArr.indexOf(oneIndex);
    const indexTwo = indexArr.indexOf(twoIndex);
    
    if (direction) {
        arr.splice(indexTwo, 0, arr[indexOne]);
        arr.splice(indexOne + 1, 1);
    } else {
        arr.splice(indexTwo + 1, 0, arr[indexOne]);
        arr.splice(indexOne, 1);
    }
}

export default changeItemToArrayObject;
