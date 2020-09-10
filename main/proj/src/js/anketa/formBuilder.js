import getHtmlElement from "./lib/getHtmlElement";
import getRow from "./lib/getRow";
import getEvent from "./lib/getEvent";
import GetModal from "../modalWindow/getModal";
import defaultOptions from "./lib/defaultOptions";
import setLocalStorage from "./lib/localstorage/setLocalstorage";
import getLocalStorage from "./lib/localstorage/getLocalstorage";
import getContentBtn from "./lib/getContentBtn";
import getParentWithAttr from "./lib/getParentWithAttr";
import getElementBuildForm from "./lib/getElementBuildForm";
import hidden from "./lib/hidden";
import show from "./lib/show";
import Drag from "../drag/drag"
import changeItemToArrayObject from "./lib/changeItemToArrayObject";

class FormBuilder {
    constructor(options = {}) {
        this.options = {
            ...defaultOptions,
            ...options,
            modal: new GetModal({}),
            elements: {
                ...defaultOptions.elements
            }
        };
        
        this.rowCount = 0;
        
        this.formCount = 0;
        
        this.options.mode === 'admin' && this.setAdminTemplate();
    }
    
    addForm() {
        const content = [];
        const btnAddAttr = getHtmlElement({
            elem: 'button',
            className: 'primary-btn',
            attr: {
                type: 'button'
            },
            content: 'Add custom attr',
        });
        
        getEvent(btnAddAttr, 'click', () => {
            const nameNewAttr = prompt('Что за...?');
            const newAttributeInput = getHtmlElement({
                elem: 'input',
                className: 'input',
                attr: {
                    type: 'text',
                    name: nameNewAttr,
                    placeholder: nameNewAttr
                }
            },);
            
            const formGroup = document.querySelector('.modal-content .form-group');
            
            formGroup.append(newAttributeInput);
        });
        
        content.push(
            {
                elem: 'div',
                className: 'form-group',
                content: [
                    {
                        elem: 'input',
                        className: 'input',
                        attr: {
                            type: 'text',
                            name: 'name',
                            placeholder: 'name'
                        },
                    },
                    {
                        elem: 'input',
                        className: 'input',
                        attr: {
                            type: 'text',
                            name: 'method',
                            value: 'POST',
                            placeholder: 'method',
                            required: ''
                        },
                    },
                    {
                        elem: 'input',
                        className: 'input action',
                        attr: {
                            type: 'text',
                            name: 'action',
                            value: '',
                            placeholder: 'action',
                            required: '',
                        },
                    },
                ]
            },
            {
                elem: 'div',
                className: 'action',
                content: btnAddAttr
            }
        );
        
        this.options.modal.promt(content, !this.options.modal.content).then(data => {
            this._showBtn();
            
            const newForm = {
                elem: 'form',
                className: this.options.formClass,
                attr: {
                    ...data,
                    'data-id-form': ++this.formCount
                },
                content: []
            };
            
            this.activeForm = newForm;
            
            setLocalStorage(JSON.stringify({
                activeForm: newForm
            }), this.options.storageKey);
            
        });
    }
    
    saveActiveItem(e) {
        if (!(this.activeIntup.obj.attr && this.activeIntup.obj.attr.name !== '----')) {
            alert('Ошибка вы ничего не выбрали');
            
            return;
        }
        
        const targetRow = this.activeForm.content.find(row => {
            return row.attr['data-id'] === this.activeIntup.id;
        });
        
        this.activeIntup.inputLabel.content[1] = this.activeIntup.obj;
        
        targetRow.content.push(this.activeIntup.inputLabel);
        
        setLocalStorage(JSON.stringify({
            activeForm: this.activeForm,
        }), this.options.storageKey);
        
        hidden(e.currentTarget.nextSibling.nextSibling.nextSibling);
        show(e.currentTarget.nextSibling);
        
        this.clearActiveIntup();
    }
    
