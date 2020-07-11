class MySuperSlider {
    constructor(options = {}) {
        this.options = {
            wrapper: options.wrapper,
        };
        //this.sliderCount = options.wrapper.children.length;
        this.addSlide();
    }
    
    addSlide() {
        console.log('aaa')
    }
}

export default MySuperSlider;
