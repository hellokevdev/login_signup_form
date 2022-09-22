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
                setInputError(inputElement, 'Passwort muss mindestens 8 Zeichen beinhalten');
            }else if(e.target.id === 'signUpPassword' && value.length > 0 && checkForUppercase(value) == false){
                setInputError(inputElement, 'Passwort muss mindestens einen Großbuchstaben beinhalten');
            }else if(e.target.id === 'signUpPassword' && value.length > 0 && checkForNumbers(value) == false){
                setInputError(inputElement, 'Passwort muss mindestens eine Zahl beinhalten');
            }else if(e.target.id === 'signUpPassword' && value.length > 0 && checkForSpecialChars(value) == false){
                setInputError(inputElement, 'Passwort muss mindestens ein Sonderzeichen beinhalten');
            }else if(e.target.id === 'signUpPasswordRepeat' && value.length > 0 && document.getElementById('signUpPasswordRepeat').value != document.getElementById('signUpPassword').value){
                setInputError(inputElement, 'Passwort stimmt nicht überein');
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
});