    clearActiveIntup() {
        const activeIntup = this.activeIntup;
        
        const formElem = activeIntup.template.firstChild;
        
        activeIntup.template.append(formElem);
        
        document.querySelectorAll('.elem-list li.add').forEach(item => {
            item.classList.remove('add');
        });
        
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
        
        this.saveActiveFormBtn = getHtmlElement({
            elem: 'button',
            className: "save hidden",
            attr: {
                type: 'button'
            },
            content: "Save"
        });
        
        getEvent(this.saveActiveFormBtn, 'click', () => {
            let savedForm = getLocalStorage(this.options.storageSavedKey);
            
            savedForm = savedForm ? JSON.parse(savedForm).savedForm : [];
            savedForm.push(Object.assign(this.activeForm));
            
            setLocalStorage(JSON.stringify({
                savedForm: savedForm,
            }), this.options.storageSavedKey);
            
            setLocalStorage(JSON.stringify({
                activeForm: '',
            }), this.options.storageKey);
            
            this.activeForm = {};
            this.mainForm.innerHTML = '';
            
            this._startBtn();
        });
        
        this.dragRowBtn = getHtmlElement({
            elem: 'button',
            className: 'drag-start-btn hidden',
            attr: {
                type: 'button'
            },
            content: 'Start drag'
        });
        
        getEvent(this.dragRowBtn, 'click', () => {
            const formBuilder = this;
            this.drag = new Drag({
                wrapper: this.mainForm,
                afterChange: function () {
                    const activeForm = JSON.parse(getLocalStorage(formBuilder.options.storageKey)).activeForm;
                    const [oneIndex, twoIndex, direction] = this.lastChangeIndex;
                    
                    changeItemToArrayObject(activeForm.content, oneIndex, twoIndex, direction);
                    
                    formBuilder._saveToLocal({
                        activeForm: activeForm,
                    });
                },
            });
            
            [...this.mainForm.children].map(item => item.addEventListener('afterChange', function () {
                const activeForm = JSON.parse(getLocalStorage(formBuilder.options.storageKey)).activeForm;
                const [oneIndex, twoIndex, direction] = this.lastChangeIndex;
                
                changeItemToArrayObject(activeForm.content, oneIndex, twoIndex, direction);
                
                formBuilder._saveToLocal({
                    activeForm: activeForm,
                });
            }.bind(this.drag)));
            
        });
        
        getEvent(this.titleBtn, 'click', this._addTitle.bind(this));
        
        const container = getHtmlElement({
            elem: 'div',
            className: 'container'
        });
        
        const rowMain = getRow([
            {
                elem: 'div',
                className: 'col-2 sidebar',
                content: [this.addFormBtn, this.rowBtn, this.titleBtn, this.dragRowBtn, this.saveActiveFormBtn],
            },
            {
                elem: 'div',
                className: 'col-10 main-add-form',
            }
        ], this, 'admin');
        
        this.mainForm = rowMain.querySelector('.main-add-form');
        
        container.append(rowMain);
        
        const wrapper = this.options.wrapper;
        wrapper.append(container);
        
        const tmp = getLocalStorage(this.options.storageKey);
        
        if (!this.activeForm) this.activeForm = tmp ? JSON.parse(tmp).activeForm : false;
        
        if (this.activeForm) {
            this._showBtn();
            this.getHtmlForm();
        }
    }
    
    getHtmlForm() {
        if (this.options.mode === 'admin') {
            this.activeForm.content.forEach(elem => {
                
                this.rowCount = elem.attr['data-id'] > this.rowCount ? elem.attr['data-id'] : this.rowCount;
                
                elem = getHtmlElement(elem);
                
                if (elem.dataset.title !== 'title') {
                    getContentBtn.call(this, elem);
                }
                
                this.mainForm.append(elem)
            });
            this.rowCount++;
        }
    };
    
    _showBtn() {
        this.addFormBtn.classList.add('hidden');
        this.rowBtn.classList.remove('hidden');
        this.titleBtn.classList.remove('hidden');
        this.dragRowBtn.classList.remove('hidden');
        this.saveActiveFormBtn.classList.remove('hidden');
    }
    
    _startBtn() {
        this.addFormBtn.classList.remove('hidden');
        this.rowBtn.classList.add('hidden');
        this.titleBtn.classList.add('hidden');
        this.dragRowBtn.classList.add('hidden');
        this.saveActiveFormBtn.classList.add('hidden');
    }
    
    _addTitle(e) {
        const textTitle = prompt('Добавьте заголовок!');
        
        if (textTitle === null || textTitle === '') return;
        
        const title = {
            elem: 'h2',
            className: 'title',
            content: textTitle,
        };
        
        const newRowObj = {
            elem: 'div',
            className: 'col',
            content: [title]
        };
        
        const row = getRow([newRowObj], this, undefined, 'title');
        
        this.mainForm.append(row);
    }
    
    _saveToLocal(data) {
        if (!data) return;
        
        setLocalStorage(JSON.stringify(data), this.options.storageKey)
    }
    
    addContent(e) {
        const htmlRow = getParentWithAttr(e.currentTarget, 'data-id');
        hidden(e.currentTarget);
        show(e.currentTarget.nextSibling);
        
        getElementBuildForm.apply(this, [htmlRow]);
    }
    
    _saveActiveForm(data) {
        if (!this.activeForm) return;
        
        this.activeForm.content.push(data);
        
        this._saveToLocal({
            activeForm: this.activeForm
        });
    }
    
    addRow(e) {
        const row = getRow([], this);
        
        const addContent = getContentBtn.call(this, row);
        
        this.mainForm.append(row);
    }
}

export default FormBuilder;
