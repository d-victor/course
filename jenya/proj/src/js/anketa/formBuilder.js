import getHtmlElement from "./lib/getHtmlElement";
import getRow from "./lib/getRow";
import getEvent from "./lib/getEvent";
import GetModal from "../modalWindow/getModal";
import defaultOptions from "./lib/defaultOptions";
import setLocalStorage from "../../../../../main/proj/src/js/anketa/lib/localstorage/setLocalstorage";

class formBuilder {
    constructor(options = {}) {
        this.options = {
            ...defaultOptions,
            ...options,
            modal: new GetModal({}),
            elements: {
                ...defaultOptions.elements,
            }
        };

        this.rowCount = 0;

        this.formCount = 0;

        this.options.mode === 'admin' && this.setAdminTemplate();
    }

    getFormist() {

    }

    addForm() {
        const content = {
            'promt': [],
            'confirm': [],
            'alert': []
        };

        content.promt.push(
            {
                elem: 'input',
                className: 'input',
                attr: {
                    name: 'name',
                    type: 'text',
                    placeholder: 'name'
                }
            },
            {
                elem: 'input',
                className: 'input',
                attr: {
                    name: 'method',
                    type: 'text',
                    value: 'POST',
                    placeholder: 'method'
                }
            },
            {
                elem: 'input',
                className: 'input action',
                attr: {
                    name: 'method',
                    type: 'text',
                    value: '',
                    placeholder: 'action',
                    required: ''
                },
            },
        );
        content.confirm.push(
            {
                elem: 'p',
                className: 'confirm-text',
            }
        )




        this.options.modal.promt(content.promt, !this.options.modal.content).then(data => {
            this.addFormBtn.classList.add('hidden');
            this.rowBtn.classList.remove('hidden');
            this.titleBtn.classList.remove('hidden');
            const newForm = {
                elem: 'form',
                attr: {
                    ...data,
                    'data-id-form': ++this.formCount
                },

            };

            setLocalStorage(JSON.stringify({
                activeForm: data
            }), this.options.storageKey);
        });

        this.options.modal.confirm(content.confirm);




    }


    setAdminTemplate() {
        this.addFormBtn = getHtmlElement({
            elem: 'button',
            className: 'add-form-btn',
            attr: {
                type: 'button'
            },
            content: 'Add form'
        });


        getEvent(this.addFormBtn, 'click', this.addForm.bind(this));

        this.rowBtn = getHtmlElement({
            elem: 'button',
            className: 'row-btn hidden',
            attr: {
                type: 'button'
            },
            content: 'Add row'
        });

        getEvent(this.rowBtn, 'click', this.addRow.bind(this));

        this.titleBtn = getHtmlElement({
            elem: 'button',
            className: 'title-btn hidden',
            attr: {
                type: 'button'
            },
            content: 'Add title'
        });

        getEvent(this.titleBtn, 'click', this._addTitle.bind(this));

        const container = getHtmlElement({
            elem: 'div',
            className: 'container'
        });

        const rowMain = getRow(
            [
                {
                    elem: 'div',
                    className: 'col-2 slidebar',
                    content: [this.addFormBtn, this.rowBtn, this.titleBtn]
                },
                {
                    elem: 'div',
                    className: 'col-10 main-add-form'
                }
            ]);

        this.mainForm = rowMain.querySelector('.main-add-form');

        container.append(rowMain);

        const wrapper = this.options.wrapper;
        wrapper.append(container);
    }

    _addTitle(e) {
        const textTitle = prompt("Add your title");
        console.log(textTitle);
        if (textTitle === null || textTitle === '') return;

        this.rowCount = this.rowCount + 1;

        const title = getHtmlElement({
            elem: 'h2',
            className: 'title',
            content: textTitle,
        });

        const row = getRow([{
            elem: 'div',
            className: 'col',
            content: title
        }], this);
        console.log(row);
        this.mainForm.append(row);
    }

    content() {
        console.log(this)
    }

    addRow(e) {
        this.rowCount = this.rowCount + 1;

        const addContent = getHtmlElement({
            elem: 'button',
            className: 'addContent',
            attr: {
                type: 'button'
            },
            content: 'Add Content'
        })

        getEvent(addContent, 'click', this.addForm.bind(this));

        const row = getRow([{
            elem: 'div',
            className: 'col',
            content: addContent
        }], this);

        this.mainForm.append(row);
    }
}

export default formBuilder;
