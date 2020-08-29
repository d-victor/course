import getHtmlElement from "./getHtmlElement";
import getEvent from "./getEvent";
import elementForm from "./elementForm";
import hidden from "./hidden";
import show from "./show";
import setLabel from "./setLabel";

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



function setActiveInputTemplate(elem) {
    this.activeIntup.template.append(elem);
}

function setElementForm(e) {
    const elem = e.target;
    if (e.currentTarget === e.target
        || elem.classList.contains('addContent')
        || elem.dataset.sample === '1'
        || elem.classList.contains('active-input')
        || elem.classList.contains('attr-value')
        || elem.classList.contains('add-option-btn')
        || elem.classList.contains('validate-content')
        || elem.classList.contains('saveElem')
        || elem.name === 'label'
        || elem.classList.contains('label')) return;
    
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
    
    if (elem.classList.contains('add')) {
        activeInput.inputElem.removeAttribute(elemKey);
        delete activeInputObj.attr[elemKey];
        this.activeIntup.template.querySelector(`[name=${elemKey}]`).remove();
        elem.classList.remove('add');
        
        return;
    }
    
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
    
        const inputLabel = getHtmlElement({
            elem: 'input',
            attr: {
                type: 'text',
                name: 'label',
                'placeholder': 'Add label text'
            }
        });
    
        getEvent(inputLabel, 'change', setLabel.bind(this));
    
        activeInput.inputLabel = {
            elem: 'label',
            content: [
                {
                    elem: 'span',
                    className: 'label'
                },
                inputLabel,
                activeInput.inputElem
            ],
        };
        
        setActiveInputTemplate.call(this, getHtmlElement(activeInput.inputLabel));
        
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
        if (elemKey === 'select') {
            activeInputObj.content = [];
            
            const addOptionBtn = getHtmlElement({
                elem: 'button',
                className: 'add-option-btn',
                attr: {
                    type: 'button'
                },
                content: 'Add option'
            });
    
            getEvent(addOptionBtn, 'click', (e) => {
                this.options.modal.promt([{
                    elem: 'input',
                    attr: {
                        name: 'value',
                        placeholder: 'value'
                    }
                },
                    {
                        elem: 'label',
                        attr: {
                            for: 'selected'
                        },
                        content: 'selected'
                    },
                    {
                        elem: 'input',
                        attr: {
                            type: 'checkbox',
                            name: 'selected',
                            id: 'selected'
                        }
                    },
                    {
                        elem: 'label',
                        attr: {
                            for: 'disabled'
                        },
                        content: 'disabled'
                    },
                    {
                        elem: 'input',
                        attr: {
                            type: 'checkbox',
                            name: 'disabled',
                            id: 'disabled'
                        }
                    }
                ], true).then(data => {
                    const option = {
                        elem: 'option',
                        attr: {},
                        content: ''
                    };
                    for (let key in data) {
                        if (key === 'value') {
                            option.content = data[key];
                        }
                        if (data[key]) {
                            option.attr[key] = '';
                        }
                    }
                    
                    activeInput.inputElem.append(getHtmlElement(option));
                    
                    activeInputObj.content.push(option);
                    
                    console.log(activeInputObj);
                });
                const options = getHtmlElement()
            });
    
            setActiveInputTemplate.call(this, addOptionBtn);
        }
    } else if (activeInputObj.elem === 'button' || activeInputObj.elem === 'input' && !activeInputObj.attr.type) {
        activeInputObj.attr.type = elemKey;
        activeInput.inputElem.setAttribute('type', elemKey);
        
        hidden(parent);
        show(nextCol);
        
    } else if ((activeInputObj.elem === 'select' || activeInputObj.elem === 'textarea') || activeInputObj.attr.type) {
        if (!activeInputObj.attr[elemKey] && elemKey !== 'custom' && elemKey !== 'validate') {
            const attrValueInput = getHtmlElement({
                elem: 'input',
                className: 'attr-value',
                attr: {
                    name: elemKey,
                    placeholder: elemKey,
                }
            });
            
            elem.classList.add('add');
            activeInput.inputElem.setAttribute(elemKey, '');
            
            getEvent(attrValueInput, 'change', e => {
                const elem = e.target;
                const value = elem.value;
                const name = elem.getAttribute('name');
                
                activeInput.inputElem.setAttribute(name, value);
                activeInputObj.attr[name] = value;
            });
    
            activeInputObj.attr[elemKey] = elemKey === 'name' ? '----' : elemKey;
            
            setActiveInputTemplate.call(this, attrValueInput);
        } else if (elemKey === 'custom') {
            const attrValueInputName = {
                elem: 'input',
                className: 'attr-name',
                attr: {
                    name: 'name' + elemKey,
                    placeholder: 'name Attr',
                }
            };
            const attrValueInputValue = {
                elem: 'input',
                className: 'attr-value',
                attr: {
                    name: elemKey,
                    placeholder: 'Enter value attr',
                }
            };
            this.options.modal.promt([attrValueInputName, attrValueInputValue], true)
                .then((data) => {
                    console.log(data);
                    const attrValueInput = getHtmlElement({
                        elem: 'input',
                        className: 'attr-value',
                        attr: {
                            name: data['namecustom'],
                            value: data['custom'],
                        }
                    });
                    activeInput.inputElem.setAttribute(data['namecustom'], data['custom']);
                    activeInputObj.attr[data['namecustom']] = data['custom'];
                    
                    setActiveInputTemplate.call(this, attrValueInput);
                });
        } else if (elemKey === 'validate') {
            const selectValidateContent = getHtmlElement({
                elem: 'select',
                className: 'validate-content',
                attr: {
                    name: 'validateContent',
                },
                content: [
                    {
                        elem: 'option',
                        content: 'Select rul validation'
                    },
                    {
                        elem: 'option',
                        attr: {
                            value: 'number',
                        },
                        content: 'Only number'
                    },
                    {
                        elem: 'option',
                        attr: {
                            value: 'string',
                        },
                        content: 'Only letter'
                    },
                    {
                        elem: 'option',
                        attr: {
                            value: 'string_number',
                        },
                        content: 'Only letter or number'
                    },
                    {
                        elem: 'option',
                        attr: {
                            value: 'custom',
                        },
                        content: 'Custom validate'
                    },
                ]
            });
            
            getEvent(selectValidateContent, 'change', (e) => {
                const validateRulKey = e.target.value;
                activeInput.inputElem.value = '';
                const regExValidate = {
                    number: /\D/ig,
                    string: /[^a-zа-яё\s]+/ig,
                    string_number: /[^a-zа-яё\s\d]+/ig
                };
    
                if (validateRulKey === 'custom') {
                    this.options.modal.promt([{
                        elem: 'input',
                        attr: {
                            name: 'customValidateRul'
                        }
                    }], true).then(data => {
                        let regexpString = data['customValidateRul'];
                        regexpString = regexpString[0] === '/' ? regexpString.slice(1) : regexpString;
                        regexpString = regexpString[regexpString.length - 1] === '/' ? regexpString.slice(0, -1) : regexpString;
                        regExValidate[validateRulKey] = new RegExp(regexpString);
                        
                        activeInputObj.validate = regExValidate[validateRulKey];
                    });
                }
                
                activeInput.inputElem.oninput = (e) => {
                    const input = e.target;
                    let inputValue = input.value;
                    
                    if (regExValidate[validateRulKey].test(inputValue)) {
                        input.classList.add('error');
                        inputValue = inputValue.replace(regExValidate[validateRulKey], '');
                        input.value = inputValue;
                    } else if (!regExValidate[validateRulKey].test(inputValue)) {
                        input.classList.remove('error');
                    }
                }
            });
            
            setActiveInputTemplate.call(this, selectValidateContent);
        }
    }
    console.log(elemKey, parent, nextCol, activeInput);
}

function getElementBuildForm(row) {
    const mainTemplate = getTemplate(elementForm.elements);
    const typeTemplate = getTemplate(elementForm.type);
    const formAttrTemplate = getTemplate(elementForm.formAttr);
    
    this.activeIntup = {};
    this.activeIntup.obj = {};
    this.activeIntup.id = +row.dataset.id;
    
    this.activeIntup.template = getHtmlElement({
        elem: 'div',
        className: 'active-input'
    });
    
    hidden(typeTemplate);
    hidden(formAttrTemplate);
    
    row.onclick = setElementForm.bind(this);
    
    row.append(mainTemplate, typeTemplate, formAttrTemplate, this.activeIntup.template);
}

export default getElementBuildForm;
