import getHtmlElement from "../anketa/lib/getHtmlElement";
import getRow from "../anketa/lib/getRow";
import defaultOptions from "./lib/defaultOptions";


class GetModal {
    constructor(options = {}){
        this.option = {
            ...defaultOptions,
            ...options,
            elements: {
                ...defaultOptions.elements,
            }
        };
        this.setModalTemplate();
    }

    setModalTemplate(){

        return new Promise((resolve, reject) => {
        
            const mainWrapper = this.option.wrapper;

            this.modalForm = getHtmlElement({
                elem: 'form',
                name: 'modalTitleForm'
            });
            this.inputForm = getHtmlElement({
                elem: 'input',
                attr:{
                    type: 'text'
                }
            });
            this.modalSubmit = getHtmlElement({
                elem: 'button',
                className: 'submitBtn-modal',
                attr:{
                    type: 'submit'
                },
                content: 'Submit'
            })
            this.modalCancel = getHtmlElement({
                elem: 'button',
                className: 'cancel-btn',
                attr:{
                    type: 'button'
                },
                content: 'Cansel'
            })
            const modalBlock = getRow([
                {
                    elem: 'div',
                    className: 'modal',
                    content: [this.modalForm]
                }
            ]);

            this.modalForm.append(this.inputForm);
            this.modalForm.append(this.modalSubmit);
            this.modalForm.append(this.modalCancel);
            mainWrapper.append(modalBlock);

            this.inputForm.addEventListener('submit', e => {
                e.preventDefault();
                resolve(this.inputForm.value);
            } )
        });
    }
    
    open() {
    
    }
    
    promt() {
    
    }
    
    confirm() {
    
    }
    
    alert() {
    
    }
    
    close() {
    
    }
    
    addContent() {
    
    }
}

export default GetModal;
