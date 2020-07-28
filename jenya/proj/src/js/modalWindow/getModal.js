import getHtmlElement from "../anketa/lib/getHtmlElement";
import getRow from "../anketa/lib/getRow";
import defaultOptions from "./lib/defaultOptions";
import getTemplate from "./lib/getTemplate";


class GetModal {
    constructor(options = {}){
        this.options = {
            ...defaultOptions,
            ...options,
        };

        getTemplate.apply(this);
    }
    open() {
        
    }
    
    promt(content=[], changeContentStatus = false) {
        if(changeContentStatus){
            content = content.map((elem)=> {
                elem = getHtmlElement(elem);
                this.modalContent.append(elem);
                return elem;
            })
        }
        
        
        return new Promise((resolve, reject) => {
            this.modal.classList.add('open');
            this._btnOk.addEventListener('click', ()=>{
                const data = {}
                let validateStatus = true;
                this.content.forEach(elem => {
                    // elem.required, elem.getAttribute('name'), elem.getAttribute('value')
                    if(elem.required && elem.value === ''){
                        validateStatus = false;
                        elem.classList.add('error');
                    } else {
                        elem.classList.remove('error');
                    }

                    data[elem.name] = elem.value;
                });
                if(validateStatus){
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
        // console.log('close', this)
        this.modal.classList.remove('open');
        this.content = undefined;
    }
    
    addContent() {
    
    }

};






export default GetModal;