// var undefinedType = undefined;
// var u;
//
// var nullType = null;
//
// var boolType = true || false;
//
// var stringType = 'V\'sya' || "s\"d 'f' asdfa" || `sfadfasdf ${2 + 2}`;
// console.log(stringType.length, stringType[0]);
//
// var numberType = 2;
// var n = numberType;
// console.log(NaN, Infinity, -0 === 0, NaN === NaN);
//
// var symbolType = Symbol('name');
//
// var objectType = {
//     lastName: stringType,
//     age: numberType,
//     [symbolType]: 'sdasd',
// };
//
// console.log(objectType.name);
// console.log(objectType['name']);
//
// var array = [1, 2, objectType, numberType];
// var a = array;
// a.push('sss');
// console.log(array, 'array');
// console.log(a, 'a');
//
// var func = function (a, b) {
//     console.log(arguments[0]);
// };
// func(prompt(), +prompt());
//
// otherFunc(50, func, 1);
//
// function otherFunc(weight, callBack) {
//     console.log(weight, callBack);
//     if (arguments[2] !== undefined) {
//         if (typeof callBack === "function") {
//             callBack(arguments[2]);
//         } else {
//             console.log(callBack);
//         }
//     }
//     if (weight === 0) otherFunc(weight--, callBack);
// }
//


//
// var objectType = {
//     lastName: "Petrov",
//     age: 18,
// };
//
// var array = [1, 5, 12, 4, 21, 2, 6, 3, 8, 11, 22, 18];
//
// var i = 0;


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

var skills = personal.map(function (item) {
    return item.skill;
}).toString().split(',');

var filtered = skills.filter(function(item, index) {
    return skills.indexOf(item) === index;
}).sort();

console.log(filtered);

