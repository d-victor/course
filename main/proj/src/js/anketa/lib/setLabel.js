function setLabel(e) {
    const activeInputLabel = this.activeIntup.inputLabel;
    
    const spanLabel = activeInputLabel.content.find(item => item.elem === 'span');
    
    spanLabel.content = e.target.value;
    
    e.target.previousSibling.textContent = e.target.value;
    
    const inputLabelIndex = activeInputLabel.content.map(item => item.elem).indexOf('input');
    
    activeInputLabel.content.splice(inputLabelIndex, 1);
}

export default setLabel;
