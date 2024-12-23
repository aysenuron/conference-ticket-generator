const infoIcon = document.querySelector("#info-icon");
const infoText = document.querySelector("#info-text");

const fullName = document.querySelector("#full-name");
const email = document.querySelector("#email");
const userName = document.querySelector("#username");
const nameErrorMessage = document.querySelector("#nameErrorMessage");
const emailErrorMessage = document.querySelector("#emailErrorMessage");
const usernameErrorMessage = document.querySelector("#usernameErrorMessage");

const imageInput = document.querySelector("#imageInput");

const displayName = document.querySelector("#ticket-name");
const displayEmail = document.querySelector("#ticket-email");

const form = document.querySelector("#ticketForm");

const ticketAvatar = document.querySelector("#ticketAvatar");
const ticketName = document.querySelector("#ticketName");
const ticketUsername = document.querySelector("#ticketUsername");

const img = document.createElement("img");


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

if (form) {
fullName.addEventListener("input", () => nameError(fullName));
email.addEventListener("input", () => emailError(email));
userName.addEventListener("input", () => usernameError(userName));

//Insert the chosen image file into preview. Got help from chatGTP on this.
imageInput.addEventListener("change", function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            
            img.src = e.target.result;

            const preview = document.querySelector("#preview");
            preview.innerHTML = "";
            preview.appendChild(img);
        };

        reader.readAsDataURL(file);
    }
});
}

if (form) {
    // This code only runs on the form page (where the user submits their name)
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        localStorage.setItem("fullName", fullName.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("username", userName.value);

        // Convert the image to a Data URL and save it to localStorage
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem("image", e.target.result); // Save the image as a Data URL
            };
            reader.readAsDataURL(file);

        window.location.href = "ticket.html";
}});
} else if (displayName && displayEmail) {
    // This code only runs on the ticket page (where the name is displayed)
    function displayInput() {
        const inputName = localStorage.getItem("fullName");
        const inputEmail = localStorage.getItem("email");
        const inputUsername = localStorage.getItem("username");
        const inputImage = localStorage.getItem("image");
        if (inputName && inputEmail) {
            displayName.textContent = inputName;
            ticketName.textContent = inputName;
            displayEmail.textContent = inputEmail;
            ticketUsername.textContent = inputUsername;
            ticketAvatar.src = inputImage;
        } 
    }
    document.addEventListener("DOMContentLoaded", displayInput);
}


