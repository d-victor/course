// object

// var user = {
//     name: "Vasya",
//     age: 18,
//     skill:[],
//     addSkill:function (skill) {
//         this.skill.push(skill);
//     },
//     getName:function () {
//         return this.name;
//     },
//     setName: function (name) {
//         this.name = name;
//     }
// };


var user = {
    name: "Vasya",
    age: 18,
    skill:[],
    addSkill: addSkill,
    getName:function () {
        return this.name;
    },
    setName: function (name) {
        this.name = name;
    }
};
var sotrudniky = {
    name:[],
    skill: []
};


function addSkill(skill) {
    this.skill.push(skill);
};

setTimeout(addSkill.bind(sotrudniky,'js'),5000);


addSkill.apply(user,['css']);
addSkill.call(user,'html');
user.addSkill('css');
// user.addSkill('html');
console.log(user);

addSkill.call(sotrudniky,'html');
console.log(sotrudniky);


function slider() {
    var collection = [];
    function removeHtml(src) {


        //src || alt
    }
    function sortCollection(condition) {

        // addToHtml
    }
    return {
            addCollection: function (item) {
                console.log(item);
                collection.push(item);
            },
            getCollection: function () {
                return collection;
            },
            removeCollection: function (src) {

            },
            addHtml:function () {

            },
            sortCollection:function () {
                sortCollection() // не правильно
            }
        }
}

var slider1 = slider();
console.log(slider1.addCollection("./images/01.jpg|alt:fdefesfed"));

