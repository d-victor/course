import getHtmlElement from "./getHtmlElement";

function getRow(children = [], self, flag, data) {
    let rowObj = {
        elem: 'div',
        className: 'row',
        attr: {}
    };
    
    if (data) {
        rowObj.attr['data-title'] = data;
    }
    
    if (self && flag !== 'admin') {
        rowObj.attr['data-id'] = self.rowCount++;
    }
    
    rowObj.content = [...children];
    
    self._saveActiveForm(Object.assign({}, rowObj));
    
    const row = getHtmlElement(rowObj);
   
    return row;
}

export default getRow;
