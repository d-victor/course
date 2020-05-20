// var user = {
//     name: 'Vasya',
//     age: 18,
//     skill: [],
//     addSkill: function(skill) {
//         this.skill.push(skill);
//     },
//     getName: function () {
//         return this.name;
//     },
//     setName: function (name) {
//         this.name = name;
//     }
// };


var user = {
    name: 'Vasya',
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
}

function addSkill(skill) {
    this.skill.push(skill);
};

setTimeout(addSkill.bind(sotrudniky, 'js'), 1000)
addSkill.apply(user, ["css"]);
addSkill.call(user, 'css');
addSkill.call(sotrudniky, 'html');
console.log(user);
console.log(sotrudniky);

function slider() {
    var collection = [];
    return  {
            
            addCollection: function(item) {
                console.log(item);
            },
            getCollection: function() {
                return collection;
            },
            removeCollection: function(src) {
    
            }
        }
}
var slider1 = slider();
console.log(slider1.addCollection('ima/slider/01.jpg|alt:slide1,data-text:my slide'))
