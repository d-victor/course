import defaultOptions from "./lib/defaults";
import PrivateSlider from "./lib/privateSlider";

class Slider {
    constructor(userOptions = {}) {
        if (!userOptions.wrapper) return;
        
        const customSliderClass = userOptions.sliderClass;
        const customArrowClass = userOptions.arrowsClass;
        const customDotClass = userOptions.dotsClass;
        
        if (userOptions.hasOwnProperty('sliderClass')) delete userOptions.sliderClass;
        if (userOptions.hasOwnProperty('arrowsClass')) delete userOptions.arrowsClass;
        if (userOptions.hasOwnProperty('dotsClass')) delete userOptions.dotsClass;
        
        
        this.options = {
            ...defaultOptions,
            ...userOptions,
            customSliderClass: customSliderClass,
            customArrowsClass: customArrowClass,
            customDotsClass: customDotClass,
        };
        
        this._privateSilder = new PrivateSlider(this);
        
        this._privateSilder.setOptions();
        
        this.options.autoInit && this.init();
    };
    
    
    init() {
        if (!this.createStatus && this.countSlide > this.slidesToShow) this._privateSilder.createSlider();
        console.log(this);
    }
}

export default Slider;
