/**
 * Counter
 * @param  {number} start
 * @param {function} fn
 * @return {function}
 *
 **/

function counters(start, fn) {
    //var counter = (+start && start > 0) ? (!Array.isArray(start) ? start : 0) : 0;
    var counter = (Number.isInteger(start) && start > 0) ? start : 0;
    
    return function () {
        counter++;
        if (fn && typeof fn === "function") fn(counter);
        return counter;
    }
}

function checkNumber (num) {
    console.log((num % 2 === 0) ? "odd number: " + num : "even number: " + num);
}

/*var count1 = counters(4, checkNumber);
var count2 = counters(3);
console.log(count1(), 1);
console.log(count1(), 1);
console.log(count1(), 1);
console.log(count1(), 1);
console.log(count1(), 1);
console.log(count2(), 1);*/
console.log([document.createElement('img')]);
function rec(i) {
    console.log(i);
    if (i++ < 10) {
        rec(i);
    }
    console.log(i);
}

//rec(0);

function pow(x, n) {
    if (n === 0) return 1;
    
    var r = x;
    
    if (n === 1){
        return x;
    } else {
        r *= pow(x, --n);
    }
    return r;
}

console.log(pow(2,3));

/* домашнее задиние */
/* Создать через замыкание коллекцию изображений
* реализовать:
* добвление через вызов функции доступной через замыкание. Аргументы (срока: путь к избражению, объкт: атрибуты изображения, логическое: если тру то нужно удалить)
* реализовать удаление удаляем по пути и третьему параметру
* доп. задача, вставлять изображение в див с ид который был передан при создании замыкания
* выполнить все проверки или код не ломается
* доп. задача, сделать кнопку при нажатии на которую появляется промт окно куда вводится строка, из котором можно получить все параметры для добавления или удаления */
