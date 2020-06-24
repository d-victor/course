(function () {
    function RatingCounter(options) {
        options = options || {};
        if (!options.wrapper) return false;
        
        this.options = {
            counter: +getCookie('counter') || 0,
            wrapper: options.wrapper,
            maxDurationActive: options.maxDurationActive || 10
        };
        
        this.setCounterHtml = function () {
            this.options.wrapper.querySelector('span').textContent = this.options.counter;
        };
        
        this.setCounter = function () {
            // console.log(this, e.target)
            this.options.counter++;
            // console.log(this.options.counter);
            setCookie('counter', this.options.counter);
            setCookie('isCounter','1',{'max-age':this.options.maxDurationActive});
        };

        this.setCookieCounter = function(){
            setCookie('counter', this.options.counter);
            setCookie('isCounter','1',{'max-age':this.options.maxDurationActive});
        }

        this.setCounterHtml();

        this.options.wrapper.addEventListener('click', function (event) {
            // this.setCounter(e);
            console.log(getCookie('counter'));
            if(event.target === event.currentTarget){
                // example
            }
            if(!getCookie('isCounter')){
                // console.log('kbjchbdvkd');
                this.setCounter();
                this.setCookieCounter();
                resetHeartColor.call(this);
                this.setCounterHtml();
                setHeartColor(this.options.wrapper.querySelector('.fa-heart'), 'far', 'fas');
            } else {
                alert('You already vote');
            }
        }.bind(this));

            function resetHeartColor(){
                setTimeout(function(){
                    setHeartColor(this.options.wrapper.querySelector('.fa-heart'), 'fas', 'far');
                }.bind(this), this.options.maxDurationActive * 1000);
            }

            function setHeartColor(elem, removedClass, addedClass){ console.log(elem);
                var elemClassList = elem.classList;
                // console.log(arguments, elemClassList);
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
    
        if (!getCookie('test')){
                    console.log('jhbschsc');
                    setCookie('test', '1',{'max-age': 10});
                }
     
    })();
    (function (){
        function ChatMessager(options){
            // console.log("sbjchbsjchjshdbcscscjhsdgcvh");
            options = options || {}
            if(!options.wrapper) {
                // console.table(console);
                console.error('Error');
                return false;
            }

            var inputEvent = new Event('input');

            this.options = {
                wrapper: options.wrapper,
                textarea: options.wrapper.querySelector('textarea'),
                addBtn: options.wrapper.querySelector('#addMsg'),
                formText: options.wrapper.querySelector('.form-text'),
                formMessages: options.wrapper.querySelector('.form-messages'),
                userName: options.wrapper.querySelector('#userName'),
                userEmail: options.wrapper.querySelector('#userEmail'),
                icons: {
                    wrapper: options.wrapper.querySelectorAll('.form-icon li'),
                    iconLists: {}
                }
            }
            // console.log(this.options);
            this.options.textarea.addEventListener('input', inputText.bind(this));

            this.options.icons.wrapper.forEach( function(icon){
                // console.log(icon.dataset.icon.replace(/[:]/g, ''));
                this.options.icons.iconLists[keyReplace(icon.dataset.icon)] = icon.querySelector('i').classList.value;
                
                icon.addEventListener('click', function(e){
                    console.log(this, e.currentTarget, keyReplace(e.currentTarget.dataset.icon));
                    this.options.textarea.value += " ::" + keyReplace(e.currentTarget.dataset.icon) + ":: ";
                    this.options.textarea.dispatchEvent(inputEvent);
                }.bind(this));
            }, this);

            this.options.addBtn.addEventListener('click', addMessage.bind(this));

            function addMessage(){
                if(this.options.textarea.value === '') return false;
                this.options.textarea.value = '';
                this.options.userEmail.value = '';
                this.options.userName.value = '';
                // console.log(this.options.formText.innerHTML);
                var message = this.options.formText.innerHTML,
                    email = this.options.userEmail.value.innerHTML,
                    user = this.options.userName.value.innerHTML,
                    
                    // dateMessage = (new Date()).toString('dd.MM.yyyy');
                // console.log(dateMessage, message);
                    newMessageWrapper = document.createElement('div');
                    console.log(email, user);
                newMessageWrapper.classList.add('item-message');
                newMessageWrapper.innerHTML = message;
                this.options.formMessages.append(newMessageWrapper);
                // --------------------------------------------------------;
                var messageHeader = document.createElement('div');
                messageHeader.classList.add('message-header');
                messageHeader.innerHTML = user + ' ' + email;
                newMessageWrapper.append(messageHeader);
                // ----------------------
                this.options.formText.innerHTML = '';
            }

            function keyReplace(key){
                return key.replace(/[:]/g, '');
            }
            // console.log(this.options.icons.iconLists);

            function inputText(e){
                // console.log(e.currentTarget, this);
                var text = e.currentTarget.value;
                textPrev.call(this, text);
                // console.log(text);

            }

            function textPrev(text){
                this.options.formText.innerHTML = setText.call(this, text);
            }

            function setText(text){
                var list = this.options.icons.iconLists
                for(var key in list){
                    // console.log(list[key]);
                    text = text.replace(new RegExp("::" + key + "::", 'g'), '<i class="' + list[key] + '"></i>');
                }
                return text;
                // text.replace(new RegExp("::" + ))
            }

        }

        window.ChatMessager = ChatMessager;
    })();
    