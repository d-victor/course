function getHtmlElement(options) {
    const element = document.createElement(options.elem);
    
    for (let key in options.attr) {
        element.setAttribute(key, options.attr[key]);
    }
    
    const newArr = [];
    
    options.className = options.className.forEach((itemClass, i) => {
        itemClass.split(' ').map((className) => {
            newArr.push(className);
        });
    });
    
    if (options.content && typeof options.content === 'string') {
        element.textContent = options.content;
    }
    
    element.classList.add(...newArr);
    
    return element;
}

export default getHtmlElement;
