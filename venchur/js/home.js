(function () {
    var addBtn = document.getElementById('add'),
        removeBtn = document.getElementById('remove');

    addBtn.addEventListener('click',function () {
        console.log(slider1(document.getElementById('collection').value));
    });
    removeBtn.addEventListener('click',function () {
        console.log(slider1(document.getElementById('collection').value));
    })

    function slider(idWrapper) {
        var collection =[],
            galleryWrapper = idWrapper ? document.getElementById(idWrapper) : false;

        function getAttributes(attr) {
            return Object.fromEntries(attr.split(',').map(function (item) {
                return item.split(':');
            }));
        };

        function addImg(img) {
            galleryWrapper.append(img);

        }
        function createImg(item) {
            var img = document.createElement('img');

            img.addEventListener('load',function () {
                for (var key in item.attributes){
                    img.setAttribute(key,item.attributes[key]);
                }
                addImg(img);
            });
            img.addEventListener('error',function () {
                removeItem(this.getAttribute('src'));
            });

            img.setAttribute('src',item.src);
        }

        function removeItem(src) {
            collection = collection.filter(function (item) {
                return item.src !== src;
            });

        }

        function createGallery() {
            galleryWrapper.innerHTML = '';
            collection.forEach(function (item) {
                createImg()
            });
        }

        return function (options) {
            if(!options){
                console.log("ви не передали опції");
                return false;
            }

            options = options.split('|');

            var src = options[0],
                attributes = getAttributes(options[1]),
                removable = (options[2] !== undefined) ? (options[2] === 'true') : false,
                status = src !== '' && attributes.alt !== undefined;

            if(status && !removable){
                var newObj = {};
                newObj.src = src;
                newObj.attributes = attributes;
                collection.push(newObj);
            }else if(!status && !removable){
                console.log('ви не вказали обовязковий масив' + ((src === '') ? 'src' : 'alt'));
            }

            if (removable) {
                removeItem(src);
            }

            if(galleryWrapper){
                createGallery();
            }

            return collection;
        }
    }
    var slider1 = slider('gallery1');

})();