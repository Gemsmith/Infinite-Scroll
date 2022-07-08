const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let totalImages = 0;
let imagesLoaded = 0;
let ready = false;

const count = 3;
const apiKey_unsplash = 'E9_NXOhExBjb7WqTDgu94YrCXjR9u6ZicJicxFud7QI';
const apiUrl_unsplash = `https://api.unsplash.com/photos/random?client_id=${apiKey_unsplash}&count=${count}`;

const apiKey_pexels = '563492ad6f917000010000011a8f9c78efa54baa9ea6cfb5c7c91213';
const apiUrl_pexels = `https://api.pexels.com/v1/curated`;

// Get Photos from Unsplash API

async function getPhotos() {
  try {
    // unsplash--------------
    const response = await fetch(apiUrl_unsplash);
    const jsonResponse = await response.json();
    displayPhotos(jsonResponse);
    // unsplash--------------

    // pexels--------------
    // const response = await fetch(apiUrl_pexels);
    // const jsonResponse = await response.json();
    // displayPhotos(jsonResponse.photos);
    // pexels--------------

    loader.hidden = true;
  } catch (error) {
    console.log(error);
  }
}

function displayPhotos(photosArray) {
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    let anchorTag = document.createElement('a');
    // unsplash-------------
    anchorTag.setAttribute('href', photo.links.html);
    anchorTag.innerHTML = `<img src=${photo.urls.small} alt=${photo.alt_description} onload='imageLoaded()'>`;
    // unsplash-------------

    // pexels--------------
    // anchorTag.setAttribute('href', photo.url); // pexels [landscape, large, medium, small, portrait are sizes]
    // anchorTag.innerHTML = `<img src=${photo.src.medium} alt=${photo.photographer} onload='imageLoaded()'>`;
    // pexels--------------

    anchorTag.setAttribute('target', '_blank');
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
window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight > 0.75 * document.body.offsetHeight && ready) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
