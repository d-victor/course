var undefinedType = undefined;
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
}
