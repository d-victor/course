// наследование конструкторов обектов
// --------------------------------------------
// ------------------------------------------
// var people = {
//     say: function () {
//         console.log("My name is " + this.name + ". I am " + this.age + "years old");
//     }
// };

// var vasya = Object.create(people);
// vasya.name = 'Vasya';
// vasya.age = 18;
// vasya.sex = 'male';
// vasya.say = function () {
//     alert(this.name);
// }


// vasya.say();
// console.log(people);
// -------------------------------------------
// function People() {
//     this.say = function () {
//         console.log("My name is " + this.name + ". I am " + this.age + "years old");
//     }
// }

// People.prototype.sleep = function () {
//     console.log("I am sliping");
// }

// function Man(options) {
//     options = classOf(options, 'object') ? options : {};
//     this.name = "Kolya";
//     this.age = 18;
//     this.sex = 'male';
// }

// Man.prototype = new People();

// var kolya = new Man({
//     name: "Kolya",
//     age: 25
// });

// kolya.say = function () {
//     alert(this.name);
// }

// function classOf(obj, type) {

//     function is() {
//         return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === type;
//     }
//     if (type) return is() === type;

//     return is();
// }
// -
// -
// -
// -
// -
function GlobalValidate() {
    this.validate = function (inputText) {
        return inputText !== '';
    }
    this.errorMessage = function(elem){
        console.log(elem);
    }
}

function FormValidate(form) {
    this.formInputs = form.querySelectorAll('input');
    this.addValidate = function () {
        console.log(this);
        this.formInputs.forEach(function (item) {
            console.log(this);
            if (+item.dataset.validate) {
                item.addEventListener('input', function (e) {
                    console.log(this.validate(e.target.value));
                }.bind(this));
            }
        }, this);
    }
}

FormValidate.prototype = new GlobalValidate();

var myForm = new FormValidate(document.querySelector('#validFrom'));
console.log(myForm.addValidate());