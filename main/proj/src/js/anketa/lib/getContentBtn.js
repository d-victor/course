import getHtmlElement from "./getHtmlElement";
import getEvent from "./getEvent";
import hidden from "./hidden";

function getContentBtn(parent) {
    const addContent = getHtmlElement({
        elem: 'button',
        className: 'addContent',
        attr: {
            type:'button'
        },
        content: 'Add content'
    });
    
    const saveElem = getHtmlElement({
        elem: 'button',
        className: 'saveElem',
        attr: {
            type:'button'
        },
        content: 'Save'
    });
    
    hidden(saveElem);
    
    getEvent(addContent, 'click', this.addContent.bind(this));
    getEvent(saveElem, 'click', this.saveActiveItem.bind(this));
    
    parent.append(addContent, saveElem);
}

export default getContentBtn;
