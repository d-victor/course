import getDragBtn from "./lib/getDragBtn";
import getSizeElem from "./lib/getSizeElem";
import getCoords from "./lib/getCoords";
import getEvent from "./lib/getEvent";
import changeItemToArray from "./lib/changeItemToArray";

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
        
        let newPageY = pageY;
        let oneIndex = +dragElem.dataset.id;
        let twoIndex;
        let direction;
        
        const goDragging = (e) => {
            direction = (newPageY - e.pageY) > 0;
            this.dragElem.style.top = `${top - (pageY - e.pageY)}px`;
            
            this.dragElem.style.display = 'none';
            let isDragElem = document.elementFromPoint(pageX, e.pageY);
            isDragElem = isDragElem ? isDragElem.closest('[data-drag-id]') : isDragElem;
            this.dragElem.style.display = displayDrop;
            console.log(isDragElem, direction);
            if (isDragElem && direction && isDragElem !== dragElem && isDragElem.dataset.id) {
                isDragElem.before(dragElem);
                twoIndex = +isDragElem.dataset.id;
                console.log(twoIndex)
            } else if (isDragElem && !direction && isDragElem !== dragElem && isDragElem.dataset.id) {
                isDragElem.after(dragElem);
                twoIndex = +isDragElem.dataset.id;
                
                console.log(twoIndex)
            }
            
            newPageY = e.pageY;
        };
        
        const onMouseUp = () => {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', goDragging);
            this.dragElem.remove();
    
            this.indexDragList = changeItemToArray(this.indexDragList, oneIndex, twoIndex, direction);
            
            dragElem.classList.remove(op.dragItemActiveWrapper);
            
            if (this.options.afterChange) this.options.afterChange(this);
        };
        
        getEvent(document, 'mouseup', onMouseUp);
        getEvent(document, 'mousemove', goDragging)
    }
}

export default Drag;
