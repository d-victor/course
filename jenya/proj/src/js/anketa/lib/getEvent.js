function getEvent(target, event, handler) {
    target.addEventListener(event, handler);
}

export default getEvent;