function slider(getIdWrapper) {
    var collection = [];
    var galleryWrapper = document.getElementById(getIdWrapper);
    console.log(galleryWrapper);
    function removeHtml(src) {
        galleryWrapper.removeChild(galleryWrapper.querySelector('[src="' + src + '"]'));
    }
    
    function sortCollection(condition) {
        collection.sort(function (a, b) {
            a = (condition === 'src') ? a[condition] : a.attributes[condition];
            b = (condition === 'src') ? b[condition] : b.attributes[condition];

            if (a > b) {
                return 1;
            }
            if (b > a) {
                return -1;
            }
            return 0;
            
            // if (condition === 'src'){
            //     if (a[condition] > b[condition]) {
            //         return 1;
            //     }
            //     if (a[condition] < b[condition]) {
            //         return -1;
            //     }
            //     return 0;
            // } else {
            //     if (a.attributes[condition] > b.attributes[condition]) {
            //         return 1;
            //     }
            //     if (a.attributes[condition] < b.attributes[condition]) {
            //         return -1;
            //     }
            //     return 0;
            // }
        });
        this.addToHtml();
    }
    
    function getAttributes(attr) {
        return Object.fromEntries(attr.split(',').map(function (item) {
            return item.split(':');
        }));
    }
    
    function error(param) {
        if (!param){
            alert("вы не то делаете");
            return false;
        }
    }
    
    function createImg(item, galleryWrapper) {
        var img = document.createElement('img');
    
        /*img.addEventListener('click', function () {
            if (confirm('А вы уверенны?')) {
                removeItem(this.getAttribute('src'));
                this.remove();
            }
        });*/
    
        img.setAttribute('src', item.src);
        
        for (var key in item.attributes) {
            img.setAttribute(key, item.attributes[key])
        }
    
        addImg(img, galleryWrapper);
    }
    
    function addImg(img, galleryWrapper) {
        galleryWrapper.append(img);
    }
    
    return {
        addCollection: function (item, callback) {
            if (error(item)) return false;
            
            item = item.split('|');
    
            var src = item[0],
                attributes = getAttributes(item[1]);
            
            collection.push({
                src: src,
                attributes: attributes,
            });
            
            if (callback && typeof callback === "function") callback();
        },
        getCollection: function () {
            return collection;
        },
        removeCollection: function (src) {
            if (error(src)) return false;
            collection = collection.filter(function (item) {
                return item.src !== src;
            });
            removeHtml(src, galleryWrapper);
        },
        addToHtml: function () {
            galleryWrapper.innerHTML = '';
            collection.forEach(function (item) {
                createImg(item, galleryWrapper);
            });
        },
        sortCollection: function (condition) {
            sortCollection.call(this, condition, galleryWrapper);
        }
    }
}

var slider1 = slider('gallery1');
var addBtn = document.getElementById('add'),
    removeBtn = document.querySelector('#remove'),
    sortBtn = document.querySelector('#sort');

addBtn.addEventListener('click', function () {
    slider1.addCollection(
        prompt('Enter the item:', 'img1.jpg|alt:dsfgdshjf,title:my image'),
        function () {
            slider1.addToHtml();  
            // document.getElementById('gallery1')
        }
    );
    
    console.log(slider1.getCollection());
});

removeBtn.addEventListener('click', function () {
    slider1.removeCollection(
        prompt('Enter the removed src:', '../images/slider/01.jpg')
        // document.getElementById('gallery1')
        );
    console.log(slider1.getCollection());
});

sortBtn.addEventListener('click', function () {
    slider1.sortCollection('src');
    // document.getElementById('gallery1')
});