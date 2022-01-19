const bodyEl = document.querySelector("body");
const imageAuthorEl = document.getElementById("image-author");
const unsplashApiUrl =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature";
const cryptoApiUrl = "https://api.coingecko.com/api/v3/coins/";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
const weatherApiKey = "7df6c65e200126c6e7cd1b9752957b4c";
const weatherLocation = document.getElementById("weather-header");
const weatherDataEl = document.getElementById("weather-data");
let weatherInputValue;
let latitude;
let longitude;

// DISPLAY TIME //
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

// ..END OF DISPLAY TIME //

// USING UNSPLASH API FOR BACKGROUND IMAGE //
fetch(unsplashApiUrl)
  .then((resp) => resp.json())
  .then((data) => {
    //   ADDING RANDOM IMAGE
    bodyEl.style.backgroundImage = `url("${data.urls.full}")`;
    imageAuthorEl.innerText = `Image By: ${data.user.name}`;
  })
  // ADDING AN ALTERNATIVE IMAGE IF THERE IS AN ERROR GETTING THE IMAGE FROM THE API - IF THE PROMISE IS REJECTED
  .catch((err) => {
    bodyEl.style.backgroundImage = `url("https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDIxOTY1Nzk&ixlib=rb-1.2.1&q=85")`;
    imageAuthorEl.innerText = "Image By: Ishan @seefromthesky";
    console.log(err);
  });

// ..END OF USING UNSPLASH API FOR BACKGROUND IMAGE //

// FETCH DATA FROM COIN GECKO API -CRYPTOCURRENCY- AND DISPLAY IT IN DOM //
function getCrypto(event) {
  event.preventDefault();

  // GETTING VALUE FROM INPUT FIELD
  let cryptoInputValue = document.getElementById("crypto-input").value;
  const chosenCryptoDiv = document.getElementById("crypto-chosen-container");

  fetch(`${cryptoApiUrl}${cryptoInputValue}`)
    .then((resp) => {
      if (!resp.ok) {
        throw Error("Crypto data not available");
      }
      return resp.json();
    })
    .then((data) => {
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
    .catch((err) => {
      chosenCryptoDiv.innerHTML = `<h2 id="crypto-name">Sorry, Crypto data not available</h2>`;
      console.log(err);
    });

  // RESETTING FORM INPUT VALUE
  document.getElementById("crypto-form").reset();
}

document.getElementById("crypto-form").addEventListener("submit", getCrypto);

// ..END OF FETCH DATA FROM COIN GECKO API -CRYPTOCURRENCY- AND DISPLAY IT IN DOM //

// GETTING WEATHER INFORMATION //

// DISPLAYING CURRENT WEATHER
function displayWeather(data) {
  // ADDING THE LOCATION NAME TO DOM
  weatherLocation.innerHTML = data.name;

  // ADDING TO DOM THE WEATHER ICON, DESCRIPTION AND TEMP
  weatherDataEl.innerHTML = `
      <img src="http://openweathermap.org/img/wn/${
        data.weather[0].icon
      }.png" alt="${data.weather[0].description}"/>
      <p>${data.weather[0].description}</p>
      <p>${Math.round(data.main.temp)} ºC</p>
      `;

  // RESETTING FORM INPUT VALUE
  searchLocationWeatherForm.reset();
}

// GETTING CURRENT WEATHER THROUGH COORDINATES
function getCurrentLocationWeather(pos) {
  latitude = pos.coords.latitude;
  longitude = pos.coords.longitude;
  fetch(
    `${weatherApiUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => displayWeather(data))
    .catch((err) => {
      console.log(err);
      weatherLocation.innerHTML = "Sorry, can't find that location 😕";
    });
}

// GETTING CURRENT LOCATION COORDINATES
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentLocationWeather);
}

// GETTING SEARCHED LOCATION WEATHER
function getSearchedLocationWeather(event) {
  event.preventDefault();

  // GETTING VALUE FROM INPUT FIELD
  weatherInputValue = document.getElementById("weather-location-input").value;

  fetch(
    `${weatherApiUrl}?q=${weatherInputValue}&appid=${weatherApiKey}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => displayWeather(data))
    .catch((err) => {
      console.log(err);
      weatherLocation.innerHTML = "Sorry, can't find that location 😕";
    });
}

let searchLocationWeatherForm = document.getElementById("weather-form");
searchLocationWeatherForm.addEventListener(
  "submit",
  getSearchedLocationWeather
);
let locationPinBtn = document.getElementById("location-pin-btn");
locationPinBtn.addEventListener("click", getCurrentLocation);
getCurrentLocation();

// ...END OF GETTING WEATHER INFORMATION //

// DAILY QUOTE API //

function getDailyQuote() {
  const dailyQuoteEl = document.getElementById("daily-quote");
  const dailyQuoteContainer = document.getElementById("daily-quote-container");
  fetch("http://quotes.rest/qod")
    .then((res) => {
      if (!res.ok) {
        throw Error("Quote data not available");
      }
      return res.json();
    })
    .then((data) => {
      dailyQuoteEl.innerHTML = `${data.contents.quotes[0].quote}`;
    })
    .catch((err) => {
      dailyQuoteContainer.innerHTML = "";
      console.log(err);
    });
}

getDailyQuote();
