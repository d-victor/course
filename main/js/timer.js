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
        }
    };
    
    function promotionTimer(date, wrapper) {
        var endTime = setDate(date);
        
        if (!endTime) return false;
        
        var promotionEndDate = new Date(endTime[0], endTime[1] || 0, endTime[2] || 0, endTime[3] || 0, endTime[4] || 0, endTime[5] || 0);
        var promoEndTime = ~~(promotionEndDate.getTime() / 1000);
        var nowTime = ~~(new Date().getTime() / 1000);
        var diff = promoEndTime - nowTime;
        promotionOptions.timers.day.value = ~~(diff / 86400);
        promotionOptions.timers.hours.value = ~~((diff / 60 / 60) % 24);
        promotionOptions.timers.minutes.value = ~~((diff / 60) % 60);
        promotionOptions.timers.seconds.value = ~~(diff % 60);
        
        console.log(date, wrapper, endTime, promotionEndDate, promoEndTime, nowTime, diff,
            promotionOptions.timers.day, promotionOptions.timers.hours,
            promotionOptions.timers.minutes, promotionOptions.timers.seconds);
        buildToHtmlTimer(wrapper);
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
                text: promotionOptions.timers[key].value
            }));
            promotionOptions.timers[key].elem.append(createHtmlElem({
                elem: 'span',
                attr: {
                    class: 'label',
                },
                text: getDayText(key)
            }));
            wrap.append(promotionOptions.timers[key].elem);
        }
        wrapper.append(wrap);
    }
    
    function getDayText(keyTimers) {
        
        return 'правильный тект из массива'
    }
    
    function createHtmlElem(options) {
        var elem = document.createElement(options.elem);
        
        if (options.attr) {
            for (var key in options.attr){
                elem.setAttribute(key, options.attr[key]);
            }
        }
        
        if (options.text) elem.textContent = options.text;
        
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
    
    window.promotionTimer = promotionTimer;
})();

