import getHtmlElement from "./lib/getHtmlElement";
import getRow from "./lib/getRow";
import getEvent from "./lib/getEvent";
import GetModal from "../modalWindow/getModal";

class Anketa {
    constructor(options = {}) {
        this.options = {
            wrapper: options.wrapper || document.querySelector('body'),
            elements: {
                html: ['id', 'className', 'customAttr'],
                form: ['action', 'autocomplete', 'method', 'name'],
                globalAttr: [
                    'name',
                    'value',
                    'readonly',
                    'disabled',
                    'maxlength',
                    'min',
                    'max',
                    'pattern',
                    'multiple',
                    'placeholder',
                    'required',
                    'step',
                    'autofocus',
                    'autocomplete',
                    'option',
                    'selected',
                ],
                label:['for'],
                input: [
                    'button',
                    'checkbox',
                    'file',
                    'hidden',
                    'image',
                    'password',
                    'radio',
                    'reset',
                    'submit',
                    'text',
                    'color',
                    'date',
                    'datetime',
                    'datetime-local',
                    'email',
                    'number',
                    'range',
                    'search',
                    'tel',
                    'time',
                    'url',
                    'month',
                    'week',
                ],
                select: [
                    'size',
                    'multiple',
                ],
                textarea: [],
                button:[
                    'button',
                    'reset',
                    'submit',
                ],
            },
            mode: options.mode || 'admin',
            title: options.title || '',
        };
    
        this.options.mode === 'admin' && this.setAdminTemplate();
    }
    
    setAdminTemplate() {
        
        const rowBtn = getHtmlElement({
            elem: 'button',
            className: ['row-btn'],
            attr: {
                type:'button'
            },
            content: 'Add row'
        });
        
        getEvent(rowBtn, 'click', this.addRow);
        
        const titleBtn = getHtmlElement({
            elem: 'button',
            className: ['title-btn'],
            attr: {
                type:'button'
            },
            content: 'Add title'
        });
    
        getEvent(titleBtn, 'click', this._addTitle.bind(this));
        
        const container = getHtmlElement({
            elem: 'div',
            className: ['container']
        });
        
        const rowMain = getRow(['col-3', 'col-6'], [[rowBtn, titleBtn], [getRow(['col main-anketa'])]]);
        
        this.mainManketa = rowMain.querySelector('.main-anketa');
        
        container.append(rowMain);
        
        const wrapper = this.options.wrapper;
        wrapper.append(container);
    }
    
    _addTitle(e) {
        const title = getHtmlElement({
            elem: 'h2',
            className: ['title'],
            content: prompt('Добавьте заголовок!'),
        });
        const row = getRow(['col'], [[title]]);
        console.log(row);
        this.mainManketa.append(row);
    }
    
    addRow(e){
    
    }
}

export default Anketa;
