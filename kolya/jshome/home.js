// Home work 1

// var arr = ["first",2,3,4,5];

// for(var i = 0; i < arr.length; i++) {
//     console.log(arr[i]);
// }
// arr.forEach(function (item, i, mass) {
//     console.log(i + ': ' + item + " (массив: " + mass + ')');
// });



// function learnJS (lang, callback) {
//     console.log("Я учу " + lang);
//     callback();
// }

// function done() {
//     console.log("Я закончил первый урок");
// }
// learnJS("JavaScript", done);


// function start() {
//     money = +prompt("Ваш бюджет на месяц?", "10000");
//     while (isNaN(money) || money == "" || money == null) {
//         money = +prompt("Ваш бюджет на месяц?", "10000");
//     }
// };
// start();

// var options = {
//     width: 1024,
//     height: 1024,
//     name: "test"
// };
// console.log(options.name);
// options.bool = false;
// options.colors = {
//     border: "black",
//     bg: "red"
// };

// delete options.bool;

// console.log(options);


// for (var key in options) {
//     console.log('Свойство ' + key + ' имеет значение ' + options[key]);
// }
// console.log(Object.keys(options).length);


// Home work2

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

// Creating skills array
var skills = personal.map(function (elem) {
    return elem.skill;
}).toString().split(',');
// Deleting the same elements and sorting array
var sorted = [];
skills.filter(function(elem, index) {
    if (skills.indexOf(elem) === index) {
            sorted.push(elem);
        }
});
sorted = sorted.sort();
console.log(sorted);
// Creating experiance array
var experienceArr = personal.map(function (elem) {
    return elem.experience;
}).toString().split(',');
// String to Number
experienceArr  = experienceArr.map(function(num, index, arr) {
    if (typeof experienceArr[index] == 'string') {
        return parseFloat(experienceArr[index]);
        }
    });
console.log(experienceArr);
// The sum of the elements of the array
var experianceArrSum = experienceArr.reduce(function(first, second) {
    return first + second;
});
console.log(experianceArrSum);


