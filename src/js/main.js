function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector('.form__message');

    messageElement.textContent = message;
    messageElement.classList.remove('form__message--success', 'form__message--error');
    messageElement.classList.add(`form__message--${type}`);
};
// setFormMessage(signInForm, 'success', 'Du bist eingeloggt');
function clearFormMessage(formElement) {
    const messageElement = formElement.querySelector('.form__message');

    messageElement.textContent = '';
};

function setInputError(inputElement, message) {
    inputElement.classList.add('form__input--error');
    inputElement.parentElement.querySelector('.form__input-error-message').textContent = message;
};

function clearInputError(inputElement) {
    inputElement.classList.remove('form__input--error');
    inputElement.parentElement.querySelector('.form__input-error-message').textContent = '';
};


// Input error for sign up password
function setInputErrorPassword(inputElement, message) {
    inputElement.classList.add('form__input--error');
    document.getElementById('signUpPasswordContainer').querySelector('.form__input-error-message').textContent = message;
};

function clearInputErrorPassword(inputElement) {
    inputElement.classList.remove('form__input--error');
    document.getElementById('signUpPasswordContainer').querySelector('.form__input-error-message').textContent = '';
};

// Input error for password repeat
function setInputErrorPasswordRepeat(inputElement, message) {
    inputElement.classList.add('form__input--error');
    document.getElementById('repeatPasswordContainer').querySelector('.form__input-error-message').textContent = message;
};

function clearInputErrorPasswordRepeat(inputElement) {
    inputElement.classList.remove('form__input--error');
    document.getElementById('repeatPasswordContainer').querySelector('.form__input-error-message').textContent = '';
};


function checkForUppercase(string) {
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ';
    charsArray = chars.split('');
    for(i=0;i<charsArray.length;i++){
        if(string.indexOf(charsArray[i]) != -1) {
            return true;
        } 
    }
    return false;
}

function checkForNumbers(string) {
    chars = '0123456789';
    charsArray = chars.split('');
    for(i=0;i<charsArray.length;i++){
        if(string.indexOf(charsArray[i]) != -1) {
            return true;
        }
    }
    return false;
}

function checkForSpecialChars(string) {
    chars = '!@#$^&%*()+=-[]\/{}|:<>?,.';
    charsArray = chars.split('');
    for(i=0;i<charsArray.length;i++){
        if(string.indexOf(charsArray[i]) != -1){
            return true;
        }
    }
    return false;
}

function checkForInputError(string) {

}

