import getDragBtn from "./lib/getDragBtn";

class Drag {
    constructor(options = {}) {console.log('sdfasdf')
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
    
    _goDrag() {
    
    }
}

export default Drag;
