class MySuperSlider {
    constructor(options = {}) {
        this.options = {
            wrapper: options.wrapper,
        };
        //this.sliderCount = options.wrapper.children.length;
        this.addSlide();
        
        const fgdsfg = () => 2+2;
        
        this.addClass(['b', 'c', 'a'], {
            name:"dsfs",
            age:124
        })
    }
    
    addClass(arg, obj) {
        const {name, age} = obj;
        console.log(name, age)
        document.querySelector('body').classList.add(...arg)
    };
    
    addSlide() {
        console.log('aaa')
    }
    
    _go() {
        console.log()
    }
    
}

export default MySuperSlider;
