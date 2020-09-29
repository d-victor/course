class PrivateSlider {
    constructor(slider) {
        this._slider = slider;
    };
    
    setOptions() {
        const slider = this.getSlider();
        
        slider.createStatus = false;
        slider.event = {};
        slider.activeSlide = slider.options.activeSlide;
        slider.countSlide = slider.options.wrapper.children.length;
        slider.autoPlyaId = null;
        slider.destroyed = false;
        slider.slidesToShow = slider.options.slidesToShow;
        slider.slidesToScroll = slider.options.slidesToScroll;
    };
    
    getOptions() {
        return this._slider.options;
    }
    
    getSlider() {
        return this._slider;
    }
    
    createSlider() {
        const options = this.getOptions();
        
        this.addClass.apply(options.wrapper, [options.defaultClass, options.customSliderClass]);
        
        this.setSliderList();
        
        this.setOffsetSlide();
        
        this.setTemplate();
    
        this.addClass.apply(options.wrapper, [options.initSlider]);
    }
    
    setTemplate() {
        const options = this.getOptions();
        
        const sliderListWrapper = document.createElement('div');
        this.addClass.apply(sliderListWrapper, [options.sliderListClass]);
        
        this.setSliderTrack();
        
        this.setTrackWidth();
        
        
        
        this.buildSlider();
        
        sliderListWrapper.append(this._slider.sliderTrack);
        options.wrapper.append(sliderListWrapper);
    }
    
    buildSlider() {
        const options = this.getOptions();
        const sliderList = this._slider.sliderList;
        const sliderTrack = this._slider.sliderTrack;
        
        sliderList.forEach((slideItem, i) => {
            slideItem.style.width = `${this._slider.offsetSlide}px`;
            slideItem.dataset.slideIndex = i;
            sliderTrack.append(slideItem);
        });
        
        if (!options.infinity) {
        
        }
        
    }
    
    setSliderTrack() {
        const options = this.getOptions();
        
        this._slider.sliderTrack = document.createElement('div');
        this.addClass.apply(this._slider.sliderTrack, [options.sliderTrackClass]);
    }
    
    setTrackWidth() {
        const options = this.getOptions();
        
        let width = (this._slider.offsetSlide * this._slider.countSlide);
        
        options.infinity && (width += this._slider.offsetSlide * this._slider.slidesToShow * 2);
        
        this._slider.trackWidth = width;
        
        this._slider.sliderTrack.style.width = `${width}px`;
    }
    
    setOffsetSlide() {
        const options = this.getOptions();
        
        this._slider.offsetSlide = +(options.wrapper.offsetWidth / this._slider.slidesToShow).toFixed(1);
    }
    
    setSliderList() {
        const options = this.getOptions();
    
        this._slider.sliderList = [...options.wrapper.children].map(slide => {
            const newSlide = slide.cloneNode(true);
            slide.remove();
            return newSlide;
        });
    }
    
    addClass() {
        [...arguments].forEach(itemClass => {
            if (itemClass) {
                itemClass = itemClass.split(' ');
                
                this.classList.add(...itemClass);
            }
        })
    }
    
    
}

export default PrivateSlider;
