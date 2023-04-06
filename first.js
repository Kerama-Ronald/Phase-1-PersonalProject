

   // get form elements
const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

// form submission handler
form.addEventListener("submit", function(event) {
  // prevent default form submission behavior
  event.preventDefault();

  // validate form inputs
  if (nameInput.checkValidity() && emailInput.checkValidity() && messageInput.checkValidity()) {
    // create and send form data
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "path/to/server", true);
    xhr.send(formData);

    // reset form
    form.reset();
  }
});

// form reset handler
form.addEventListener("reset", function(event) {
  // clear form validation messages
  nameInput.setCustomValidity("");
  emailInput.setCustomValidity("");
  messageInput.setCustomValidity("");
});
