const bodyEl = document.querySelector("body");
const imageAuthorEl = document.getElementById("image-author");
const unsplashApiUrl =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature";
const cryptoApiUrl = "https://api.coingecko.com/api/v3/coins/";

fetch(unsplashApiUrl)
  .then((resp) => resp.json())
  .then((data) => {
    //   ADDING RANDOM BACKGROUND IMAGE FROM UNSPLASH API
    bodyEl.style.backgroundImage = `url("${data.urls.full}")`;
    imageAuthorEl.innerText = `Author: ${data.user.name}`;
  })
  // ADDING AN ALTERNATIVE IMAGE IF THERE IS AN ERROR GETTING THE IMAGE FROM THE API - IF THE PROMISE IS REJECTED
  .catch((err) => {
    bodyEl.style.backgroundImage = `url("https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDIxOTY1Nzk&ixlib=rb-1.2.1&q=85")`;
    imageAuthorEl.innerText = "Author: Ishan @seefromthesky";
    console.log(err);
  });

// FETCH DATA FROM COIN GECKO API - CRYPTOCURRENCY
fetch(`${cryptoApiUrl}dogecoin`)
  .then((resp) => resp.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
