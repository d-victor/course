import getHtmlElement from "./lib/getHtmlElement";
import getRow from "./lib/getRow";
import getEvent from "./lib/getEvent";
import GetModal from "../modalWindow/getModal";
import defaultOptions from "./lib/defaultOptions";

class formBuilder {
    constructor(options = {}) {
        this.options = {
            ...defaultOptions,
            ...options,
            elements: {
                ...defaultOptions.elements,
            }
        };

        this.rowCount = 0;
    
        this.options.mode === 'admin' && this.setAdminTemplate();
    }

    getFormist(){

    }

    addForm(){
        this.addFormBtn.classList.add('hidden');
        this.rowBtn.classList.remove('hidden');
        this.titleBtn.classList.remove('hidden');
    }
    
    setAdminTemplate() {
        this.addFormBtn = getHtmlElement({
            elem: 'button',
            className: 'add-form-btn',
            attr: {
                type:'button'
            },
            content: 'Add form'
        });


        getEvent(this.addFormBtn, 'click', this.addForm.bind(this));
        
        this.rowBtn = getHtmlElement({
            elem: 'button',
            className: 'row-btn hidden',
            attr: {
                type:'button'
            },
            content: 'Add row'
        });
        
        getEvent(this.rowBtn, 'click', this.addRow.bind(this));
        
        this.titleBtn = getHtmlElement({
            elem: 'button',
            className: 'title-btn hidden',
            attr: {
                type:'button'
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
        // const textTitle = prompt('Добавьте заголовок!');
        const textTitle = GetModal({});
        console.log(textTitle);
        if(textTitle === null || textTitle === '') return;

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
    
    content(){
        console.log(this)
    }

    addRow(e){
        this.rowCount = this.rowCount + 1;

        const addContent = getHtmlElement({
            elem: 'button',
            className: 'addContent',
            attr:{
                type: 'button'
            },
            content: 'Add Content'
        })

        const row = getRow([{
            elem: 'div',
            className: 'col',
            content: addContent
        }], this);

        this.mainForm.append(row);
    }
}

export default formBuilder;
