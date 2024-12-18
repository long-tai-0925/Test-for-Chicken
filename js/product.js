// 初始化設定
const itemsPerPage = 6;  // 每頁顯示的商品數量
let currentPage = 1;  // 當前頁面
let products = [];  // 存放商品資料的陣列
let totalPages = 0;  // 總頁數

const productContainer = document.querySelector('.product-container');  // 產品顯示區
const prevButton = document.querySelector('.page-button.prev');  // 上一頁按鈕
const nextButton = document.querySelector('.page-button.next');  // 下一頁按鈕
const productImagesFolder = '/img/';  // 商品圖片的資料夾
const fileExtension = '.jpg';  // 圖片的副檔名

// 載入商品資料
async function fetchProducts() {
    try {
        const response = await fetch('/json/product.json');
        if (!response.ok) {
            throw new Error('無法載入產品資料');
        }
        products = await response.json();
        console.log('載入的產品資料:', products);  // 檢查載入的資料
        totalPages = Math.ceil(products.length / itemsPerPage);  // 計算總頁數
        console.log('總頁數:', totalPages);  // 檢查總頁數
        renderProducts(currentPage);  // 顯示當前頁面的商品
    } catch (error) {
        console.error('載入產品資料錯誤:', error);
    }
}

// 渲染商品到頁面
function renderProducts(page) {
    productContainer.innerHTML = '';  // 清空產品區域
    const start = (page - 1) * itemsPerPage;  // 計算當前頁面顯示的商品起始位置
    const end = Math.min(page * itemsPerPage, products.length);  // 計算顯示到哪一個商品為止
    for (let i = start; i < end; i++) {
        const product = products[i];
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        // 渲染商品圖片和名稱
        productItem.innerHTML = `
            <img src="${productImagesFolder}${product.img}" alt="${product.name}" loading="lazy">
            <div class="item-content">${product.name}</div>
        `;
        productContainer.appendChild(productItem);  // 添加商品到頁面
    }
    
    // 顯示/隱藏分頁按鈕
    prevButton.style.display = (page === 1) ? 'none' : 'inline-block';
    nextButton.style.display = (page === totalPages) ? 'none' : 'inline-block';
}

// 監聽分頁按鈕
prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderProducts(currentPage);
    }
});
nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        renderProducts(currentPage);
    }
});

// 載入商品資料
fetchProducts();
