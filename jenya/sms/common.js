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
                userName: options.wrapper.querySelector('#userName'),
                userEmail: options.wrapper.querySelector('#userEmail'),
                icons: {
                    wrapper: options.wrapper.querySelectorAll('.form-icon li'),
                    iconLists: {}
                },
                countMessages: 0
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

            window.addEventListener('click', function (e){
                console.log(e);
            })
            
            function setLoadingMessages() {
                var dataMessages = JSON.parse(getLocalStorage('chat'));
                console.log(dataMessages);
                if(dataMessages && dataMessages.length > 0){
                    dataMessages.forEach(function (message) {
                        addMessage.call(this, message);
                    }, this);
                }
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

            function deleteMessages(e){
                var idMessage = e.currentTarget.dataset.btnId;
                console.log(this.options.formMessages.querySelector('[data-id="' + idMessage + '"]'));
                this.options.formMessages.querySelector('[data-id="' + idMessage + '"]').remove();
                deleteLocalStorage(idMessage);
            }

            function deleteLocalStorage(id){
                var dataChat = JSON.parse(getLocalStorage('chat'));
                // console.log(dataChat);
                dataChat = dataChat.filter(function(message){
                    return message.id !== +id;
                });

                saveLocalStorage('chat' ,dataChat);
                // console.log(dataChat);

            }
            
            function addMessage(message) {
                var newMessageWrapper = document.createElement('div'),
                    headerWrap = document.createElement('div'),
                    contentWrap = document.createElement('div'),
                    footerWrap = document.createElement('div'),
                    // user = this.options.userName.value,
                    // email = this.options.userEmail.value,
                    btnDelete = document.createElement('button'),
                    year, time, userName, userEmail;

                    var idMessage = ++this.options.countMessages;

                    btnDelete.classList.add('delete-btn');
                    btnDelete.addEventListener('click' , deleteMessages.bind(this));
                    btnDelete.textContent = 'delete message';
                    btnDelete.dataset.btnId = typeof message === 'string' ? idMessage : message.id;

                if (typeof message === 'string') {
                    year = getDate().year;
                    time = getDate().time;
                    userName = this.options.userName.value;
                    userEmail = this.options.userEmail.value;
                    cleanForm.call(this);
                    setLocalStorage({
                        id: idMessage,
                        message: message,
                        user: {
                            name: userName,
                            email: userEmail
                        },
                        date: {
                            year: year,
                            time: time
                        }
                    });
                } else {
                    year = message.date.year;
                    time = message.date.time;
                    userName = message.user.name;
                    userEmail = message.user.email;
                }

                // getInputData();
                // console.log(getInputData());

                headerWrap.classList.add('header_item');
                contentWrap.classList.add('content_item');
                footerWrap.classList.add('footer_item');
                footerWrap.textContent = year + 'year Time: ' + time;
                headerWrap.textContent = 'username: ' + userName + ' ' + ' email: ' + userEmail;
        
                newMessageWrapper.classList.add('item-message');
                newMessageWrapper.dataset.id = typeof message === 'string' ? idMessage : message.id;
        
                contentWrap.innerHTML = typeof message === 'string' ? message : message.message;
                
                newMessageWrapper.append(headerWrap);
                newMessageWrapper.append(contentWrap);
                footerWrap.append(btnDelete);
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

                    addArray.push(dataSaved);    
                
                if (dataChat){
                    dataChat.forEach(function (objMessage) {
                        addArray.push(objMessage);
                    })
                }
                
                saveLocalStorage(key, addArray);
                
            }

            function saveLocalStorage(key, addArray){
                if(typeof key !== 'string' && addArray && addArray.length != 0) return false;
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
            // function getInputData(){
            //     optionsInput = {
            //         user: options.wrapper.querySelector('#userName').value,
            //         email: options.wrapper.querySelector('#userEmail').value
            //     };
            //     // console.log(optionsInput);
            //     return {
            //         user: optionsInput.toLocaleString('ru-RU'),
            //         email: optionsInput.toLocaleString('ru-RU')
            //     }
            // }
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