import getDragBtn from "./lib/getDragBtn";
import getSizeElem from "./lib/getSizeElem";
import getCoords from "./lib/getCoords";
import getEvent from "./lib/getEvent";

class Drag {
    constructor(options = {}) {
        if (!options.wrapper) return;
        
        this.options = {
            dragBtnClass: 'drag-btn',
            dragClass: 'drag-wrapper',
            dragInitClass: 'drag-init',
            dragItemActiveWrapper: 'drag-active-wrapper',
            dragOn: 'drag-active',
            ...options,
        };
        
        this.dragList = [...this.options.wrapper.children];
        
        this.dragElem = null;
        
        this.init();
    }
    
    init() {
        this.indexDragList = [];
        
        this.dragList.forEach((itemDrag, index) => {
            const dragBtn = getDragBtn.call(this);
            
            this.indexDragList.push(index);
            
            itemDrag.dataset.dragId = index;
            itemDrag.append(dragBtn)
        });
    }
    
    _goDrag(e) {
        const op = this.options;
        const dragElem = e.currentTarget.parentElement;
        const styleDropElem = getComputedStyle(dragElem);
        const {width, height} = getSizeElem(dragElem);
        const {top, left} = getCoords(dragElem);
        const pageY = e.pageY;
        const pageX = e.pageX;
        const displayDrop = styleDropElem.display;
        
        this.dragElem = dragElem.cloneNode(true);
        
        if (styleDropElem.margin) {
            this.dragElem.style.margin = '0';
        }
        
        this.dragElem.style.width = `${width}px`;
        this.dragElem.style.height = `${height}px`;
        this.dragElem.style.top = `${top}px`;
        this.dragElem.style.left = `${left}px`;
        
        this.dragElem.classList.add(op.dragOn);
        dragElem.classList.add(op.dragItemActiveWrapper);
        
        document.body.append(this.dragElem);
        
        const goDragging = (e) => {
            console.log(top);
            this.dragElem.style.top = `${top - (pageY - e.pageY)}px`;
            
            this.dragElem.style.display = 'none';
            console.log(document.elementFromPoint(pageX, e.pageY));
            const isDragElem = '';
            this.dragElem.style.display = displayDrop;
            
        };
        
        const onMouseUp = () => {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', goDragging);
            this.dragElem.remove();
            
            dragElem.classList.remove(op.dragItemActiveWrapper);
        };
        
        getEvent(document, 'mouseup', onMouseUp);
        getEvent(document, 'mousemove', goDragging)
        
    }
}

export default Drag;
