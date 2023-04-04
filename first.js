// Fetch the data from the JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Loop through the cryptocurrencies and create a flipping card for each one
    data.cryptoCurrencies.forEach(cryptoCurrency => {
      const card = document.createElement('div');
      card.classList.add('col-md-4');
      card.innerHTML = `
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="${cryptoCurrency.image}" alt="${cryptoCurrency.name}" />
            </div>
            <div class="flip-card-back">
              <h2>${cryptoCurrency.name}</h2>
              <p>${cryptoCurrency.description}</p>
              <p><strong>Year Established:</strong> ${cryptoCurrency.yearEstablished}</p>
              <p><strong>Founders:</strong> ${cryptoCurrency.founders.join(', ')}</p>
            </div>
          </div>
        </div>
      `;
      document.querySelector('.row').appendChild(card);
    });
  });
