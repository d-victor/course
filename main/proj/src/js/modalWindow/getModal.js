import getHtmlElement from "../anketa/lib/getHtmlElement";
import defaultOptions from "./lib/defaultOptions";
import getTemplate from './lib/getTemplate';

class GetModal {
    constructor(options = {}) {
        this.options = {
            ...defaultOptions,
            ...options
        };
        
        getTemplate.apply(this);
    }
    
    open() {
        return new Promise((resolve, reject) => {
        
        resolve(data);
        
        
        })
    }
    
    promt(content = [], changeContentStatus = false) {
        if (changeContentStatus) {
            this.modalContent.innerHTML = '';
            
            content.map((elem)=> {
                elem = getHtmlElement(elem);
                this.modalContent.append(elem);
        
                return elem;
            });
        }
        
        return new Promise((resolve, reject) => {
            this.modal.classList.add('open');
            this._btnOk.addEventListener('click', () => {
                const data = {};
                let validateStatus = true;
                const inputList = [...this.modalContent.querySelectorAll('input')];
                
                inputList.forEach(elem => {
                    if (elem.required && elem.value === '') {
                        validateStatus = false;
                        elem.classList.add('error');
                    } else {
                        elem.classList.remove('error');
                    }
    
                    data[elem.name] = (elem.getAttribute('type') === 'checkbox' || elem.getAttribute('type') === 'radio') ? elem.checked : elem.value;
                });
                
                if (validateStatus) {
                    resolve(data);
                    this.close();
                }
            });
            
        });
    }
    
    confirm() {
    
    }
    
    alert() {
    
    }
    
    close() {
        this.modal.classList.remove('open');
    }
    
    addContent() {
    
    }
}

export default GetModal;
