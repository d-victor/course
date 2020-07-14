import getHtmlElement from "./getHtmlElement";

function getRow(listClasses = [], child = []) {
    const row = getHtmlElement({
        elem: 'div',
        className: ['row'],
    });
    
    const colList = listClasses.map((className, index) => {
        const elemCol = getHtmlElement({
            elem: 'div',
            className: [className],
        });
        
        if (child[index] && Array.isArray(child[index])) {
            child[index].forEach((elem) => {
                elemCol.append(elem);
            });
        }
        
        row.append(elemCol);
        
        return elemCol;
    });
    
    
    return row;
}

export default getRow;
