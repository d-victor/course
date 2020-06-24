(function (){
    function LikeCounter(options){ 
        // console.log(options);
        options = options || {};
        if(!options.wrapper){
            return false;
        }

        this.options = {
            wrapper: options.wrapper,
            count: +getCookie('like') || 0,
        }

        // console.log(this.options);
        this.setCountSpan = function(){
            this.options.wrapper.querySelector('span').textContent = this.options.count;
        };

        (function (){
            this.setCountSpan();
            this.options.wrapper.addEventListener('click', function(e){
                this.likeCounting(e);
            }.bind(this));
        }).call(this);

        this.likeCounting = function (e){
            console.log(this, e.target);
            this.options.count++;
            this.setCountSpan();
        }
    }
    window.LikeCounter = LikeCounter;
    
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

    
    