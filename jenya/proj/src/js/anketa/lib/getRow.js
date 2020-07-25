import getHtmlElement from "./getHtmlElement";

function getRow(children = [], self) {
    // console.log(listClasses, child);
    let options = {
        elem: 'div',
        className: 'row',
    };

    if (self && self.rowCount){
        options.attr = {
            'data-id': self.rowCount,
        }
    } 

    const row = getHtmlElement(options);

    children.forEach((child) => {
        // console.log(child);
        row.append(getHtmlElement(child));
    })
    
    
    return row;
}

export default getRow;
