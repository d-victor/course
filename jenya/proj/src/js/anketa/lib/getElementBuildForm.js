import getHtmlElement from "./getHtmlElement";
import getEvent from "./getEvent";
import elementForm from "./elementForm";

function getTemplate(itemList) {
    const wrapper = getHtmlElement({
        elem: 'div',
    });

    const ul = getHtmlElement({
        elem: 'ul',
        className: 'elem-list',
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

function show(elem) {
    elem.classList.remove('hidden');
}

function hidden(elem) {
    elem.classList.add('hidden');
}

function setActiveInputTemplate(elem) {
    this.activeInput.template.append(elem);
}

function setElementForm(e) {
    const elem = e.target;
    // console.log(e.currentTarget, e.target);
    if (e.currentTarget === elem || elem.classList.contains('addContent') || elem.dataset.sample === '1' || elem.classList.contains('active-input') || elem.classList.contains('attr-value')) return;
    // added class modificator
    elem.classList.toggle('checked-input');

    const elemKey = elem.dataset.key;
    const activeInput = this.activeInput;
    const activeInputObj = activeInput.obj;
    const parent = elem.parentElement.parentElement;
    const nextCol = parent.nextElementSibling;

    // console.log(activeInput);

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

        if (elemKey === 'input' || elemKey === 'button') {
            show(nextCol);
        } else {
            show(nextCol.nextElementSibling);
        }
        if (elemKey === 'button') {
            [...nextCol.querySelectorAll('li')].forEach(li => {
                // console.log(li, 'button', 'reset', 'submit');
                const key = li.dataset.key;
                if (key !== 'button' && key !== 'reset' && key !== 'submit') {
                    hidden(li);
                }
            });

            this.options.modal.promt([{
                elem: 'input',
                attr: {
                    name: 'value'
                }
            }], true).then(data => {
                // console.log(data.value);
                activeInputObj.content = data.value;
                activeInput.inputElem.textContent = data.value;

            });
        }
    } else if (activeInputObj.elem === 'button' || activeInputObj.elem === 'input' && !activeInputObj.attr.type) {
        // console.log('button && input');
        activeInputObj.attr.type = elemKey;
        activeInput.inputElem.setAttribute('type', elemKey);
        hidden(parent);
        show(nextCol);

        // console.log(activeInputObj);
    } else if ((activeInputObj.elem === 'select' || activeInputObj.elem === 'textarea') || activeInputObj.attr.type) {
        console.log('seeeeelect && textarea');
        if (!activeInputObj.attr[elemKey]) {
            const attrValueInput = getHtmlElement({
                elem: 'input',
                className: 'attr-value',
                attr: {
                    name: elemKey,
                    placeholder: elemKey
                }
            })
            getEvent(attrValueInput, 'change', () => {
                const elem = e.target;
                const value = elem.value;
                const name = elem.getAttribute('name');

                activeInput.inputElem.setAttribute(name, value);

                // activeInput.inputElem.classList.add('checked-input');

                activeInputObj.attr[name] = value;
            });

            parent.children.forEach((el) => {
                getEvent(el, 'click', (e) => {
                    const eElem = e.target;
                    const tar = e.target.getAttribute('data-key');
                    const attrDel = activeInputObj.attr[elemKey];
                    const wrp = activeInput.template;


                    if (tar === attrDel) {
                        console.log(eElem);
                        attrValueInput.remove();

                    };
                })
            })

            // getEvent(parent.children, 'click', (e) => {
            //     // const conf = confirm('Do you want to delete this elem?');
            //     // if(!conf) return;
            //     // attrValueInput.remove();
            //     // console.log(attrValueInput);
            //     // console.log(parent.children);

            // })

            setActiveInputTemplate.call(this, attrValueInput);
        }
        activeInputObj.attr[elemKey] = elemKey;
    }

    // console.log(activeInput.inputElem);
}

function getElementBuildForm(row) {
    const mainTemplate = getTemplate(elementForm.elements);
    const typeTemplate = getTemplate(elementForm.type);
    const formAttrTemplate = getTemplate(elementForm.formAttr);

    this.activeInput = {};
    this.activeInput.obj = {};

    this.activeInput.template = getHtmlElement({
        elem: 'div',
        className: 'active-input'
    });

    hidden(typeTemplate);
    hidden(formAttrTemplate);


    getEvent(row, 'click', setElementForm.bind(this));

    row.append(mainTemplate, typeTemplate, formAttrTemplate, this.activeInput.template);
    // console.log(mainTemplate, typeTemplate, formAttrTemplate);
}

export default getElementBuildForm;