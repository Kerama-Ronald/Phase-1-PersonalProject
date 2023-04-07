let currentSlide = 0;
let numOfSlides = 0;

window.addEventListener('DOMContentLoaded', async () => {
  const flipCards = document.getElementById('flip-cards');
  const slider = document.getElementById('slides');
  const dotContainer = document.getElementById("the-dots");

const response = await (await fetch('http://localhost:3000/cryptoCurrencies', {method: 'GET'})).json()
const reviews = await (await fetch('http://localhost:3000/reviews', {method: 'GET'})).json()

response.forEach((crypto, index) => {
    let slide = `
    <div class="slide">
        <img src=${crypto.image} style="width: 100%;">
        <div class="text">${crypto.name}</div>
    </div>
    `;

    let dot = document.createElement('span');
    dot.classList.add('dot')
    if (index == 0){
      dot.classList.add('active');
    }
    dot.setAttribute('data-slider', index)

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

    `;

    flipCards.innerHTML += card
    slider.innerHTML += slide
    dotContainer.appendChild(dot);
  })
  let reviewC = document.getElementById('reviews');

  reviews.forEach((review, index) => {
    
    let rev = `
    <div class="review-card">
    <svg clip-rule="evenodd" class="review-delete" data-card="${review.id}" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
        fill-rule="nonzero" />
    </svg>
    <div class="avatar">
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
      <path
        d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
    </svg>
    </div>
    <div class="review-text">
      <p class="review-name">${review.name}</p>
      <p class="review-message">${review.message}</p>
    </div>
  </div>
    `
    reviewC.innerHTML += rev;

  })

  // SLIDES
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${index * 100}%)`;
    });


    numOfSlides = slides.length - 1;
    const nextSlide = document.querySelector(".next");

    setInterval(slideTimer, 5000)
    // add event listener and navigation functionality
    nextSlide.addEventListener("click", function () {
      // check if current slide is the last and reset current slide
      if (currentSlide === numOfSlides) {
        currentSlide = 0;
      } else {
        currentSlide++;
      }
      //   move slide by -100%
      setSlide();
    });

    // select prev slide button
    const prevSlide = document.querySelector(".prev");

    // add event listener and navigation functionality
    prevSlide.addEventListener("click", function () {
      if (currentSlide === 0) {
        currentSlide = numOfSlides;
      } else {
        currentSlide--;
      }
      setSlide();
    });
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        currentSlide = dot.getAttribute('data-slider');
        setSlide();
      })
    })

    
const reviewDel = document.querySelectorAll(".review-delete");
reviewDel.forEach((card) => {
  card.addEventListener('click', async() => {
    currentCard = card.getAttribute('data-card');
    let del = await fetch(`http://localhost:3000/reviews/${currentCard}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    })
    window.location.reload()
  })
})


})

// get form elements
const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

// form submission handler
form.addEventListener("submit", async (event) => {
  // prevent default form submission behavior
  event.preventDefault();

  // validate form inputs
  if (nameInput.checkValidity() && emailInput.checkValidity() && messageInput.checkValidity()) {
   
    let review = {
      "name": nameInput.value,
      "email": emailInput.value,
      "message": messageInput.value
    }
  
    let upload = await fetch("http://localhost:3000/reviews", {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
      },
    })
  
    // reset form
    form.reset();
    window.location.reload();
  }
});

// form reset handler
form.addEventListener("reset", function(event) {
  // clear form validation messages
  nameInput.setCustomValidity("");
  emailInput.setCustomValidity("");
  messageInput.setCustomValidity("");
});

function setSlide(){
  const slides = document.querySelectorAll(".slide")
  const dots = document.querySelectorAll(".dot")
  dots.forEach((dot,index) => {
    if (index == currentSlide){
      dot.classList.add('active');
    }
    if (dot.classList.contains('active') && index != currentSlide){
      dot.classList.remove('active');
    }
  })
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
  });
}

function slideTimer(){
  if (currentSlide == numOfSlides){
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  setSlide();
}