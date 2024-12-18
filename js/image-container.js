let currentImageIndex = 1;
const imageElement = document.getElementById('slideshow');
let totalImages = 6; // 預設數量
let slideInterval = 2000; // 預設間隔時間
let imagesFolder = '/img/';
let fileExtension = '.jpg';
let autoSlideInterval;
let isUserClicking = false;

// 取得 data-config 屬性，這個屬性會決定載入的設定
const configType = document.body.getAttribute('data-config');

// 讀取設定檔
fetch('/setting.json')
  .then(response => response.json())
  .then(data => {
    const config = data[configType]; // 根據頁面指定的類型載入設定

    if (config) {
      const imageContainer = config["image-container"];
      if (imageContainer) {
        totalImages = imageContainer.totalImages || totalImages;
        slideInterval = imageContainer.slideInterval || slideInterval;
        imagesFolder = imageContainer.images || imagesFolder;
        fileExtension = imageContainer.fileExtension || fileExtension;
      }

      const product = config.product;
      if (product) {
        itemsPerPage = product.itemsPerPage || itemsPerPage;
      }
      
      // 開始自動切換圖片
      startAutoSlide();
    }
  })
  .catch(error => console.error('載入設定檔錯誤:', error));

function changeImage() {
  imageElement.src = `${imagesFolder}${currentImageIndex}${fileExtension}`;
}

function prevImage() {
  isUserClicking = true;
  currentImageIndex = (currentImageIndex === 1) ? totalImages : currentImageIndex - 1;
  changeImage();
  resetAutoSlide();
}

function nextImage() {
  isUserClicking = true;
  currentImageIndex = (currentImageIndex === totalImages) ? 1 : currentImageIndex + 1;
  changeImage();
  resetAutoSlide();
}

function startAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
  autoSlideInterval = setInterval(nextImage, slideInterval);
}

function resetAutoSlide() {
  if (!isUserClicking) {
    startAutoSlide();
  } else {
    setTimeout(() => {
      isUserClicking = false;
      startAutoSlide();
    }, slideInterval);
  }
}
