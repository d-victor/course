function getHtmlElement(options) {
    const element = document.createElement(options.elem);
    
    for (let key in options.attr) {
        element.setAttribute(key, options.attr[key]);
    }
    
    options.className = options.className.split(' ');
    
    element.classList.add(...options.className);
   
    if (options.content && typeof options.content === 'string') {
        element.textContent = options.content;
    } else if (options.content !== undefined && typeof options.content !== 'string' && (options.content.nodeType === 1 || options.content.nodeType === 11)) {
        element.append(options.content);
    } else if (Array.isArray(options.content)) {
        options.content.forEach((elem)=>{
            element.append(elem)
        });
    }
    
    return element;
}

export default getHtmlElement;
