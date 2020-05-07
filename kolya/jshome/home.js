

var arr = ["first",2,3,4,5];

for(var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
arr.forEach(function (item, i, mass) {
    console.log(i + ': ' + item + " (массив: " + mass + ')');
});



function learnJS (lang, callback) {
    console.log("Я учу " + lang);
    callback();
}

function done() {
    console.log("Я закончил первый урок");
}
learnJS("JavaScript", done);


function start() {
    money = +prompt("Ваш бюджет на месяц?", "10000");
    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "10000");
    }
};
start();

var options = {
    width: 1024,
    height: 1024,
    name: "test"
};
console.log(options.name);
options.bool = false;
options.colors = {
    border: "black",
    bg: "red"
};

delete options.bool;

console.log(options);


for (var key in options) {
    console.log('Свойство ' + key + ' имеет значение ' + options[key]);
}
console.log(Object.keys(options).length);