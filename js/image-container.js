const imageConfig = {
  currentImageIndex: 1,
  totalImages: 6,
  slideInterval: 2000,
  imagesFolder: '/img/board/',
  fileExtension: '.png',
};

const imageElement = document.getElementById('slideshow');
let autoSlideInterval;
let isUserClicking = false;

const configType = document.body.getAttribute('data-config');

// 載入 image-container 設定
fetch('/setting.json')
  .then(response => response.json())
  .then(data => {
      const config = data[configType]?.['image-container'];
      if (config) {
          Object.assign(imageConfig, config); // 合併配置
      }
      startAutoSlide();
  })
  .catch(error => console.error('載入 image-container 設定檔錯誤:', error));

function changeImage() {
  imageElement.src = `${imageConfig.imagesFolder}${imageConfig.currentImageIndex}${imageConfig.fileExtension}`;
}

function prevImage() {
  isUserClicking = true;
  imageConfig.currentImageIndex =
      imageConfig.currentImageIndex === 1 ? imageConfig.totalImages : imageConfig.currentImageIndex - 1;
  changeImage();
  resetAutoSlide();
}

function nextImage() {
  isUserClicking = true;
  imageConfig.currentImageIndex =
      imageConfig.currentImageIndex === imageConfig.totalImages ? 1 : imageConfig.currentImageIndex + 1;
  changeImage();
  resetAutoSlide();
}

function startAutoSlide() {
  if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
  }
  autoSlideInterval = setInterval(nextImage, imageConfig.slideInterval);
}

function resetAutoSlide() {
  if (!isUserClicking) {
      startAutoSlide();
  } else {
      setTimeout(() => {
          isUserClicking = false;
          startAutoSlide();
      }, imageConfig.slideInterval);
  }
}
