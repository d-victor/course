import Slider from "./slider/slider";

var firstSlider = new Slider({
    wrapper: document.querySelector('.slider'),
    sliderClass: 'dd dfe dsvf',
    arrowsClass: 'my-arrow',
    dotsClass: 'my-dots',
    dotsSize: '30x30',
    slidesToShow: 2,
    slidesToScroll: 1,
    infinity: true,
    dotsImageView: false,
    autoPlay: false,
    autoPlayDelay: 10,
    draggable: true,
    afterChange: function (oldSlide, newSlide) {
        console.log(arguments, 'afterChange');
    },
    beforeChange: function (oldSlide, newSlide) {
        console.log(arguments, 'beforeChange');
    },
    onArrow: function (direction, slider, e) {
    
    },
    
});

/*
const del = document.querySelector('.delete');
const reInit = document.querySelector('.re-init');

reInit.addEventListener('click', ()=>{
    firstSlider.reInit();
});

del.addEventListener('click', ()=>{
    firstSlider.destroy();
});
*/

