// // // Home work 1

// // // var arr = ["first",2,3,4,5];

// // // for(var i = 0; i < arr.length; i++) {
// // //     console.log(arr[i]);
// // // }
// // // arr.forEach(function (item, i, mass) {
// // //     console.log(i + ': ' + item + " (массив: " + mass + ')');
// // // });



// // // function learnJS (lang, callback) {
// // //     console.log("Я учу " + lang);
// // //     callback();
// // // }

// // // function done() {
// // //     console.log("Я закончил первый урок");
// // // }
// // // learnJS("JavaScript", done);


// // // function start() {
// // //     money = +prompt("Ваш бюджет на месяц?", "10000");
// // //     while (isNaN(money) || money == "" || money == null) {
// // //         money = +prompt("Ваш бюджет на месяц?", "10000");
// // //     }
// // // };
// // // start();

// // // var options = {
// // //     width: 1024,
// // //     height: 1024,
// // //     name: "test"
// // // };
// // // console.log(options.name);
// // // options.bool = false;
// // // options.colors = {
// // //     border: "black",
// // //     bg: "red"
// // // };

// // // delete options.bool;

// // // console.log(options);


// // // for (var key in options) {
// // //     console.log('Свойство ' + key + ' имеет значение ' + options[key]);
// // // }
// // // console.log(Object.keys(options).length);


// // // Home work2

// // var personal = [
// //     {
// //         name: 'kolya',
// //         age: 15,
// //         skill: ['html', 'css'],
// //         experience: .5
// //     },
// //     {
// //         name: 'sofiya',
// //         age: 26,
// //         skill: ['html', 'css', 'js', 'php', 'gulp', 'node'],
// //         experience: 9
// //     },
// //     {
// //         name: 'petya',
// //         age: 21,
// //         skill: ['html', 'css', 'js'],
// //         experience: 2
// //     },
// //     {
// //         name: 'vlad',
// //         age: 18,
// //         skill: ['html', 'css', 'js'],
// //         experience: 1
// //     }
// // ];

// // // Creating skills array
// // var skills = personal.map(function (elem) {
// //     return elem.skill;
// // }).toString().split(',');
// // // Deleting the same elements and sorting array
// // var sorted = [];
// // skills.filter(function(elem, index) {
// //     if (skills.indexOf(elem) === index) {
// //             sorted.push(elem);
// //         }
// // });
// // sorted = sorted.sort();
// // console.log(sorted);
// // // Creating experiance array
// // var experienceArr = personal.map(function (elem) {
// //     return elem.experience;
// // }).toString().split(',');
// // // String to Number
// // experienceArr  = experienceArr.map(function(num, index, arr) {
// //     if (typeof experienceArr[index] == 'string') {
// //         return parseFloat(experienceArr[index]);
// //         }
// //     });
// // console.log(experienceArr);
// // // The sum of the elements of the array
// // var experianceArrSum = experienceArr.reduce(function(first, second) {
// //     return first + second;
// // });
// // console.log(experianceArrSum);


// // function counters(start) {
// //     var counter = start;
// //     return function () {
// //         return ++counter;
// //     };
    
// // }
// // var count1 = counters(6, function oddNumber() {
// //     if (start % 2 === 0) {
// //         return start;
// //     }
// //     else {
// //         start++;
// //     }
// // });
// // console.log(count1(oddNumber()));
// // console.log(count1(oddNumber()));
// // console.log(count1(oddNumber()));

// function rec (i) {
//     console.log(i);
//     if (i++ < 10) {
//         rec(i);
//     }
    
//         console.log(i);
    
// }
// rec(0);

// function pow(x, n) {
//     if (n === 0) return 1;

//     var r = x;
//     if (n === 1) {
//         console.log(r, x, n, 'a');
//         return x;
//     }
//     else {
//         console.log(r, x, n, 'b');
//         r *= pow(x, --n);
//         console.log(r, x, n, 'b');
//     }
//     return r;
// }
// console.log(pow(2,2));

//     // создать функцию колекцию изображений, должна возвращать функцию, в кторой есть замыкание


//     for (i = 0; i <= 10; i++) {
//         if(i % 2 == 0 && i !== 0) {
//             console.log(i);
//         }
        
//     }




    // function colection() {
    //     var imgArray = [];
    //     return function (src, alter, res) {
    //         if (res === false) {
    //             imgArray.forEach(function(elem, i, arr) {
    //                 if (src === arr[i].src) {
    //                     arr.splice(i, 1);
    //                 }
    //             });
                
    //         } else {
    //             var img = document.createElement('img');
    //             img.setAttribute('src', src);
    //             img.setAttribute('alt', alter);
    //             document.body.appendChild(img);
    //             imgArray.push(img);
               
    //             return imgArray,
    //             console.log(imgArray);
    //         }
            
           

    //     };
    // }
    

    // var getImg = colection();
    // getImg(prompt("Введите адресc Вашей картинки", ""), prompt("Введите описание Вашей картинки", ""), confirm("Добавить картинку?"));
    // getImg(prompt("Введите адресc Вашей картинки", ""), prompt("Введите описание Вашей картинки", ""), confirm("Добавить картинку?"));
    // getImg(prompt("Введите адресc Вашей картинки", ""), prompt("Введите описание Вашей картинки", ""), confirm("Добавить картинку?"));
    // getImg(prompt("Введите адресc Вашей картинки", ""), prompt("Введите описание Вашей картинки", ""), confirm("Добавить картинку?"));
   

    function colection () {
        var arr = [];
        return function (src, id) {
            var img = document.createElement('img');
            img.setAttribute('src', src);
            img.setAttribute('id', id);
            arr.push(img);
            document.body.appendChild(img);
            return arr;
        };
    }
    var btn = document.querySelector('button');
    btn.onclick = function () {
        var id = prompt("Type id", "");
        document.getElementById(id).parentNode.removeChild(document.getElementById(id));
    };
var images = colection();
images('img1.jpg', 'first');
images('img2.jpg', 'second');
images('img3.jpg', 'third');
images('img3.jpg', 'fourth');



    // function checkNumber (num) {
    //     console.log((num % 2 === 0) ? "odd number: " + num : "even number: " + num);
    // }
    // function creating () {
    //     Document.body.createElement('<img src=  alt=>');
    // }
    // creating();
    
    /*var count1 = counters(4, checkNumber);
    console.log([document.createElement('img')]);
    function rec(i) {
        console.log(i);
        if (i++ < 10) {
            rec(i);
        }
        console.log(i);
    }
    
    
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
    