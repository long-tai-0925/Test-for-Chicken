let currentImageIndex = 1;
const imageElement = document.getElementById('slideshow');
const imagesFolder = '/img/';
const totalImages = 6;
let autoSlideInterval;
let isUserClicking = false;
function changeImage() {
    imageElement.src = `${imagesFolder}${currentImageIndex}.png`;
}
function prevImage() {
    isUserClicking = true;
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages || totalImages;
    changeImage();
    resetAutoSlide();
}
function nextImage() {
    isUserClicking = true;
    currentImageIndex = (currentImageIndex % totalImages) + 1;
    changeImage();
    resetAutoSlide();
}
function startAutoSlide() {
    autoSlideInterval = setInterval(nextImage, 3000);
}
startAutoSlide();