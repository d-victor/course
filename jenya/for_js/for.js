function checkAge(age) {
    if (age == '' || isNaN(age)) {
        console.log(age + " is not a number");
    } else {
        console.log("Ok");
        var ageResult = age;
        return ageResult;
    }
}


var dataArray = [
    { name: 'John', yourage: 21 },
    { name: 'Lisa', yourage: 22 },
    { name: 'Nikita', yourage: 23 }
];

function callBack(callback) {
    if (typeof callback === "function") {
        console.log("it`s function")
        var age = prompt('How old are you?');
        console.log(callback(age));
        function findName(findage) {
            return findage.yourage === 21;
        }
        console.log(dataArray.find(findName));

    } else {
        console.log("Not a function");
    }
}
callBack(checkAge);
