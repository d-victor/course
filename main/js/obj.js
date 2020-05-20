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

setTimeout(addSkill.bind(sotrudniky, 'js'), 5000);
addSkill.call(sotrudniky, 'html');
console.log(sotrudniky);

//addSkill('css');
addSkill.apply(user, ['css']);
addSkill.call(user, 'html');
//user.addSkill('css');

//user.addSkill('html');
console.log(user);
