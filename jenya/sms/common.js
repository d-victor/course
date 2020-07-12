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
                userName: options.wrapper.querySelector('#userName'),
                userEmail: options.wrapper.querySelector('#userEmail'),
                addMsgBtn: options.wrapper.querySelector('#addMsg'),
                formText: options.wrapper.querySelector('.form-text'),
                formMessages: options.wrapper.querySelector('.form-messages'),
                icons: {
                    wrapper: options.wrapper.querySelectorAll('.form-icon li'),
                    iconLists: {}
                },
                countMessages: 0,
                statusUpdate: false,
                updateId: null
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
                if (!this.options.statusUpdate) {
                    addMessage.call(this, setText.call(this, this.options.textarea.value));
                    
                } else {
                    var messages = JSON.parse(getLocalStorage('chat'));
                    messages = messages.map(function (message) {
                        if (this.options.updateId === +message.id) {
                            message.user.name = this.options.userName.value;
                            message.user.email = this.options.userEmail.value;
                            message.message = setText.call(this, this.options.textarea.value);
                        }
                        return message;
                    }.bind(this));
                    
                    saveLocalStorage('chat', messages);
                    
                    cleanForm.call(this);
                    
                    this.options.formMessages.innerHTML = '';
                    
                    messages.reverse().forEach(function (message) {
                        addMessage.call(this, message);
                    }, this);
                    this.options.updateId = null;
                    this.options.statusUpdate = false;
                    this.options.addMsgBtn.textContent = 'Add message';
                }
            }.bind(this));
        
            window.addEventListener('storage', function (e) {
                var newValue = JSON.parse(e.newValue),
                    oldValue = JSON.parse(e.oldValue);
                
                console.log(newValue, oldValue);
                if (newValue.length > oldValue.length) {
                    addMessage.call(this, JSON.parse(e.newValue)[0]);
                    
                } else if (newValue.length < oldValue.length) {
                    var message = oldValue.find(function (oldMessageValue) {
                        var messageListId = newValue.map(function (newMessageValue) {
                            return newMessageValue.id;
                        });
                        
                        return messageListId.indexOf(oldMessageValue.id) === -1;
                    });
                    
                    removeMessageToHtml.call(this, message.id);
                } else {
                    this.options.formMessages.innerHTML = '';
                    setLoadingMessages.call(this);
                }
            }.bind(this));
            
            if (search) {
                search = search.slice(1).split('&');
                
                search.forEach(function (res) {
                    var inputArr = res.split('=');
                    inputArr[1] = decodeURI(inputArr[1]);
                    if (inputArr[0] === 'name') this.options.userName.value = inputArr[1];
                    if (inputArr[0] === 'email') this.options.userEmail.value = inputArr[1];
                    if (inputArr[0] === 'm') {
                        this.options.textarea.value = inputArr[1];
                        this.options.textarea.dispatchEvent(inputEvent);
                    }
                }.bind(this));
            }
            
            function setLoadingMessages() {
                var dataMessages = JSON.parse(getLocalStorage('chat'));
                if (dataMessages && dataMessages.length > 0) {
                    dataMessages.reverse().forEach(function (message) {
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
            
            function removeMessageToHtml(messageId) {
                this.options.formMessages.querySelector('[data-id="' + messageId + '"]').remove();
            }
        
            function deleteMessages(e) {
                var idMessage = e.currentTarget.dataset.btnId;
                removeMessageToHtml.call(this, idMessage);
            
                deleteLocalStorage(idMessage);
            }
            
            function deleteLocalStorage(id) {
               var dataChat = JSON.parse(getLocalStorage('chat'));
               
                dataChat = dataChat.filter(function (message) {
                   return message.id !== +id;
                });
        
                saveLocalStorage('chat', dataChat);
            }
            
            function editTextForMessage(text) {
                var iconList = this.options.icons.iconLists;
                
                for (var key in iconList) {
                    text = text.replace(new RegExp('<i class="' + iconList[key] + '"></i>', 'g'), '::' + key + '::');
                }
                
                return text;
            }
            
            function editMessage(e) {
                var idMessage = +e.currentTarget.dataset.btnId;
                console.log(idMessage);
                var messages = JSON.parse(getLocalStorage('chat'));
                var message = messages.find(function (messageObj) {
                    return +messageObj.id === idMessage;
                });
                
                this.options.userName.value = message.user.name;
                this.options.userEmail.value = message.user.email;
                this.options.textarea.value = editTextForMessage.call(this, message.message);
                this.options.textarea.dispatchEvent(inputEvent);
                this.options.statusUpdate = true;
                this.options.updateId = idMessage;
                this.options.addMsgBtn.textContent = 'Apply';
            }
            
            function percentRate(like, dislike){
                // return Math.round((like*100)/allRate);
                var plus = Math.round(100*(like/(like + dislike)));
                var minus = Math.round(100*(dislike/(like+dislike)));
                // console.log(plus, minus);
                if(plus >= minus){
                    return plus + '% of likes';
                } else {
                    return minus + '% of dislikes';
                }

            }

            function rating(e) {
                var messageId = e.currentTarget.dataset.btnId,
                    direction = Boolean(+e.currentTarget.dataset.rate),
                    messageList = JSON.parse(getLocalStorage('chat')),
                    message = messageList.find(function (findMessage) {
                        return +findMessage.id === +messageId;
                    });
                    ++message.allRateCounter;
                    // message.rating = direction ? ++message.rating.like : ++message.rating.dislike;
                    if(direction === true){
                        ++message.rating.like;
                        this.options.formMessages.querySelector('[data-id="' + messageId + '"] .footer .ratingLike').textContent = message.rating.like;
                    } else {
                        ++message.rating.dislike;
                        this.options.formMessages.querySelector('[data-id="' + messageId + '"] .footer .ratingDislike').textContent = message.rating.dislike;
                    }
                    message.percentRate = percentRate(message.rating.like, message.rating.dislike);
                    this.options.formMessages.querySelector('.percent').textContent = message.percentRate;
                    if(message.rating.like >= message.rating.dislike){
                        this.options.formMessages.querySelector('.percent').style.color = 'green';
                    } else {
                        this.options.formMessages.querySelector('.percent').style.color = 'red';
                    }

                    saveLocalStorage('chat', messageList);
            }
            
            function addMessage(message) {
                var newMessageWrapper = document.createElement('div'),
                    headerWrap = document.createElement('div'),
                    contentWrap = document.createElement('div'),
                    footerWrap = document.createElement('div'),
                    btnDelete = document.createElement('button'),
                    btnEdit = document.createElement('button'),
                    btnPlus = document.createElement("button"),
                    btnMinus = document.createElement("button"),
                    year, time, userName, userEmail, idMessage,
                    ratingLike = 0, ratingDislike = 0, allRate = 0, 
                    percent = 0;
                    // messageRating = 0;
                
                if (typeof message === 'string') {
                    idMessage = ++this.options.countMessages;
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
                        },
                        rating: {
                            like: ratingLike,
                            dislike: ratingDislike
                        },
                        allRateCounter: allRate,
                        percentRate: percent
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
                    ratingLike = message.rating.like;
                    ratingDislike = message.rating.dislike;
                    allRate = message.allRateCounter;
                    percent = message.percentRate;
                }

                
                btnDelete.classList.add('delete-btn');
                btnDelete.addEventListener('click', deleteMessages.bind(this));
                btnDelete.textContent = 'Delete the message';
                btnDelete.dataset.btnId = idMessage;
                
                btnEdit.classList.add('edit');
                btnEdit.addEventListener('click', editMessage.bind(this));
                btnEdit.dataset.btnId = idMessage;
                btnEdit.textContent = "Edit";
                
                btnPlus.addEventListener('click', rating.bind(this));
                btnPlus.dataset.rate = '1';
                btnPlus.dataset.btnId = idMessage;
                btnPlus.textContent = 'Like: ';
                
                btnMinus.addEventListener('click', rating.bind(this));
                btnMinus.dataset.rate = '0';
                btnMinus.dataset.btnId = idMessage;
                btnMinus.textContent = 'Dislike: ';
                
                headerWrap.classList.add('header');
                contentWrap.classList.add('content');
                footerWrap.classList.add('footer');
                headerWrap.textContent = year + 'г. Время: ' + time;
                headerWrap.textContent += " | Name: " + userName + " | Email: " + userEmail + ".";
        
                newMessageWrapper.classList.add('item-message');
                newMessageWrapper.dataset.id = idMessage;
                
                contentWrap.innerHTML = typeof message === 'string' ? message : message.message;
                
                newMessageWrapper.append(headerWrap);
                newMessageWrapper.append(contentWrap);
                
                footerWrap.append(btnDelete);
                footerWrap.append(btnEdit);
                footerWrap.append(btnPlus);
                footerWrap.append(btnMinus);
                
                var spanLike = document.createElement('span');
                spanLike.textContent = ratingLike;
                // span.textContent = ratingDislike;
                spanLike.classList.add('ratingLike');
                btnPlus.append(spanLike);

                var spanDisLike = document.createElement('span');
                spanDisLike.textContent = ratingDislike;
                // span.textContent = ratingDislike;
                spanDisLike.classList.add('ratingDislike');
                btnMinus.append(spanDisLike);

                var percentText = document.createElement('span');
                percentText.textContent = percent;
                percentText.classList.add('percent');
                (ratingLike >= ratingDislike) ? percentText.style.color = 'green' : percentText.style.color = 'red';
                footerWrap.append(percentText);
                
                
                newMessageWrapper.append(footerWrap);
        
                this.options.formMessages.prepend(newMessageWrapper);
            }
            
            function cleanForm() {
                this.options.textarea.value = '';
                this.options.formText.innerHTML = '';
                this.options.userEmail.value = '';
                this.options.userName.value = '';
            }
            
            function setLocalStorage(dataSaved) {
                var key = 'chat',
                    dataChat = JSON.parse(getLocalStorage(key)),
                    addArray = [];
                
                addArray.push(dataSaved);
                
                if (dataChat) {
                    dataChat.forEach(function (objMessage) {
                        addArray.push(objMessage);
                    })
                }
                
                saveLocalStorage(key, addArray);
            }
            
            function saveLocalStorage(key, addArray) {
                if(typeof key !== 'string' && typeof addArray === 'object' && addArray.length !== 0) return false;
                
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
                    time: date.toLocaleString('ru-RU', optionsYear)
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