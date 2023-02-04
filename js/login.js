const forms = document.querySelectorAll(".mainform");
const allInputs = document.querySelectorAll("input");
const tabButtons = document.querySelectorAll(".tab-button");
function switchDualTab() {
    forms.forEach(form => form.classList.toggle("active"));
    tabButtons.forEach(button => button.classList.toggle("current"));
}

tabButtons.forEach(button => button.addEventListener('click', () => { switchDualTab(); }));

// form validation

// this validates all nonblank inputs and adds an error if the input is in the currently displayed form
const nonblankInputs = document.querySelectorAll("input.nonblank");
nonblankInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (!input.parentNode.classList.contains("active")) {
            return;
        } else if (input.value.length == 0) {
            input.classList.add("error");
        } else {
            input.classList.remove("error");
        }
    })
})

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailInputs = document.querySelectorAll(".isEmail");
emailInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (!input.parentNode.classList.contains("active")) {
            return;
        } else if(!emailRegex.test(input.value)) {
            input.classList.add("error");
        } else {
            input.classList.remove('error');
        }
    })
})

// this checks all input on blur (when the cursor leaves) for the "error" class. if true, it literally disables the submit button.
// place this as the last validation function
allInputs.forEach(input => {
    input.addEventListener('blur', () => {
        forms.forEach(form => {
            let inputs = form.children;
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].classList.contains("error")) {
                    inputs[inputs.length - 1].disabled = true;
                    return;
                }
            }
            inputs[inputs.length - 1].disabled = false;
        })
    })
})