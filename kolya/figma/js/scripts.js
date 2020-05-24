var form = document.getElementsByTagName('form')[0];
var text = document.getElementById('textInput');
var email = document.getElementById('emailInput');
var error = document.querySelector('.error');
var errorName = document.querySelector('.errorName');


email.addEventListener('input', function(event) {
    if(email.validity.valid) {
        error.innerHTML = "";
        error.className = "error";
    }
}, false);

text.addEventListener('input', function(event) {
    if(text.validity.valid) {
        errorName.innerHTML = "";
        errorName.className = "errorName";

    }
}, false);

form.addEventListener('submit', function(event) {
    if (!email.validity.valid || email.value == "") {
        error.innerHTML = "Type your email";
        error.className = "error active";
        if(!text.validity.valid || text.value == "") {
            errorName.innerHTML = "Type your text";
            errorName.className = "errorName active";
        }
        event.preventDefault();
    }
    else if (!text.validity.valid || text.value == "") {
        errorName.innerHTML = "Type your text";
        errorName.className = "errorName active";
        event.preventDefault();
    }
    
}, false);
