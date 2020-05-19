// var user = {
//     name: "Vasya",
//     age: 18,
//     skill: [],
//     addSkill: function (skill) {
//         this.skill.push(skill);
//     },
//     getName: function () {
//         return this.name;
//     },
//     setName: function () {
//         this.name = name;
//     }
// };
// user.addSkill('css');
// console.log(user);
var user = {
    name: "Vasya",
    age: 18,
    skill: [],
    addSkill: addSkill,
    getName: getName,
};
var sotrudniky = {
    name: [],
    skill: []
}

setTimeout(addSkill.bind(sotrudniky, 'js'), 1000);

function addSkill(skill) {
    this.skill.push(skill);
}
function getName() {
    return this.name;
}
addSkill.apply(user, ['css']);
addSkill.call(user, 'html');
user.addSkill('css');

console.log(user);

function slider() {
    var collection = [];
    function removeHtml(src) {

    }
    function sortCollection(condition) {

    }
    return {
        addCollection: function (item) {
            collection.push(item);
        },
        getCollection: function () {
            return collection;
        },
        removeCollection: function (src) {
            removeHtml(src)
        },
        addToHtml: function () {
            // метод будет вставлять картинку в html
        },
        sortCollection: function (condition) {
            sortCollection() //dont right
        }
    }
}
var slider1 = slider();
slider1.addCollection('../images/src');
