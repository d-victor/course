/*var undefinedType = undefined;
var u;

var nullType = null;

var boolType = true || false;

var stringType = 'V\'sya' || "s\"d 'f' asdfa" || `sfadfasdf ${2 + 2}`;
console.log(stringType.length, stringType[0]);

var numberType = 2;
var n = numberType;
console.log(NaN, Infinity, -0 === 0, NaN === NaN);

var symbolType = Symbol('name');

var objectType = {
    lastName: stringType,
    age: numberType,
    [symbolType]: 'sdasd',
};

console.log(objectType.name);
console.log(objectType['name']);

var array = [1, 2, objectType, numberType];
var a = array;
a.push('sss');
console.log(array, 'array');
console.log(a, 'a');

var func = function (a, b) {
    console.log(arguments[0]);
};
func(prompt(), +prompt());

otherFunc(50, func, 1);

function otherFunc(weight, callBack) {
    console.log(weight, callBack);
    if (arguments[2] !== undefined) {
        if (typeof callBack === "function") {
            callBack(arguments[2]);
        } else {
            console.log(callBack);
        }
    }
    if (weight === 0) otherFunc(weight--, callBack);
}*/

var objectType = {
    lastName: "Petrov",
    age: 18,
};

var array = [1, 5, 12, 4, 21, 2, 6, 3, 8, 11, 22, 18];

var i = 0;

/*while (true) {
    console.log(i);
    if (i++ > 10) break;
}
i = 0;
do {
    console.log(i);
    if (i++ > 10) break;
} while (true);*/
i=0;


/*for (i = 0; i < array.length; i++) {
    if (i % 2) continue;
    console.log(array[i], 'arr');
    if (i % 5) break;
}*/

/*outerLoop:
    for (i = 0; i < 20; i++) {
        console.log(i, 'i');
        for (var y = 5; y >= 0; y--) {
            console.log(i, y, 'y');
            if (i === 15 && y % 2) break outerLoop;
        }
    }*/

/*for (var key in objectType) {
    console.log(objectType[key]);
}*/

/*for (var val of array) {
    console.log(val);
}*/

array.push(11);
//console.log(array.pop(), array);
//array.unshift(223);
//console.log(array.shift());
//array.splice(1, 3, 777, 888, 99);
//array.splice(0, 1);
//array.splice(-3, 3, 777);
//console.log(array.splice(-3,3));

//console.log(array.indexOf(11));

// /lastIndexOf и includes
//console.log(array, 'array');
/*var s = array.concat([]);
console.log(array.concat([55,66,77],[999,999]), 'concat');*/

/*array.forEach(function (item, i, arr) {
    console.log(item, i, arr);
});
console.log(array, 'array');*/
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

/*console.log(personal.find(function (elem, i, arr) {
    //console.log(elem, i, arr);
    return elem.experience >= 2;
}), personal);*/

/*console.log(personal.filter(function (elem, i, arr) {
    return elem.experience >= 2;
}));*/

/*console.log(array.sort(function (a, b) {
    return a - b;
}));*/

/*console.log(personal.map(function (elem, i, arr) {
    elem.experience += 1;
    return elem;
}));*/

//console.log(array.join('--'));
var names = "Петя, Коля,Вася".split(',').map(function (item) {
    return item.trim();
});

console.log(names);

console.log(array.join('::').split('::'));




/*console.log(personal.sort(function (a, b) {
    return a.experience - b.experience;
}));*/


console.log(personal.map(function (elem) {
    return elem.skill;
}).toString().split(','));



