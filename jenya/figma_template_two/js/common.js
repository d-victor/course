function validateForm(fName) {
    var form = document.getElementById(fName),
        input = form.querySelector("input[type=email]"),
        forMessage = form.querySelector('#forError'),
        emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // validateEmail(input.value);

    if (input.value === '' || input.value == null || emailRegExp.test(input.value)) {
        var errorsMessage = [];
        input.classList.add('error');
        // var error = document.querySelector('.error');
        errorsMessage.push('Error');
        console.log(errorsMessage);
        forMessage.classList.add('error_msg');
        return false;
    }
    inputClick(input, forMessage);
}

function inputClick(inputField, message) {
    inputField.addEventListener('click', function () {
        inputField.classList.remove('error');
        message.classList.remove('error_msg');
    });
};
// function validateEmail(email) {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }