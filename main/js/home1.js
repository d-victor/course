/* Добавить возможность удаления по клику на картинку в документе */
//../images/slider/01.jpg|alt:dsfgdshjf

(function() {
    var arr = [window.Element, window.CharacterData, window.DocumentType];
    var args = [];
    
    arr.forEach(function (item) {
        if (item) {
            args.push(item.prototype);
        }
    });
    
    // from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
    (function (arr) {
        arr.forEach(function (item) {
            if (item.hasOwnProperty('remove')) {
                return;
            }
            Object.defineProperty(item, 'remove', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function remove() {
                    this.parentNode.removeChild(this);
                }
            });
        });
    })(args);
})();

(function () {
    var addBtn = document.getElementById('add'),
        removeBtn = document.getElementById('remove');
    
    addBtn.addEventListener('click', function () {
        console.log(slide1(document.getElementById('collection').value));
    });
    
    removeBtn.addEventListener('click', function () {
        console.log(slide1(document.getElementById('collection').value));
    });
    
    function slider(idWrapper) {
        var collection = [],
            galleryWrapper = idWrapper ? document.getElementById(idWrapper) : false;
        
        function getAttributes(attr) {
            return Object.fromEntries(attr.split(',').map(function (item) {
                return item.split(':');
            }));
        }
        
        function addImg(img) {
            galleryWrapper.append(img);
        }
        
        function createImg(item) {
            var img = document.createElement('img');
            
            img.addEventListener('load', function () {
                for (var key in item.attributes) {
                    img.setAttribute(key, item.attributes[key])
                }
                
                addImg(img);
            });
            
            img.addEventListener('error', function () {
                removeItem(this.getAttribute('src'));
                errors('Изображения не существует в базе');
            });
            
            img.addEventListener('click', function () {
                if (confirm('А вы уверенны?')) {
                    removeItem(this.getAttribute('src'));
                    this.remove();
                }
            });
            
            img.setAttribute('src', item.src);
        }
        
        function removeItem(src) {
            collection = collection.filter(function (item) {
                return item.src !== src;
            });
        }
        
        function errors(text) {
            console.log(text);
            return false;
        }
        
        function addCollection(src, attributes) {
            collection.push({
                src: src,
                attributes: attributes
            });
        }
        
        function creatGallery() {
            galleryWrapper.innerHTML = '';
            collection.forEach(function (item) {
                createImg(item);
            });
        }
        
        function getCollection() {
            return collection;
        }
        
        return function (options) {
            if (!options) {
                return errors("вы не передали опции идите лесом");
            }
            
            options = options.split('|');
            
            var src = options[0],
                attributes = getAttributes(options[1]),
                removable = (options[2] !== undefined) ? (options[2] === 'true') : false,
                status = src !== '' && attributes.alt !== undefined;
            
            if (status && !removable) {
                addCollection(src, attributes);
            } else if (!status && !removable){
               return errors('Вы не указали обязательный параметр ' + ((src === '') ? 'src' : 'alt'));
            }
            
            if (removable) {
                removeItem(src);
            }
            
            if (galleryWrapper) {
                creatGallery();
            }
            
            return getCollection();
        }
    }
    
    var slide1 = slider('gallery1');
})();
