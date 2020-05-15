// function counters(start, fn) {
// var counter = (+start && start > 0) ? (!Array.isArray(start) ? start : 0) : 0;
//     var counter = (Number.isInteger(start) && start > 0) ? start : 0;
//     return function () {
//         counter++
//             ; fn(counter);
//         return counter;
//     }
// }

// var count1 = counters(1, function (num) {
//     console.log((num % 2 === 0) ? "odd number: " : "even number: ");
// });
// console.log(count1(), 1);
// console.log(count1(), 1);
// var count1 = counters(0);
// var count2 = counters(1);
// ------------------------------рекурсия-------------------
// function rec(i) {
//     console.log(i);
//     if (i++ < 10) {
//         rec(i);
//     }
//     console.log(i);
// }
// rec(0);

// function pow(x, n) {
//     if (n === 0) return 1;

//     if (n === 1) {
//         return x;
//     } else {
//         return x * pow(x, --n);
//     }
// }
// console.log(pow(2, 2));
// ----------------------------------
(function () {
    var addBtn = document.getElementById('add'),
        removeBtn = document.getElementById('remove');

    addBtn.addEventListener('click', function () {
        console.log(slide1(document.getElementById('collection').value));
        console.log(slide2(document.getElementById('collection').value));
    });

    removeBtn.addEventListener('click', function () {
        console.log(slide1(document.getElementById('collection').value));
        console.log(slide2(document.getElementById('collection').value));
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
                checkDel = confirm('Do you want to delete image with alt -' + this.alt);
                if (checkDel) {
                    this.remove(this);
                }

            })

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
            } else if (!status && !removable) {
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
    var slide2 = slider('gallery2');

})();