fetch('/json/product.json')
  .then(response => response.json())
  .then(products => {
    const productList = document.getElementById('product-list');
    const prevButton = document.querySelector('.p-prev');
    const nextButton = document.querySelector('.p-next');

    const productsPerPage = 6; // 每頁顯示的商品數量
    let currentPage = 1;

    function displayProducts(category = null) {
      let currentProducts = products;
      if (category) {
        currentProducts = currentProducts.filter(product => product.category === category);
      }

      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      currentProducts = currentProducts.slice(startIndex, endIndex);

      productList.innerHTML = '';

      currentProducts.forEach(product => {
        const productElement = `
          <div class="product-item"> 
            <img src="${product.image}" alt="${product.name}">
            <div class="item-content"> 
              <h3>${product.name}</h3> 
            </div>
          </div>
        `;
        productList.innerHTML += productElement;
      });

      // 重新計算分頁按鈕狀態
      const totalPages = Math.ceil(currentProducts.length / productsPerPage);
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;
    }

    // 初始顯示所有商品
    displayProducts();

    // 監聽導航連結點擊事件
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const category = link.dataset.category;
        displayProducts(category);
        currentPage = 1; // 重置頁碼到第一頁
      });
    });

    function changePage(page) {
      currentPage = page;
      displayProducts();
    }

    prevButton.addEventListener('click', () => changePage(currentPage - 1));
    nextButton.addEventListener('click', () => changePage(currentPage + 1));
  });

  const prevButton = document.querySelector('.i-prev');
  const nextButton = document.querySelector('.i-next');
  const image = document.querySelector('.image-container img');
  const images = [
    '/img/board/1.png',
    '/img/board/2.png',
    '/img/board/3.png',
    '/img/board/4.png',
    '/img/board/5.png',
    '/img/board/6.png',
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