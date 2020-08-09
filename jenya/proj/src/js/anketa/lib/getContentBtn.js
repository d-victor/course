import getHtmlElement from "./getHtmlElement";
import getEvent from "./getEvent";

function getContentBtn() {
    const addContent = getHtmlElement({
        elem: 'button',
        className: 'addContent',
        attr: {
            type:'button'
        },
        content: 'Add content'
    });
    
    getEvent(addContent, 'click', this.addContent.bind(this));
    
    return addContent;
}

export default getContentBtn;