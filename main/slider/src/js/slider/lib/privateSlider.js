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
        
        this.setTrackPosition();
        
        this.buildSlider();
        
        sliderListWrapper.append(this._slider.sliderTrack);
        options.wrapper.append(sliderListWrapper);
        
        options.arrowsView && this.setArrow();
        options.dotsView && this.setDots();
    }
    
    setDots() {
        const options = this.getOptions();
        let dotTemplate = options.dotsTemplate;
    
        if (typeof dotTemplate === 'string'){
            dotTemplate = this.getHtmlToString(dotTemplate);
        }
        
        this._slider.dotsWrapper = document.createElement('ul');
        
        this.addClass.apply(this._slider.dotsWrapper, [options.dotsClass, options.customDotsClass, (options.dotsImageView ? options.dotsImageClass : '')]);
        
        this.setDotsList(dotTemplate);
        console.log(dotTemplate, this._slider.dotsWrapper);
        
    }
    
    setDotsList(dotTemplate) {
        const options = this.getOptions();
        let dotLi;
        const dotsSize = this.getDotsSize(options.dotsSize);
        const countDots = this.getCountDots();
        
        this._slider.dotList = [];
        
        
        
    }
    
    getCountDots() {
        const options = this.getOptions();
        
        return options.dotsImageView ? this._slider.countSlide : Math.ceil(this._slider.countSlide / this._slider.slidesToShow);
    }
    
    getDotsSize(dotsSizeString) {
        dotsSizeString = dotsSizeString.replace(/[^\d]/g, 'x');
        dotsSizeString = dotsSizeString.split('x');
        
        if (Array.isArray(dotsSizeString)) return dotsSizeString;
    }
    
    setArrow() {
        const options = this.getOptions();
        let arrowTemplate = options.arrowsTemplate;
        
        if (typeof arrowTemplate === 'string'){
            arrowTemplate = this.getHtmlToString(arrowTemplate);
        }
        
        this.addClass.apply(arrowTemplate, [options.arrowsClass, options.customArrowsClass]);
        
        this._slider.arrowNext = arrowTemplate.cloneNode(true);
        this._slider.arrowPrev = arrowTemplate.cloneNode(true);
    
        this.addClass.apply(this._slider.arrowNext, ['next']);
        this.addClass.apply(this._slider.arrowPrev, ['prev']);
        
        options.wrapper.append(this._slider.arrowNext, this._slider.arrowPrev);
    }
    
    getHtmlToString(stringNode){
        const elem = document.createElement('div');
        elem.innerHTML = stringNode;
        return elem.firstChild;
    }
    
    setTrackPosition() {
        setTimeout(()=>{
            this._slider.sliderTrack.style.transform = `translate(${this.setTrackOffset()}px)`
        },0);
    }
    
    setTrackOffset() {
        const options = this.getOptions();
        let offset = -this._slider.offsetSlide;
        
        offset *= options.infinity ? (this._slider.activeSlide + this._slider.slidesToShow) : this._slider.activeSlide;
        
        return offset;
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
        
        if (!options.infinity) return;
        
        const cloneItemStart = sliderList.filter((slideItem, i) => {
            return i >= (this._slider.countSlide - this._slider.slidesToShow);
        }).map(sliderItem => sliderItem.cloneNode(true));
        
        const cloneItemEnd = sliderList.filter((slideItem, i) => {
            return i < this._slider.slidesToShow;
        }).map(sliderItem => sliderItem.cloneNode(true));
        
        cloneItemStart.reverse().forEach(itemSlide => {
            sliderTrack.prepend(itemSlide);
        });
        
        cloneItemEnd.forEach(itemSlide => {
            sliderTrack.append(itemSlide);
        });
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
