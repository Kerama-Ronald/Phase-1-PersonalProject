// Fetch the data from db.json
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    // Get the cryptocurrencies array
    const cryptocurrencies = data.cryptoCurrencies;

    // Get the slideshow element from the HTML
    const slideshow = document.getElementById('slideshow');

    // Loop through the cryptocurrencies array
    cryptocurrencies.forEach(crypto => {
      // Create a slide element for each cryptocurrency
      const slide = document.createElement('div');
      slide.classList.add('slide');

      // Create an image element for the cryptocurrency
      const image = document.createElement('img');
      image.src = crypto.image;
      image.alt = crypto.name;

      // Create a heading element for the cryptocurrency name
      const heading = document.createElement('h2');
      heading.textContent = crypto.name;

      // Add the image and heading elements to the slide element
      slide.appendChild(image);
      slide.appendChild(heading);

      // Add the slide element to the slideshow
    //  slideshow.appendChild(slide);
    });

    // Set the first slide to active
    const slides = document.querySelectorAll('.slide');
  //  slides[0].classList.add('active');

    // Start the slideshow timer
    let slideIndex = 0;
    setInterval(() => {
      // Remove the active class from the current slide
    //  slides[slideIndex].classList.remove('active');

      // Increment the slide index
      slideIndex++;

      // If the slide index is greater than the number of slides, reset it to 0
      if (slideIndex >= slides.length) {
        slideIndex = 0;
      }

      // Add the active class to the next slide
     // slides[slideIndex].classList.add('active');
    }, 3000);
  });
// Set the index of the current slide
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style
}

   
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

window.addEventListener('DOMContentLoaded', async () => {
  const flipCards = document.getElementById('flip-cards');

  
const response = await (await fetch('http://localhost:3000/cryptoCurrencies', {method: 'GET'})).json()
console.log(response);
response.forEach((crypto) => {
    console.log(crypto)
    let card = `
    <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src=${crypto.image} alt="Avatar" style="width:300px;height:300px;">
      </div>
      <div class="flip-card-back">
        <h1>${crypto.name}</h1>

        <p>${crypto.description}</p>
      </div>
    </div>
  </div>
    `
    flipCards.innerHTML += card
  })

})
