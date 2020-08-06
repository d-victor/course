import getHtmlElement from "./getHtmlElement";
import getEvent from "./getEvent";

function addElem(row, e) {
    const op = this.options;
    const inputText = e.currentTarget.dataset.key;
    const dataType = e.currentTarget.dataset.type;
    
    this.activeInput = {
        elem: inputText,
        className: op.inputDefaultClass,
        attr: {}
    };
    
    const handler = (e) => {
        const dataType = e.currentTarget.dataset.type;
        const inputText = e.currentTarget.dataset.key;
        
        let modal;
        
        if (dataType !== 'type') {
            op.modal.promt([{
                elem: 'input',
                attr: {
                    type: 'text',
                    name: inputText
                }
            }], true).then(data => {
                for (let key in data) {
                    this.activeInput.attr[key] = data[key];
                }
            })
        } else {
            this.activeInput.attr[dataType] = inputText;
        }
    };
    
    row.append(getAttrRow(op.elements[inputText].sort(), handler, inputText));
}

function getAttrRow(attrList, handler, inputText) {
    const attrElem = [].concat(attrList).sort();
    
    const ul = getHtmlElement({
        elem: 'ul'
    });
    const w = getHtmlElement({
        elem: 'div',
        className: 'elem-list',
        content: ul
    });
    let li;
    
    attrElem.forEach((attr) => {
        li = getHtmlElement({
            elem: 'li',
            className: 'elem-item',
            attr: {
                'data-key': attr,
                'data-type': inputText === 'input' || inputText === 'button' ? 'type' : '',
            },
            content: attr
        });
        
        getEvent(li, 'click', handler);
        
        ul.append(li);
    });
    
    w.append(ul);
    
    return w;
    
}

function getElementBuildForm(row) {
    const op = this.options;
    const elemList = op.elements;
    
    const elemWrap = getHtmlElement({
        elem: 'div',
        className: 'elem-list'
    });
    
    const ulElem = getHtmlElement({
        elem: 'ul'
    });
    
    let li;
    
    for (let key in elemList) {
        li = getHtmlElement({
            elem: 'li',
            className: 'elem-item',
            attr: {
                'data-key': key,
            },
            content: key,
        });
        
        getEvent(li, 'click', (e) => {
            addElem.call(this, row, e);
        });
        
        ulElem.append(li);
    }
    
    elemWrap.append(ulElem);
    
    row.append(elemWrap);
}

export default getElementBuildForm;
