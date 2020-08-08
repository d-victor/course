import getHtmlElement from "./getHtmlElement";
import getEvent from "./getEvent";
import elementForm from "./elementForm";

function getTemplate(itemList) {
    const wrapper = getHtmlElement({
        elem: 'div'
    });
    
    const ul = getHtmlElement({
        elem: 'ul',
        className: 'elem-list'
    });
    
    let li;
    
    itemList.forEach(item => {
        li = getHtmlElement({
            elem: 'li',
            attr: {
                'data-key': item
            },
            content: item
        });
        
        ul.append(li);
    });
    
    wrapper.append(ul);
    
    return wrapper;
}

function hidden(elem) {
    elem.classList.add('hidden');
}

function show(elem) {
    elem.classList.remove('hidden');
}

function setActiveInputTemplate(elem) {
    this.activeIntup.template.append(elem);
}

function setElementForm(e) {
    const elem = e.target;
    if (e.currentTarget === e.target || elem.classList.contains('addContent') || elem.dataset.sample === '1' || elem.classList.contains('active-input') || elem.classList.contains('attr-value')) return;
    
    const elemKey = elem.dataset.key;
    const activeInput = this.activeIntup;
    const activeInputObj = activeInput.obj;
    const parent = elem.parentElement.parentElement;
    const nextCol = parent.nextElementSibling;
    const s = {
        elem: 'button',
        className: 'dfds',
        attr: {
            type: 'text',
            value: 'dfds',
        }
    };
    
    if (!activeInputObj.elem) {
        activeInputObj.elem = elemKey;
        activeInputObj.attr = {};
        
        hidden(parent);
        
        activeInput.inputElem = getHtmlElement({
            elem: elemKey,
            attr: {
                'data-sample': '1'
            }
        });
        
        setActiveInputTemplate.call(this, activeInput.inputElem);
        
        if (elemKey === 'input' || elemKey === 'button'){
            show(nextCol);
        } else {
            show(nextCol.nextElementSibling);
        }
        if (elemKey === 'button') {
            [...nextCol.querySelectorAll('li')].forEach(li => {
                const key = li.dataset.key;
                if (key !== 'button' && key !== 'reset' && key !== 'submit') {
                    hidden(li);
                }
            });
            
            this.options.modal.promt([{
                elem: 'input',
                attr:{
                    name: 'value'
                }
            }], true).then(data => {
                activeInputObj.content = data.value;
                activeInput.inputElem.textContent = data.value;
            });
        }
    } else if (activeInputObj.elem === 'button' || activeInputObj.elem === 'input' && !activeInputObj.attr.type) {
        activeInputObj.attr.type = elemKey;
        activeInput.inputElem.setAttribute('type', elemKey);
        
        hidden(parent);
        show(nextCol);
        
    } else if ((activeInputObj.elem === 'select' || activeInputObj.elem === 'textarea') || activeInputObj.attr.type) {
        if (!activeInputObj.attr[elemKey]) {
            const attrValueInput = getHtmlElement({
                elem: 'input',
                className: 'attr-value',
                attr: {
                    name: elemKey,
                    placeholder: elemKey,
                }
            });
            
            getEvent(attrValueInput, 'change', e => {
                const elem = e.target;
                const value = elem.value;
                const name = elem.getAttribute('name');
                
                activeInput.inputElem.setAttribute(name, value);
                activeInputObj.attr[name] = value;
                console.log(activeInputObj)
            });
            
            setActiveInputTemplate.call(this, attrValueInput);
        }
        activeInputObj.attr[elemKey] = elemKey;
    }
    console.log(elemKey, parent, nextCol, activeInput);
}

function getElementBuildForm(row) {
    const mainTemplate = getTemplate(elementForm.elements);
    const typeTemplate = getTemplate(elementForm.type);
    const formAttrTemplate = getTemplate(elementForm.formAttr);
    
    this.activeIntup = {};
    this.activeIntup.obj = {};
    
    this.activeIntup.template = getHtmlElement({
        elem: 'div',
        className: 'active-input'
    });
    
    hidden(typeTemplate);
    hidden(formAttrTemplate);
    
    getEvent(row, 'click', setElementForm.bind(this));
    
    row.append(mainTemplate, typeTemplate, formAttrTemplate, this.activeIntup.template);
}

export default getElementBuildForm;
