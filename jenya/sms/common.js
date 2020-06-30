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
                // userName: options.wrapper.querySelector('#userName'),
                // userEmail: options.wrapper.querySelector('#userEmail'),
                icons: {
                    wrapper: options.wrapper.querySelectorAll('.form-icon li'),
                    iconLists: {}
                }
            };
            
            this.options.textarea.addEventListener('input', inputText.bind(this));
            
            this.options.icons.wrapper.forEach(function (icon) {
                this.options.icons.iconLists[keyReplace(icon.dataset.icon)] = icon.querySelector('i').classList.value;
                
                icon.addEventListener('click', function (e) {
                    insertTextAtCursor(this.options.textarea, ' ::' + keyReplace(e.currentTarget.dataset.icon) + ':: ', 0);
                    this.options.textarea.dispatchEvent(inputEvent);
                }.bind(this));
            }, this);
        
            this.options.addMsgBtn.addEventListener('click', function () {
                addMessage.call(this, setText.call(this, this.options.textarea.value));
            }.bind(this));
            
            function setLoadingMessages() {
                var dataMessages = JSON.parse(getLocalStorage('chat'));
                dataMessages.forEach(function (message) {
                    addMessage.call(this, message.message, message.date);
                }, this);
                
            }
            setLoadingMessages.call(this);
            
            function nl2br(text, isXhtml) {
                var br = isXhtml ? '<br/>' : '<br>';
                return text.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + br +'$2');
            }
            
            function insertTextAtCursor(el, text, offset) {
                var val = el.value,
                    endIndex = el.selectionEnd;
                
                offset = offset || 0;
                
                el.value = val.slice(0, endIndex) + text + val.slice(endIndex);
                el.selectionStart = el.selectionEnd = endIndex + text.length + offset;
                el.focus();
            }
            
            function addMessage(message, dateMessage, inputsValue) {
                var newMessageWrapper = document.createElement('div'),
                    headerWrap = document.createElement('div'),
                    contentWrap = document.createElement('div'),
                    footerWrap = document.createElement('div'),
                    // user = this.options.userName.value,
                    // email = this.options.userEmail.value,
                    year, time;
                if (!dateMessage) {
                    year = getDate().year;
                    time = getDate().time;
                    cleanForm.call(this);
                    setLocalStorage({
                        message: message,
                        date: {
                            year: year,
                            time: time
                        }
                    });
                } else {
                    year = dateMessage.year;
                    time = dateMessage.time;
                }

                getInputData();
                console.log(getInputData());

                headerWrap.classList.add('header_item');
                contentWrap.classList.add('content_item');
                footerWrap.classList.add('footer_item');
                footerWrap.textContent = year + 'year Time: ' + time;
                // headerWrap.textContent = 'username: ' + user + ' ' + ' email: ' + email;
        
                newMessageWrapper.classList.add('item-message');
        
                contentWrap.innerHTML = message;
                
                newMessageWrapper.append(headerWrap);
                newMessageWrapper.append(contentWrap);
                newMessageWrapper.append(footerWrap);
        
                this.options.formMessages.append(newMessageWrapper);
            }
            
            function cleanForm() {
                this.options.textarea.value = '';
                this.options.formText.innerHTML = '';
                // this.options.userName.value = '';
                // this.options.userEmail.value = '';
            }
            
            function setLocalStorage(dataSaved) {
                var key = 'chat',
                    dataChat = JSON.parse(getLocalStorage(key)),
                    addArray = [];
                
                if (dataChat){
                    dataChat.forEach(function (objMessage) {
                        addArray.push(objMessage);
                    })
                }
                
                addArray.push(dataSaved);
                localStorage.setItem(key, JSON.stringify(addArray));
            }
            
            function getLocalStorage(key) {
                return localStorage.getItem(key)
            }
            
            function keyReplace(key){
                return key.replace(/[:]/g, '');
            }
            
            function inputText(e) {
                var text = nl2br(e.currentTarget.value, false);
                text = setText.call(this, text);
                textPerv.call(this, text);
            }
            
            function textPerv(text) {
                this.options.formText.innerHTML = text;
            }
            
            function getDate() {
                var date = new Date(),
                    optionsYear = {
                        year: 'numeric',
                        month:'numeric',
                        day:'numeric'
                    },
                    optionsTime = {
                        hour:'numeric',
                        minute:'numeric',
                        second:'numeric'
                    };
                
                return {
                    year: date.toLocaleString('ru-RU', optionsYear),
                    time: date.toLocaleString('ru-RU', optionsTime)
                }
            }
// -------------
            function getInputData(){
                optionsInput = {
                    user: options.wrapper.querySelector('#userName').value,
                    email: options.wrapper.querySelector('#userEmail').value
                };
                // console.log(optionsInput);
                return {
                    user: optionsInput.toLocaleString('ru-RU', optionsInput),
                    email: optionsInput.toLocaleString('ru-RU', optionsInput)
                }
            }
// -------------------
            
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