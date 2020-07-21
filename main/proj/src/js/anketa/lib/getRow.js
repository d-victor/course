import getHtmlElement from "./getHtmlElement";

function getRow(children = [], self) {
    let options = {
        elem: 'div',
        className: 'row',
    };
    
    if (self && self.rowCount) {
        options.attr = {
            'data-id': self.rowCount,
        }
    }
    
    const row = getHtmlElement(options);
    
    children.forEach((child) => {
        row.append(getHtmlElement(child));
    });
    
    return row;
}

export default getRow;
