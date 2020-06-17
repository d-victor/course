(function () {
function RatingCounter(options) {
    options = options || {};
    if (!options.wrapper) return false;
    
    this.options = {
        counter: +getCookie('counter') || 0,
        wrapper: options.wrapper,
    };
    
    this.setCounterHtml = function () {
        this.options.wrapper.querySelector('span').textContent = this.options.counter;
    };
    
    (function () {
        this.setCounterHtml();
        this.options.wrapper.addEventListener('click', function (e) {
            this.setCounter(e);
        }.bind(this));
    }).call(this);
    
    this.setCounter = function (e) {
        console.log(this, e.target)
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
