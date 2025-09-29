
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();


    resetErrors();


    let isValid = true;
    let formData = {};


    const firstName = document.getElementById('firstName').value.trim();
    if (firstName === '') {
        showError('firstNameError', 'First name is required');
        isValid = false;
    } else if (firstName.length < 2) {
        showError('firstNameError', 'First name must be at least 2 characters');
        isValid = false;
    } else {
        formData.firstName = firstName;
    }


    const lastName = document.getElementById('lastName').value.trim();
    if (lastName === '') {
        showError('lastNameError', 'Last name is required');
        isValid = false;
    } else if (lastName.length < 2) {
        showError('lastNameError', 'Last name must be at least 2 characters');
        isValid = false;
    } else {
        formData.lastName = lastName;
    }


    const email = document.getElementById('email').value.trim();
    if (email === '') {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    } else {
        formData.email = email;
    }


    const phone = document.getElementById('phone').value.trim();
    if (phone === '') {
        showError('phoneError', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    } else {
        formData.phone = phone;
    }


    const date = document.getElementById('date').value;
    if (date !== '') {
        if (!isValidDate(date)) {
            showError('dateError', 'Please enter a valid date');
            isValid = false;
        } else {
            formData.date = date;
        }
    }


    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        showError('genderError', 'Please select your gender');
        isValid = false;
    } else {
        formData.gender = gender.value;
    }


    const hobbies = document.querySelectorAll('input[name="hobbies"]:checked');
    if (hobbies.length === 0) {
        showError('hobbiesError', 'Please select at least one hobby');
        isValid = false;
    } else {
        formData.hobbies = Array.from(hobbies).map(hobby => hobby.value);
    }


    const message = document.getElementById('message').value.trim();
    if (message === '') {
        showError('messageError', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters');
        isValid = false;
    } else {
        formData.message = message;
    }


    const terms = document.getElementById('terms').checked;
    if (!terms) {
        showError('termsError', 'You must agree to the terms and conditions');
        isValid = false;
    }


    const newsletter = document.getElementById('newsletter').checked;
    formData.newsletter = newsletter;


    const offers = document.getElementById('offers').checked;
    formData.offers = offers;


    if (isValid) {
        console.log('Form submitted successfully!');
        console.log('Form Data:', formData);
        alert('Form submitted successfully! Check the console for details.');

    }
});


function isValidEmail(email) {
    if (email.indexOf('@') === -1) return false;
    if (email.indexOf('.') === -1) return false;
    if (email.length < 5) return false;
    return true;
}

function isValidPhone(phone) {
    const cleanPhone = phone.replace(/[-()\s]/g, '');

    for (let i = 0; i < cleanPhone.length; i++) {
        if (isNaN(parseInt(cleanPhone[i]))) {
            return false;
        }
    }

    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';

    const inputId = errorId.replace('Error', '');
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.classList.add('error-border');
    } else if (errorId === 'genderError') {
        document.querySelectorAll('input[name="gender"]').forEach(radio => {
            radio.parentElement.classList.add('error-border');
        });
    } else if (errorId === 'hobbiesError') {
        document.querySelectorAll('input[name="hobbies"]').forEach(checkbox => {
            checkbox.parentElement.classList.add('error-border');
        });
    } else if (errorId === 'termsError') {
        document.getElementById('terms').parentElement.classList.add('error-border');
    }
}

function resetErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.style.display = 'none';
    });

    const errorBorders = document.querySelectorAll('.error-border');
    errorBorders.forEach(element => {
        element.classList.remove('error-border');
    });
}

document.querySelectorAll('input, textarea').forEach(element => {
    element.addEventListener('input', function () {
        const errorId = this.id + 'Error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.style.display = 'none';
            this.classList.remove('error-border');
        }
    });
});

document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(element => {
    element.addEventListener('change', function () {
        const name = this.name;
        const errorId = name + 'Error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.style.display = 'none';
            document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
                input.parentElement.classList.remove('error-border');
            });
        }
    });
});