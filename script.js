const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let totalImages = 0;
let imagesLoaded = 0;
let ready = false;

const count = 3;
const apiKey = "E9_NXOhExBjb7WqTDgu94YrCXjR9u6ZicJicxFud7QI";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Get Photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const photosArray = await response.json();
    displayPhotos(photosArray);
    loader.hidden = true;
  } catch (error) {
    console.log(error);
  }
}

function displayPhotos(photosArray) {
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    let anchorTag = document.createElement("a");
    anchorTag.setAttribute("href", photo.links.html);
    anchorTag.setAttribute("target", "_blank");
    anchorTag.innerHTML = `<img src=${photo.urls.small} alt=${photo.alt_description} onload='imageLoaded()'>`;
    imageContainer.appendChild(anchorTag);
  });
}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    imagesLoaded = 0;
    ready = true;
  }
}

// Check to see if scrolling is at the bottom of the page, & load more photos if so:
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight > 0.75 * document.body.offsetHeight &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
