import getHtmlElement from "../../anketa/lib/getHtmlElement";

function getTemplate() {
    const op = this.options;
    
    const btnClose = getHtmlElement({
        elem: 'button',
        className: 'close-btn',
        attr: {
            type: 'button'
        },
        content: 'Close'
    });
    
    btnClose.addEventListener('click', this.close.bind(this));
    
    this.modalHeader = getHtmlElement({
        elem: 'div',
        className: 'modal-header',
        content: btnClose
    });
    
    this.modalContent = getHtmlElement({
        elem: 'div',
        className: 'modal-content',
    });
    
    this._btnOk = getHtmlElement({
        elem: 'button',
        className: 'modal-ok',
        attr: {
            type: 'button'
        },
        content: 'Ok'
    });
    
    const footer = getHtmlElement({
        elem: 'div',
        className: 'modal-footer',
        content: this._btnOk
    });
    
    const overlay = getHtmlElement({
        elem: 'div',
        className: 'modal-overlay'
    });
    
    const modal = getHtmlElement({
        elem: 'div',
        className: 'modal',
        content: [this.modalHeader, this.modalContent, footer]
    });
    
    this.modal = getHtmlElement({
        elem: 'div',
        className: 'modal-wrapper',
        content: [modal, overlay]
    });
    
    op.wrapper.append(this.modal);
}

export default getTemplate;
