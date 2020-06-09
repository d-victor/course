/*var user = {
    name: "Vasya",
    age: 18,
    skill:[],
    addSkill: function (skill) {
        this.skill.push(skill);
    },
    getName: function () {
        return this.name;
    },
    setName: function (name) {
        this.name = name;
    }
};*/

var user = {
    name: "Vasya",
    age: 18,
    skill: [],
    addSkill: addSkill,
    getName: function () {
        return this.name;
    },
    setName: function (name) {
        this.name = name;
    }
};
var sotrudniky = {
    names: [],
    skill: []
};

function addSkill(skill) {
    this.skill.push(skill);
}
//
// setTimeout(addSkill.bind(sotrudniky, 'js'), 5000);
// addSkill.call(sotrudniky, 'html');
// addSkill.apply(user, ['css']);
// addSkill.call(user, 'html');
// console.log(user);
// console.log(sotrudniky);

function slider() {
    var collection = [];
    function removeHtml(src,galleryWrapper) {
        galleryWrapper.removeChild(galleryWrapper.querySelector('[src="'+ src +'"]'));
    }

    function sortCollection(condition,galleryWrapper) {
        console.log()
        collection.sort(function (a,b) {
            if(a[condition] > b[condition]){
                return 1;
            }

        })
        // addToHtml
    }
    function getAttributes(attr) {
        return Object.fromEntries(attr.split(',').map(function (item) {
            return item.split(':');
        }));
    }
    function eror(param) {
        if(!param) return false;
    }


    return {
        addCollection: function (item,callback) {
            console.log(item);
            if (eror(item)) return false;
            var item = item.split('|');
            var src = item[0],
                attributes = getAttributes(item[1]);
            collection.push({
                src: src,
                attributes: attributes
            });
            if(callback && typeof  callback === "function") callback();
        },
        getCollection: function () {
            return collection;
        },
        removeCollection: function (src) {
            if(eror(src)) return false;
            collection = collection.filter(function (item) {
                return item.src !== src;
            });
        },
        addToHtml: function (galleryWrapper) {
            galleryWrapper.innerHTML = '';
            collection.forEach(function (item) {
                createImg(item,galleryWrapper);
            });

        },
        sortCollection: function (condition,galleryWrapper) {
            sortCollection.call(galleryWrapper); //не правильно
        }
    }
}


var slider1 = slider();
var addBtn = document.getElementById('add'),
    removeBth = document.querySelector('#remove'),
    sortBtn = document.querySelector('#sort');
addBtn.addEventListener('click',function () {
    slider1.addCollection((prompt('Enter the item:','../images/slider/01.jpg|alt:alfda')),
        ));
    console.log(slider1.getCollection());
});
removeBth.addEventListener('click',function () {
    slider1.removeCollection(prompt('Enter the removed src','../images/slider/01.jpg'),
        document.getElementById('gallery1')
        );
    console.log(slider1.getCollection());
});
sortBtn.addEventListener('click',function () {
    slider1.sortCollection('src',document.getElementById('gallery1'))
});