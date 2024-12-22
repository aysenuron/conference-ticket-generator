const infoIcon = document.querySelector("#info-icon");
const infoText = document.querySelector("#info-text");

const fullName = document.querySelector("#full-name");
const email = document.querySelector("#email");
const userName = document.querySelector("#username");
const nameErrorMessage = document.querySelector("#nameErrorMessage");
const emailErrorMessage = document.querySelector("#emailErrorMessage");
const usernameErrorMessage = document.querySelector("#usernameErrorMessage");

function displayError(input, message) {
    input.classList.add("red-border");
    message.style.display = "block";
}

function removeError(input, message) {
    input.classList.remove("red-border");
    message.style.display = "none";
}

function nameError(input) {
    const hasNumbers = /\d/.test(input.value); 
    if (hasNumbers) {
    displayError(input, nameErrorMessage)
    } else {
        removeError(input, nameErrorMessage);
    }
}

function emailError(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value)) {
        displayError(input, emailErrorMessage);
    } else {
        removeError(input, emailErrorMessage);
    }
}

function usernameError(input) {
    let usernameValue = input.value.toString();
    if (usernameValue[0] != "@") {
        displayError(input, usernameErrorMessage);
    } else {
        removeError(input, usernameErrorMessage);
    }
}

infoIcon.addEventListener("click", () => infoText.classList.toggle("no-show"));

fullName.addEventListener("input", () => nameError(fullName));
email.addEventListener("input", () => emailError(email));
userName.addEventListener("input", () => usernameError(userName));