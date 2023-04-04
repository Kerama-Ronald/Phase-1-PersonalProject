const form = document.getElementById("myForm");
form.addEventListener("submit", handleSubmit);function handleSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;  // Do something with the form data
  console.log(name, email, message);  // Reset the form after submission
  form.reset();
}

