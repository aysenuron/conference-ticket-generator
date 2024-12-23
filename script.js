const infoIcon = document.querySelector("#info-icon");
const infoText = document.querySelector("#info-text");

const fullName = document.querySelector("#full-name");
const email = document.querySelector("#email");
const userName = document.querySelector("#username");
const nameErrorMessage = document.querySelector("#nameErrorMessage");
const emailErrorMessage = document.querySelector("#emailErrorMessage");
const usernameErrorMessage = document.querySelector("#usernameErrorMessage");

const imageInput = document.querySelector("#imageInput");

const ticketName = document.querySelector("#ticket-name");

const form = document.querySelector("#ticketForm");

function displayName (input, ticketField) {
    let input = localStorage.getItem('input');
    if (input) {
        ticketField.textContent = input;
    }
}

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

//Insert the chosen image file into preview. Got help from chatGTP on this.
imageInput.addEventListener("change", function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement("img");
            img.src = e.target.result;

            const preview = document.querySelector("#preview");
            preview.innerHTML = "";
            preview.appendChild(img);
        };

        reader.readAsDataURL(file);
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    localStorage.setItem('fullName', fullName.value);

    window.location.href = './ticket.html'

    displayName(fullName, ticketName);
});

