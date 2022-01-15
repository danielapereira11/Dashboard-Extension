const bodyEl = document.querySelector("body");
const imageAuthorEl = document.getElementById("image-author");
const unsplashApiUrl =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature";
const cryptoApiUrl = "https://api.coingecko.com/api/v3/coins/";

// DISPLAY TIME
function displayTime() {
  timeEl = document.getElementById("time");
  let hours = new Date().getHours();
  let mins = new Date().getMinutes();
  let secs = new Date().getSeconds();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (mins < 10) {
    mins = `0${mins}`;
  }
  if (secs < 10) {
    secs = `0${secs}`;
  }
  timeEl.innerHTML = `${hours}:${mins}:${secs}`;
}
setInterval(displayTime, 1000);

// USING UNSPLASH API FOR BACKGROUND IMAGE
fetch(unsplashApiUrl)
  .then((resp) => resp.json())
  .then((data) => {
    //   ADDING RANDOM IMAGE
    bodyEl.style.backgroundImage = `url("${data.urls.full}")`;
    imageAuthorEl.innerText = `Author: ${data.user.name}`;
  })
  // ADDING AN ALTERNATIVE IMAGE IF THERE IS AN ERROR GETTING THE IMAGE FROM THE API - IF THE PROMISE IS REJECTED
  .catch((err) => {
    bodyEl.style.backgroundImage = `url("https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDIxOTY1Nzk&ixlib=rb-1.2.1&q=85")`;
    imageAuthorEl.innerText = "Author: Ishan @seefromthesky";
    console.log(err);
  });

// FETCH DATA FROM COIN GECKO API -CRYPTOCURRENCY- AND DISPLAY IT IN DOM
function getCrypto(event) {
  event.preventDefault();

  let cryptoInputValue = document.getElementById("crypto-input").value;

  fetch(`${cryptoApiUrl}${cryptoInputValue}`)
    .then((resp) => resp.json())
    .then((data) => {
      const chosenCryptoDiv = document.getElementById(
        "crypto-chosen-container"
      );
      // ADDING TO DOM COIN IMAGE, NAME AND PRICE
      chosenCryptoDiv.innerHTML = `
      <div id="crypto-chosen-header">
        <img src="${data.image.small}" alt="${data.name} Image" id="crypto-img">
        <h2 id="crypto-name">${data.name}</h2>
      </div>
      <div id="crypto-info">
        <p>💸 Current Price: ${data.market_data.current_price.eur} €</p>
        <p>📈 24H high price: ${data.market_data.high_24h.eur} €</p>
        <p>📉 24H low price: ${data.market_data.low_24h.eur} €</p>
      </div>
      `;
      // HIDING THE INITIAL "CRYPTO" TITLE
      document.getElementById("crypto-label").classList.add("hidden");
    })
    .catch((err) => console.log(err));

  // RESETTING FORM INPUT VALUE
  document.getElementById("crypto-form").reset();
}

document.getElementById("crypto-form").addEventListener("submit", getCrypto);
