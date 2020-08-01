import getHtmlElement from "./getHtmlElement";

function getRow(children = [], self, flag) {
    let rowObj = {
        elem: 'div',
        className: 'row',
    };
    
    if (self && flag !== 'admin') {
        rowObj.attr = {
            'data-id': self.rowCount++,
        }
    }
    
    console.log(self.rowCount);
    
    rowObj.content = [...children];
    
    self._saveActiveForm(Object.assign({}, rowObj));
    
    const row = getHtmlElement(rowObj);
   
    return row;
}

export default getRow;
