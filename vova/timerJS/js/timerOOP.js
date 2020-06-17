function Timer(options) {

    this.options = {
        timers: {
            day: {
                value: 0,
                text: ['день', 'дня', 'дней'],
            },
            hours: {
                value: 0,
                text: ['час', 'часа', 'часов'],
                max: 23
            },
            minutes: {
                value: 0,
                text: ['минута', 'минуты', 'минут'],
                max: 59
            },
            seconds: {
                value: 0,
                text: ['секунда', 'секунды', 'секунд'],
                max: 59
            }
        }
    };

    this.destroy = function () {
        this.stopTimer();
        options.wrapper.innerHTML = '';
        resetValue.apply(this);
        this.options.endTime = 0;
    };

    this.stopTimer = function () {
        clearInterval(this.options.intervalId);
    };

    function resetValue() {
        for (var key in this.options.timers) {
            this.options.timers[key].value = 0;
        }
    }

    function callbackBefore(str) {
        console.log(str);
    }

    function callbackAfter(str) {
        console.log(str);
    }

    function callbackChangeMinutes(str) {
        console.log(str);
    }

    function callbackChangeHours(str) {
        console.log(str);
    }

    function callbackChangeDay(str) {
        console.log(str);
    }

    function init() {
        callbackBefore(options.callback.beforeStart("Before callback"));

        var endTime = setDate(options.date);

        if (!endTime) return false;

        this.options.endTime = ~~(new Date(endTime[0], endTime[1] || 0, endTime[2] || 0, endTime[3] || 0, endTime[4] || 0, endTime[5] || 0).getTime() / 1000);

        if (options.animateStringElem) {
            this.options.animateTag = renderToHtml(options.animateStringElem);
            this.options.animateLength = this.options.animateTag.firstElementChild.getTotalLength();

            if (options.maxDay) this.options.timers.day.max = options.maxDay;
        }

        setDiffTime.apply(this);

        buildToHtmlTimer.call(this, options.wrapper);

        this.options.intervalId = setInterval(timer.bind(this), 1000);

        callbackAfter(options.callback.afterStart("After callback"));
    }

    function renderToHtml(stringHtml) {
        var elem = document.createElement('div');
        elem.innerHTML = stringHtml;

        return elem.firstElementChild;
    }

    function timer() {
        if (setDiffTime.apply(this)) {
            this.options.timers.seconds.elem.firstElementChild.textContent = getNumberToString.call(this, 'seconds');
            this.options.timers.seconds.elem.querySelector('.label').textContent = declOfNum(this.options.timers['seconds'].value, this.options.timers['seconds'].text);
            if (this.options.animateTag) setSvgDiameter.call(this, 'seconds');

            if (this.options.timers.seconds.value === 59) {
                callbackChangeMinutes(options.callback.changeMinutes("Change minutes callback"));

                this.options.timers.minutes.elem.firstElementChild.textContent = getNumberToString.call(this, 'minutes');
                this.options.timers.minutes.elem.querySelector('.label').textContent = declOfNum(this.options.timers['minutes'].value, this.options.timers['minutes'].text);
                if (this.options.animateTag) setSvgDiameter.call(this, 'minutes');

            }
            if (this.options.timers.seconds.value === 59 && this.options.timers.minutes.value === 59) {
                callbackChangeHours(options.callback.changeHours("Change hours callback"));

                this.options.timers.hours.elem.firstElementChild.textContent = getNumberToString.call(this, 'hours');
                this.options.timers.hours.elem.querySelector('.label').textContent = declOfNum(this.options.timers['hours'].value, this.options.timers['hours'].text);
                if (this.options.animateTag) setSvgDiameter.call(this, 'hours');

                callbackChangeDay(options.callback.changeDay("Change day callback"));

                this.options.timers.day.elem.firstElementChild.textContent = getNumberToString.call(this, 'day');
                this.options.timers.day.elem.querySelector('.label').textContent = declOfNum(this.options.timers['day'].value, this.options.timers['day'].text);
                if (this.options.animateTag) setSvgDiameter.call(this, 'day');
            }
        }
    }

    function setDiffTime() {
        var nowTime = ~~(new Date().getTime() / 1000);
        var diff = this.options.endTime - nowTime;

        if (diff < 0) {
            this.stopTimer();
            return false;
        };

        this.options.timers.day.value = ~~(diff / 86400);
        this.options.timers.hours.value = ~~((diff / 60 / 60) % 24);
        this.options.timers.minutes.value = ~~((diff / 60) % 60);
        this.options.timers.seconds.value = ~~(diff % 60);

        return true;
    }

    function buildToHtmlTimer(wrapper) {
        var wrap = createHtmlElem({
            elem: 'ul'
        });
        for (var key in this.options.timers) {
            this.options.timers[key].elem = createHtmlElem({
                elem: 'li',
                attr: {
                    class: key,
                    'data-timer': key
                }
            });
            this.options.timers[key].elem.append(createHtmlElem({
                elem: 'span',
                text: getNumberToString.call(this, key),
            }));
            this.options.timers[key].elem.append(createHtmlElem({
                elem: 'span',
                attr: {
                    class: 'label',
                },
                text: declOfNum(this.options.timers[key].value, this.options.timers[key].text),
            }));
            if (this.options.animateTag) {
                this.options.timers[key].animateElem = this.options.animateTag.cloneNode(true);

                setSvgDiameter.call(this, key);

                this.options.timers[key].elem.append(this.options.timers[key].animateElem);
            }
            wrap.append(this.options.timers[key].elem);
        }
        wrapper.append(wrap);
    }

    function getNumberToString(key) {
        return (this.options.timers[key].value < 10) ? '0' + this.options.timers[key].value : this.options.timers[key].value;
    }

    function setSvgDiameter(key) {
        this.options.timers[key].animateLength = getDiameter.call(this, key);
        this.options.timers[key].animateElem.setAttribute('style', 'stroke-dashoffset:' + this.options.timers[key].animateLength);
    }

    function getDiameter(key) {
        return this.options.animateLength - (this.options.animateLength / this.options.timers[key].max * this.options.timers[key].value);
    }

    function createHtmlElem(options) {
        var elem = document.createElement(options.elem);

        if (options.attr) {
            for (var key in options.attr) {
                elem.setAttribute(key, options.attr[key]);
            }
        }

        if (options.text !== undefined) elem.textContent = options.text;

        return elem;
    }

    function setDate(date) {
        var status = (date !== '' && typeof date === 'string');

        if (!status) return status;

        var endTime = date.split('-').map(function (item, i) {
            var num = (i === 1 || i === 3) ? item - 1 : +item;
            status = !isNaN(num);
            return num;
        });

        return status ? endTime : status;
    }

    function declOfNum(n, title) {
        return title[(n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)];
    }

    init.apply(this);
}
