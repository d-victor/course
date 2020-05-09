var objectType = {
    lastName: "Petrov",
    age: 18,
};

var array = [1, 5, 12, 4, 21, 2, 6, 3, 8, 11, 22, 18];

var i = 0;
var personal = [
    {
        name: 'kolya',
        age: 15,
        skill: ['html', 'css'],
        experience: .5
    },
    {
        name: 'sofiya',
        age: 26,
        skill: ['html', 'css', 'js', 'php', 'gulp', 'node'],
        experience: 9
    },
    {
        name: 'petya',
        age: 21,
        skill: ['html', 'css', 'js'],
        experience: 2
    },
    {
        name: 'vlad',
        age: 18,
        skill: ['html', 'css', 'js'],
        experience: 1
    }
];
// console.log(personal.find(function (elem, i, arr) {
//     console.log(elem, i, arr);
// }));
// console.log(personal.filter(function (elem, i, arr) {
//     console.log(elem, i, arr);
// }));
// console.log(array.sort());

// console.log(personal.map(function (elem, i, arr) {
//     elem.experience += 1;
//     return elem;
// при переборе возвращает новий масив из тех елементов которий вернул метод
// }));
// console.log(array.join('::'));
// делает из массива строку
// ----------
// console.log(array.join('::').split('::'));
// join из масива делает строку а split из строки делает масив
// var names = "Петя, Коля,Вася".split(',').map(function (item) {
// return item.trim();
// trim уберает пробелы
// });
// console.log(names);
// console.log(personal.sort(function (a, b) {
// }));
// --------------------home-task-begin----------------
var allSkill = personal.map(function (item) {
    return item.skill;
});
console.log(allSkill);
var flattenSkill = allSkill.reduce(
    function (accumulator, currentValue) {
        return accumulator.concat(currentValue);
    }
);
console.log(flattenSkill);
var countedSkill = flattenSkill.reduce(function (skills, skil) {
    if (skil in skills) {
        skills[skil]++;
    } else {
        skills[skil] = 1;
    }
    return skills;
}, {});
console.log(countedSkill);
var noRepeat = flattenSkill.sort().reduce(function (noSort, current) {
    if (noSort.length === 0 || noSort[noSort.length - 1] !== current) {
        noSort.push(current);
    }
    var sorted = noSort;
    return sorted;
}, []);
console.log(noRepeat);