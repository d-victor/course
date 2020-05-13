// function counters(start, fn) {
// var counter = (+start && start > 0) ? (!Array.isArray(start) ? start : 0) : 0;
//     var counter = (Number.isInteger(start) && start > 0) ? start : 0;
//     return function () {
//         counter++
//             ; fn(counter);
//         return counter;
//     }
// }

// var count1 = counters(1, function (num) {
//     console.log((num % 2 === 0) ? "odd number: " : "even number: ");
// });
// console.log(count1(), 1);
// console.log(count1(), 1);
// var count1 = counters(0);
// var count2 = counters(1);
// ------------------------------рекурсия-------------------
function rec(i) {
    console.log(i);
    if (i++ < 10) {
        rec(i);
    }
    console.log(i);
}
// rec(0);

function pow(x, n) {
    if (n === 0) return 1;

    if (n === 1) {
        return x;
    } else {
        return x * pow(x, --n);
    }
}
console.log(pow(2, 2));