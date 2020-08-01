function getParentWithAttr(elem, attr) {
    const parent = elem.parentNode;
    
    if (parent.getAttribute(attr) === null && parent.tagName.toLowerCase() !== 'body') getParentWithAttr(parent, attr);
    else if (parent.tagName.toLowerCase() === 'body') return false;
    
    return parent;
}

export default getParentWithAttr;
