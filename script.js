const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const image = document.querySelector('.image-container img');
const images = [
  'img/board/1.png',
  'img/board/2.png',
  'img/board/3.png',
  'img/board/4.png',
  'img/board/5.png',
  'img/board/6.png',
];
let currentImageIndex = 0; // 初始顯示的圖片索引

prevButton.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  image.src = images[currentImageIndex];
});

nextButton.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  image.src = images[currentImageIndex];
});


const burger = document.querySelector('.burger');
const navUl = document.querySelector('nav ul');

burger.addEventListener('click', () => {
  // 檢查 nav ul 目前的 display 屬性
  if (navUl.style.display === 'none' || navUl.style.display === '') {
    navUl.style.display = 'block'; // 或 flex 或 inline-flex，根據您的需求
  } else {
    navUl.style.display = 'none';
  }
});