document.addEventListener('DOMContentLoaded', () => {

    const signIn = document.getElementById('signInForm');
    const signUp = document.getElementById('signUpForm');

    document.getElementById('linkSignUp').addEventListener('click', () => { 
        signIn.classList.add('form--hidden');
        signUp.classList.remove('form--hidden');
    });

    document.getElementById('linkSignIn').addEventListener('click', () => {
        signUp.classList.add('form--hidden');
        signIn.classList.remove('form--hidden');
    });

    document.querySelectorAll('.form__input').forEach(inputElement => {
        // add event 'user takes off focus from input element
        inputElement.addEventListener('blur', e => {
            const value = e.target.value;
            // check for particular input field
            if(e.target.id === 'signUpUsername' && value.length > 0 && value.length < 5){
                setInputError(inputElement, 'Nutzername muss mindestens 5 Zeichen beinhalten')
            }else if(e.target.id === 'signUpMail' && value.length > 0 && value.length < 6 || e.target.id === 'signUpMail' && value.length > 0 && value.indexOf('@') == -1){
                setInputError(inputElement, 'Bitte geben Sie eine valide E-Mail Adresse an');
            }else if(e.target.id === 'signUpPassword' && value.length > 0 && value.length <= 8){
                setInputErrorPassword(inputElement, 'Passwort muss mindestens 8 Zeichen beinhalten');
            }else if(e.target.id === 'signUpPassword' && value.length > 0 && checkForUppercase(value) == false){
                setInputErrorPassword(inputElement, 'Passwort muss mindestens einen Großbuchstaben beinhalten');
            }else if(e.target.id === 'signUpPassword' && value.length > 0 && checkForNumbers(value) == false){
                setInputErrorPassword(inputElement, 'Passwort muss mindestens eine Zahl beinhalten');
            }else if(e.target.id === 'signUpPassword' && value.length > 0 && checkForSpecialChars(value) == false){
                setInputErrorPassword(inputElement, 'Passwort muss mindestens ein Sonderzeichen beinhalten');
            }else if(e.target.id === 'repeatPassword' && value.length > 0 && document.getElementById('repeatPassword').value != document.getElementById('signUpPassword').value){
                setInputErrorPasswordRepeat(inputElement, 'Passwort stimmt nicht überein');
            }
        });
        // clears input error when input is changed
        inputElement.addEventListener('input', e => {
            clearInputError(inputElement);
        });
    });

    document.querySelector('#signUpButton').addEventListener('click', e => {
        // prevents default event of button click
        e.preventDefault();
        // get all input groups from sign up form
        const inputGroups = document.getElementById('signUpForm').querySelectorAll('.form__input-group');
        // check if input element has input or input error element is shown
        function checkFormInput() {
            for(inputGroupElement of inputGroups){
                let inputElement = inputGroupElement.querySelector('.form__input');
                let inputErrorElement = inputGroupElement.querySelector('.form__input-error-message');
                // if yes return false
                if(inputElement.value.length == 0 || inputErrorElement.textContent.length > 0){
                    return false;
                }
            }
             // if yes return true
            return true;
        }
        // if false show sign up error message
        if(checkFormInput() == false) {
            setFormMessage(signUpForm, 'error', 'Registrierung fehlgeschlagen');
        // if true show sign up success message
        } else {
            setFormMessage(signUpForm, 'success', 'Registrierung erfolgreich. Eine Bestätigungsmail wurde an Ihre E-Mail Adresse versendet.');
        }
    });
    // clear form message if user puts input in input element
    document.querySelectorAll('.form__input').forEach(inputElement => {
        inputElement.addEventListener('input', e => {
            clearFormMessage(signUpForm);
        });
    });

    // toggle sign in password visibility
    document.getElementById('signInPasswordContainer').querySelector('.fa-eye').addEventListener('click', () => {
        document.getElementById('signInPasswordContainer').querySelector('.fa-eye-slash').classList.remove('visibility--hidden');
        document.getElementById('signInPasswordContainer').querySelector('.fa-eye').classList.add('visibility--hidden');
   
        document.getElementById('signInPassword').type = 'text';
    })
   
    document.getElementById('signInPasswordContainer').querySelector('.fa-eye-slash').addEventListener('click', () => {
        document.getElementById('signInPasswordContainer').querySelector('.fa-eye').classList.remove('visibility--hidden');
        document.getElementById('signInPasswordContainer').querySelector('.fa-eye-slash').classList.add('visibility--hidden');
   
        document.getElementById('signInPassword').type = 'password';
    })

    // toggle sign up password visibility
    document.getElementById('signUpPasswordContainer').querySelector('.fa-eye').addEventListener('click', () => {
        document.getElementById('signUpPasswordContainer').querySelector('.fa-eye-slash').classList.remove('visibility--hidden');
        document.getElementById('signUpPasswordContainer').querySelector('.fa-eye').classList.add('visibility--hidden');
   
        document.getElementById('signUpPassword').type = 'text';
    })
   
    document.getElementById('signUpPasswordContainer').querySelector('.fa-eye-slash').addEventListener('click', () => {
        document.getElementById('signUpPasswordContainer').querySelector('.fa-eye').classList.remove('visibility--hidden');
        document.getElementById('signUpPasswordContainer').querySelector('.fa-eye-slash').classList.add('visibility--hidden');
   
        document.getElementById('signUpPassword').type = 'password';
    })

    // toggle repeat password visibility
    document.getElementById('repeatPasswordContainer').querySelector('.fa-eye').addEventListener('click', () => {
        document.getElementById('repeatPasswordContainer').querySelector('.fa-eye-slash').classList.remove('visibility--hidden');
        document.getElementById('repeatPasswordContainer').querySelector('.fa-eye').classList.add('visibility--hidden');
   
        document.getElementById('repeatPassword').type = 'text';
    })
   
    document.getElementById('repeatPasswordContainer').querySelector('.fa-eye-slash').addEventListener('click', () => {
        document.getElementById('repeatPasswordContainer').querySelector('.fa-eye').classList.remove('visibility--hidden');
        document.getElementById('repeatPasswordContainer').querySelector('.fa-eye-slash').classList.add('visibility--hidden');
   
        document.getElementById('repeatPassword').type = 'password';
    })
});

// Building a login
// https://zellwk.com/blog/frontend-login-system/