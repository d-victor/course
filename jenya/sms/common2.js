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
                countMessages: 0,
                statusUpdate: false,
                updateId: null,
                vote: {
                    positive: 0,
                    negative: 0
                }
            };

            var search = window.location.search;
            
            this.options.textarea.addEventListener('input', inputText.bind(this));
            
            this.options.icons.wrapper.forEach(function (icon) {
                this.options.icons.iconLists[keyReplace(icon.dataset.icon)] = icon.querySelector('i').classList.value;
                
                icon.addEventListener('click', function (e) {
                    insertTextAtCursor(this.options.textarea, ' ::' + keyReplace(e.currentTarget.dataset.icon) + ':: ', 0);
                    this.options.textarea.dispatchEvent(inputEvent);
                }.bind(this));
            }, this);
        
            this.options.addMsgBtn.addEventListener('click', function () {
                if (!this.options.statusUpdate){
                    addMessage.call(this, setText.call(this, this.options.textarea.value));
                } else {
                    var messages = getJsonMessages('chat');
                    messages = messages.map(function(message){
                        if(this.options.updateId === +message.id){
                            message.user.name = this.options.userName.value;
                            message.user.email = this.options.userEmail.value;
                            message.message = setText.call(this, this.options.textarea.value);
                        }
                        return message;
                    }.bind(this));
                    saveLocalStorage('chat', messages);
                    cleanForm.call(this);
                    this.options.formMessages.innerHTML = '';

                    // -----------
                    messageReverse.call(this, messages);
                    // ------------
                    // messages.reverse().forEach(function(message){
                    //     console.log(message);
                    //     addMessage.call(this, message);
                    // }, this);
                    this.options.updateId = null;
                    this.options.statusUpdate = false;
                    this.options.addMsgBtn.textContent = 'Add message';
                }
            }.bind(this));

            window.addEventListener('storage', function (e){
                console.log(JSON.parse(e.oldValue));
                addMessage.call(this, JSON.parse(e.newValue)[0]);
            }.bind(this));

            if(search){
                search = search.slice(1).split('&');

                search.forEach(function(res){
                    var inputArr = res.split('=');
                    inputArr[1] = decodeURI(inputArr[1])
                    if(inputArr[0] === 'name') this.options.userName.value = inputArr[1];
                    if(inputArr[0] === 'email') this.options.userEmail.value = inputArr[1];
                    if(inputArr[0] === 'm') {
                        this.options.textarea.value = inputArr[1];
                        this.options.textarea.dispatchEvent(inputEvent);
                    }
                }.bind(this));

            }

            // console.log(window.location.search);

            // --------------------
            function messageReverse(messageInfo){
                messageInfo.reverse().forEach(function(message){
                    // console.log(message);
                    addMessage.call(this, message);
                }, this);
            }
            // ----------------------
            
            function setLoadingMessages() {
                var dataMessages = getJsonMessages('chat');
                console.log(dataMessages);
                if(dataMessages && dataMessages.length > 0){
                    messageReverse.call(this, dataMessages);
                    // dataMessages.reverse().forEach(function (message) {
                    //     addMessage.call(this, message);
                    // }, this);
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
                --this.options.countMessages;
            }

            function deleteLocalStorage(id){
                var dataChat = getJsonMessages('chat');
                // console.log(dataChat);
                dataChat = dataChat.filter(function(message){
                    return message.id !== +id;
                });

                saveLocalStorage('chat' ,dataChat);
                // console.log(dataChat);

            }

            function editTextForMessage(text){
                var iconList = this.options.icons.iconLists;

                for (var key in iconList){
                    text = text.replace(new RegExp('<i class="'+iconList[key]+ '"></i>', 'g'), '::' + key + '::');
                }

                return text;
            }

            function editMessage(e){
                var idMessage = +e.currentTarget.dataset.btnId;
                // console.log(idMessage);
                var messages = getJsonMessages('chat');
                var message = messages.find(function (messageObj){
                    return +messageObj.id === idMessage;
                });
                this.options.userName.value = message.user.name;
                this.options.userEmail.value = message.user.email;
                this.options.textarea.value = editTextForMessage.call(this, message.message);
                this.options.textarea.dispatchEvent(inputEvent);
                this.options.statusUpdate = true;
                this.options.updateId = idMessage;
                this.options.addMsgBtn.textContent = 'Aply message';

                // console.log(message);
            }

            function voteCounter(e){
                var idMessage = +e.currentTarget.dataset.btnId;
                // console.log(idMessage);
                var messages = getJsonMessages('chat');
                var message = messages.find(function (messageObj){
                    console.log(messageObj);
                    return +messageObj.id === idMessage;
                });
                var vote = e.currentTarget.classList.value;
                console.log(message);
                if( vote === 'btn_plus'){
                    console.log('like');
                    ++this.options.vote.positive;
                } else {
                    console.log('dislike');
                    --this.options.vote.negative;
                }
                console.log(this.options.vote.positive);
                message.allVote.plus = this.options.vote.positive;
                message.allVote.minus = this.options.vote.negative;
                console.log('local storage - ' + message.allVote.plus);
            }
            
            function addMessage(message) {
                var newMessageWrapper = document.createElement('div'),
                    headerWrap = document.createElement('div'),
                    contentWrap = document.createElement('div'),
                    footerWrap = document.createElement('div'),
                    voteWrap = document.createElement('div'),
                    // 
                    btnDelete = document.createElement('button'),
                    btnEdit = document.createElement('button'),
                    btnVotePlus = document.createElement('button'),
                    btnVoteMinus = document.createElement('button'),
                    year, time, userName, userEmail, idMessage, votePlus, voteMinus;

                    // var idMessage = ++this.options.countMessages;

                    
                if (typeof message === 'string') {
                    idMessage = ++this.options.countMessages;
                    year = getDate().year;
                    time = getDate().time;
                    userName = this.options.userName.value;
                    userEmail = this.options.userEmail.value;
                    votePlus = this.options.vote.positive;
                    voteMinus = this.options.vote.negative;
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
                        },
                        allVote: {
                            plus: votePlus,
                            minus: voteMinus
                        }
                    });
                } else {
                    idMessage = message.id;
                    if(this.options.countMessages < idMessage) {
                        this.options.countMessages = idMessage;
                    }
                    year = message.date.year;
                    time = message.date.time;
                    userName = message.user.name;
                    userEmail = message.user.email;
                    votePlus = message.allVote.plus;
                    voteMinus = message.allVote.minus;
                }

                btnDelete.classList.add('delete-btn');
                btnDelete.addEventListener('click' , deleteMessages.bind(this));
                btnDelete.textContent = 'delete message';
                btnDelete.dataset.btnId = typeof message === 'string' ? idMessage : message.id;

                btnEdit.classList.add('edit');
                btnEdit.addEventListener('click', editMessage.bind(this));
                btnEdit.dataset.btnId = idMessage;
                btnEdit.textContent = "Edit";

                btnVotePlus.classList.add('btn_plus');
                btnVoteMinus.classList.add('btn_minus');
                btnVotePlus.addEventListener('click', voteCounter.bind(this));
                btnVoteMinus.addEventListener('click', voteCounter.bind(this));
                btnVotePlus.dataset.btnId = idMessage;
                btnVoteMinus.dataset.btnId = idMessage;
                btnVotePlus.textContent = 'like: ' + votePlus + ' vote';
                btnVoteMinus.textContent = 'dislike: ' + voteMinus + ' vote';

                btnDelete.dataset.btnId = idMessage;
                headerWrap.classList.add('header_item');
                contentWrap.classList.add('content_item');
                footerWrap.classList.add('footer_item');
                voteWrap.classList.add('vote_item');
                footerWrap.textContent = year + 'year Time: ' + time;
                headerWrap.textContent = 'username: ' + userName + ' ' + ' email: ' + userEmail;
        
                newMessageWrapper.classList.add('item-message');
                newMessageWrapper.dataset.id = idMessage;
        
                contentWrap.innerHTML = typeof message === 'string' ? message : message.message;
                
                newMessageWrapper.append(headerWrap);
                newMessageWrapper.append(contentWrap);
                footerWrap.append(btnDelete);
                footerWrap.append(btnEdit);
                newMessageWrapper.append(footerWrap);
                headerWrap.append(voteWrap);
                voteWrap.append(btnVotePlus);
                voteWrap.append(btnVoteMinus);
        
                this.options.formMessages.append(newMessageWrapper);
            }
            
            function cleanForm() {
                this.options.textarea.value = '';
                this.options.formText.innerHTML = '';
                this.options.userName.value = '';
                this.options.userEmail.value = '';
            }
            
            function getJsonMessages(key){
                // console.log(key);
                return JSON.parse(getLocalStorage(key));
            }

            function setLocalStorage(dataSaved) {
                var key = 'chat',
                    // dataChat = JSON.parse(getLocalStorage(key)),
                    dataChat = getJsonMessages(key),
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