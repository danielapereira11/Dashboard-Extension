const bodyEl = document.querySelector("body");
const unsplashApiUrl =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature";

fetch(unsplashApiUrl)
  .then((resp) => resp.json())
  .then(
    (data) =>
      //   ADDING RANDOM BACKGROUND IMAGE FROM UNSPLASH API
      (bodyEl.style.backgroundImage = `url("${data.urls.full}")`)
  );
