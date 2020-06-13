(function () {
    var promotionOptions = {
        timers: {
            day: {
                value: 0,
                text: ['день', 'дня', 'дней'],
            },
            hours: {
                value: 0,
                text: ['час','часа','часов'],
                max: 23,
            },
            minutes: {
                value: 0,
                text: ['минута','минуты','минут'],
                max: 59,
            },
            seconds: {
                value:0,
                text: ['секунда','секунды','секунд'],
                max: 59,
            }
        },
        status: false,
    };

    
    
    function promotionTimer(date, wrapper, animationElem, maxDay) {
        // console.log(animationElem);
        var endTime = setDate(date);
        
        if (!endTime) return false;

        if(animationElem){
            promotionOptions.animateTag = renderToHtml(animationElem);
            promotionOptions.animateLength = promotionOptions.animateTag.firstElementChild.getTotalLength();

            if(maxDay) promotionOptions.timers.day.max = maxDay;
        }


        

        console.log(promotionOptions.animateTag);
        var promotionEndDate = new Date(endTime[0], endTime[1] || 0, endTime[2] || 0, endTime[3] || 0, endTime[4] || 0, endTime[5] || 0);
        promotionOptions.promoEndTime = ~~(promotionEndDate.getTime() / 1000);
        setDiffTime();
        
        // console.log(date, wrapper, endTime, promotionEndDate, promoEndTime, nowTime, diff,
        //     promotionOptions.timers.day, promotionOptions.timers.hours,
        //     promotionOptions.timers.minutes, promotionOptions.timers.seconds);
        buildToHtmlTimer(wrapper, animationElem);
        promotionOptions.status = true;
        promotionOptions.intervalId = setInterval(timer, 1000);
    }

    function setDiffTime(){
        var nowTime = ~~(new Date().getTime() / 1000);
        var diff = promotionOptions.promoEndTime - nowTime;
        promotionOptions.timers.day.value = ~~(diff / 86400);
        promotionOptions.timers.hours.value = ~~((diff / 60 / 60) % 24);
        promotionOptions.timers.minutes.value = ~~((diff / 60) % 60);
        promotionOptions.timers.seconds.value = ~~(diff % 60);
    }

    function renderToHtml(stringHtml){
        var elem = document.createElement('div');
        elem.innerHTML = stringHtml;
        return elem.firstElementChild;
    }

    function getDiameter(key){
        return promotionOptions.animateLength - (promotionOptions.animateLength / promotionOptions.timers[key].max * promotionOptions.timers[key].value);
    }

    function timer(){
        setDiffTime();
        promotionOptions.timers.seconds.elem.firstElementChild.textContent = getNumberToString('seconds');
        promotionOptions.timers.seconds.elem.querySelector('.label').textContent = declOfNum(promotionOptions.timers['seconds'].value, promotionOptions.timers['seconds'].text);
        if(promotionOptions.animateTag) setSvgDiameter('seconds');
        if(promotionOptions.timers.seconds.value === 59){
            promotionOptions.timers.minutes.elem.firstElementChild.textContent = getNumberToString('minutes');
        promotionOptions.timers.minutes.elem.querySelector('.label').textContent = declOfNum(promotionOptions.timers['minutes'].value, promotionOptions.timers['minutes'].text);
        if(promotionOptions.animateTag) setSvgDiameter('minutes');
    }
        if(promotionOptions.timers.seconds.value === 59 && promotionOptions.timers.minutes.value === 59){
            promotionOptions.timers.hours.elem.firstElementChild.textContent = getNumberToString('hours');
        promotionOptions.timers.hours.elem.querySelector('.label').textContent = declOfNum(promotionOptions.timers['hours'].value, promotionOptions.timers['hours'].text);
        if(promotionOptions.animateTag) setSvgDiameter('hours');
        }
        promotionOptions.timers.day.elem.firstElementChild.textContent = getNumberToString('day');
        promotionOptions.timers.day.elem.querySelector('.label').textContent = declOfNum(promotionOptions.timers['day'].value, promotionOptions.timers['day'].text);
        if(promotionOptions.animateTag) setSvgDiameter('day');
        // console.log('23');
    }
    
    function getNumberToString(key){
        return (promotionOptions.timers[key].value < 10) ? '0'+ promotionOptions.timers[key].value : promotionOptions.timers[key].value;
    }

    function buildToHtmlTimer(wrapper, animationSvg) {
        console.log(animationSvg);
        var wrap = createHtmlElem({
            elem:'ul'
        });
        for (var key in promotionOptions.timers){
          promotionOptions.timers[key].elem = createHtmlElem({
                elem: 'li',
                attr: {
                    class: key,
                    'data-timer': key
                }
            });
            promotionOptions.timers[key].elem.append(createHtmlElem({
                elem: 'span',
                text: getNumberToString(key)
            }));
                
            promotionOptions.timers[key].elem.append(createHtmlElem({
                elem: 'span',
                attr: {
                    class: 'label',
                },
                text: declOfNum(promotionOptions.timers[key].value, promotionOptions.timers[key].text),
            }));
            if(promotionOptions.animateTag){
                promotionOptions.timers[key].animateElem = promotionOptions.animateTag.cloneNode(true);
                setSvgDiameter(key);
                // promotionOptions.timers[key].animateLength = getDiameter(key);
                // promotionOptions.timers[key].animateElem.setAttribute('style', 'stroke-dashoffset:' + promotionOptions.timers[key].animateLength);
                // console.log(promotionOptions.timers[key].animateElem.firstElementChild.getTotalLength());
                promotionOptions.timers[key].elem.append(promotionOptions.timers[key].animateElem);
            }
            wrap.append(promotionOptions.timers[key].elem);
        }
        wrapper.append(wrap);
    }

    function setSvgDiameter(key){
        promotionOptions.timers[key].animateLength = getDiameter(key);
        promotionOptions.timers[key].animateElem.setAttribute('style', 'stroke-dashoffset:' + promotionOptions.timers[key].animateLength);
                
    }
    
    // function getDayText(keyTimers) {
    //     var timerItem = promotionOptions.timers[keyTimers].value;
    //     var textItem = promotionOptions.timers[keyTimers].text;
    //     // console.log(timerItem, textItem);
    //     timerItem = Math.abs(timerItem)%100;
    //     var num1 = timerItem%10;
    //     if(timerItem > 10 && timerItem < 20) return textItem[2];
    //     if(num1 > 1 && num1 < 5) return textItem[1];
    //     if(num1 == 1) return textItem[0];
    //     return textItem[2];
    // }
    
    function createHtmlElem(options) {
        var elem = document.createElement(options.elem);
        
        if (options.attr) {
            for (var key in options.attr){
                elem.setAttribute(key, options.attr[key]);
            }
        }
        
        if (options.text !== undefined) elem.textContent = options.text;
        
        return elem;
    }

    function declOfNum(n, title){
        return title[(n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)];
    }
    
    function setDate(date){
        var status = (date !== '' && typeof date === 'string');
        
        if (!status) return status;
        
        var endTime = date.split('-').map(function (item, i) {
            var num = (i === 1 || i === 3) ? item - 1 : +item;
            status = !isNaN(num);
            return num;
        });
    
        return status ? endTime : status;
    }
    
    window.promotionTimer = promotionTimer;
    window.promotionOptions = promotionOptions;
})();