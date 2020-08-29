import getHtmlElement from "./getHtmlElement";
import getEvent from "./getEvent";

function getDragBtn() {
    const dragBtn = getHtmlElement({
        elem: 'button',
        className: this.options.dragBtnClass,
        content: 'Drag',
    });
    
    getEvent(dragBtn, 'click', this._goDrag.bind(this));
    
    return dragBtn;
}

export default getDragBtn;
