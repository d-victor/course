(function () {
function RatingCounter(options) {
    options = options || {};
    if (!options.wrapper) return false;
    
    this.options = {
        counter: +getCookie('counter') || 0,
        wrapper: options.wrapper,
        maxDurationActive: options.maxDurationActive || 10,
        resetHartColor: resetHartColor.bind(this),
        setHartColor: setHartColor
    };
    
    this.setCounterHtml = function () {
        this.options.wrapper.querySelector('span').textContent = this.options.counter;
    };
    
    this.setCounter = function () {
        this.options.counter++;
    };
    
    this.setCookieCounter = function () {
        setCookie('counter', this.options.counter);
        setCookie('isCounter', '1', {'max-age': this.options.maxDurationActive});
    };
    
    this.setCounterHtml();
    
    this.options.wrapper.addEventListener('click', function (event) {
        if (event.target === event.currentTarget) {
            // example
        }
        if (!getCookie('isCounter')){
            this.setCounter();
            this.setCookieCounter();
            
            resetHartColor.call(this);
            
            this.setCounterHtml();
            setHartColor(this.options.wrapper.querySelector('.fa-heart'), 'far', 'fas');
            
        } else {
            alert("Вы уже голосовали!!");
        }
    }.bind(this));
    
    function resetHartColor() {
        setTimeout(function () {
            setHartColor(this.options.wrapper.querySelector('.fa-heart'), 'fas', 'far')
        }.bind(this), this.options.maxDurationActive * 1000);
    }
    
    function setHartColor(elem, removedClass, addedClass) {
        var elemClassList = elem.classList;
        elemClassList.remove(removedClass);
        elemClassList.add(addedClass);
    }
}
window.RatingCounter = RatingCounter;
    
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    
    function setCookie(name, value, options) {
        options = options || {};
        
        var expires = options.expires;
        
        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }
        
        value = encodeURIComponent(value);
        
        var updatedCookie = name + "=" + value;
        
        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        
        document.cookie = updatedCookie;
    }
    
    function deleteCookie(name) {
        setCookie(name, "", {
            'max-age': -1
        })
    }
})();


(function () {
    function ChatMessager(options) {
        options = options || {};
        if (!options.wrapper) {
            console.error('Error');
            return false;
        }
        
        var inputEvent = new Event('input');
        
        this.options = {
            wrapper: options.wrapper,
            textarea: options.wrapper.querySelector('textarea'),
            addMsgBtn:options.wrapper.querySelector('#addMsg'),
            formText: options.wrapper.querySelector('.form-text'),
            formMessages: options.wrapper.querySelector('.form-messages'),
            icons: {
                wrapper: options.wrapper.querySelectorAll('.form-icon li'),
                iconLists: {}
            }
        };
        
        this.options.textarea.addEventListener('input', inputText.bind(this));
        
        this.options.icons.wrapper.forEach(function (icon) {
            this.options.icons.iconLists[keyReplace(icon.dataset.icon)] = icon.querySelector('i').classList.value;
            
            icon.addEventListener('click', function (e) {
                this.options.textarea.value += ' ::' + keyReplace(e.currentTarget.dataset.icon) + ':: ';
                this.options.textarea.dispatchEvent(inputEvent);
            }.bind(this));
        }, this);
    
        this.options.addMsgBtn.addEventListener('click', addMessage.bind(this));
        
        function addMessage() {
            this.options.textarea.value = '';
            var message = this.options.formText.innerHTML,
                newMessageWrapper = document.createElement('div');
            
            newMessageWrapper.classList.add('item-message');
            
            newMessageWrapper.innerHTML = message;
            this.options.formMessages.append(newMessageWrapper);
            this.options.formText.innerHTML = '';
        }
        
        function keyReplace(key){
            return key.replace(/[:]/g, '');
        }
        
        function inputText(e) {
            var text = e.currentTarget.value;
            textPerv.call(this, text);
        }
        
        function textPerv(text) {
            this.options.formText.innerHTML = setText.call(this, text);
        }
        
        function setText(text) {
            var list = this.options.icons.iconLists;
            for (var key in list) {
                text = text.replace(new RegExp("::" + key + "::", 'g'), '<i class="' + list[key] + '"></i>');
            }
            return text;
        }
    }
    
    window.ChatMessager = ChatMessager;
})();
