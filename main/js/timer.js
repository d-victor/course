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
            },
            minutes: {
                value: 0,
                text: ['минута','минуты','минут'],
            },
            seconds: {
                value:0,
                text: ['секунда','секунды','секунд'],
            }
        },
        status: false,
    };
    
    function promotionTimer(date, wrapper, animationsElem) {
        var endTime = setDate(date);
        
        if (!endTime) return false;
        
        var promotionEndDate = new Date(endTime[0], endTime[1] || 0, endTime[2] || 0, endTime[3] || 0, endTime[4] || 0, endTime[5] || 0);
        promotionOptions.promoEndTime = ~~(promotionEndDate.getTime() / 1000);
        
        setDiffTime();
        
        buildToHtmlTimer(wrapper);
        promotionOptions.status = true;
        promotionOptions.intervalId = setInterval(timer, 1000);
    }
    
    function setDiffTime() {
        var nowTime = ~~(new Date().getTime() / 1000);
        var diff = promotionOptions.promoEndTime - nowTime;
        promotionOptions.timers.day.value = ~~(diff / 86400);
        promotionOptions.timers.hours.value = ~~((diff / 60 / 60) % 24);
        promotionOptions.timers.minutes.value = ~~((diff / 60) % 60);
        promotionOptions.timers.seconds.value = ~~(diff % 60);
    }
    
    function timer() {
        setDiffTime();
        promotionOptions.timers.seconds.elem.firstElementChild.textContent = getNumberToString('seconds');
        promotionOptions.timers.seconds.elem.lastElementChild.textContent = declOfNum(promotionOptions.timers['seconds'].value, promotionOptions.timers['seconds'].text);
        if (promotionOptions.timers.seconds.value === 59) {
            promotionOptions.timers.minutes.elem.firstElementChild.textContent = getNumberToString('minutes');
            promotionOptions.timers.minutes.elem.lastElementChild.textContent = declOfNum(promotionOptions.timers['minutes'].value, promotionOptions.timers['minutes'].text);
        }
        if (promotionOptions.timers.seconds.value === 59 && promotionOptions.timers.minutes.value === 59){
            promotionOptions.timers.hours.elem.firstElementChild.textContent = getNumberToString('hours');
            promotionOptions.timers.hours.elem.lastElementChild.textContent = declOfNum(promotionOptions.timers['hours'].value, promotionOptions.timers['hours'].text);
            promotionOptions.timers.day.elem.firstElementChild.textContent = getNumberToString('day');
            promotionOptions.timers.day.elem.lastElementChild.textContent = declOfNum(promotionOptions.timers['day'].value, promotionOptions.timers['day'].text);
        }
    }
    
    function getNumberToString(key) {
        return (promotionOptions.timers[key].value < 10) ? '0' + promotionOptions.timers[key].value : promotionOptions.timers[key].value;
    }
    
    function buildToHtmlTimer(wrapper) {
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
                text: getNumberToString(key),
            }));
            promotionOptions.timers[key].elem.append(createHtmlElem({
                elem: 'span',
                attr: {
                    class: 'label',
                },
                text: declOfNum(promotionOptions.timers[key].value, promotionOptions.timers[key].text),
            }));
            wrap.append(promotionOptions.timers[key].elem);
        }
        wrapper.append(wrap);
    }
    
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
    
    function declOfNum(n, title){
        return title[(n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)];
    }
    
    window.promotionTimer = promotionTimer;
    window.promotionOptions = promotionOptions;
})();

