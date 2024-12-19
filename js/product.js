const productConfig = {
    itemsPerPage: 6,
    currentPage: 1,
    products: [],
    totalPages: 0,
    imagesFolder: '/img/product/',
    fileExtension: '.jpg',
};

const productContainer = document.querySelector('.product-container');
const prevButton = document.querySelector('.page-button.prev');
const nextButton = document.querySelector('.page-button.next');

async function fetchSettings() {
    try {
        const response = await fetch('/setting.json');
        if (!response.ok) throw new Error('無法載入設定資料');
        const settings = await response.json();

        const config = settings[document.body.getAttribute('data-config')]?.product;
        if (config) {
            Object.assign(productConfig, config); // 合併配置
        }

        fetchProducts();
    } catch (error) {
        console.error('載入 product 設定資料錯誤:', error);
    }
}

async function fetchProducts() {
    try {
        const response = await fetch('/json/product.json');
        if (!response.ok) throw new Error('無法載入產品資料');
        productConfig.products = await response.json();
        productConfig.totalPages = Math.ceil(productConfig.products.length / productConfig.itemsPerPage);
        renderProducts(productConfig.currentPage);
    } catch (error) {
        console.error('載入產品資料錯誤:', error);
    }
}

function renderProducts(page) {
    productContainer.innerHTML = '';
    const start = (page - 1) * productConfig.itemsPerPage;
    const end = Math.min(page * productConfig.itemsPerPage, productConfig.products.length);

    for (let i = start; i < end; i++) {
        const product = productConfig.products[i];
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <img src="${productConfig.imagesFolder}${product.img}${productConfig.fileExtension}" 
                 alt="${product.name}" 
                 loading="lazy">
            <div class="item-content">${product.name}</div>
        `;
        productContainer.appendChild(productItem);
    }

    prevButton.style.display = page === 1 ? 'none' : 'inline-block';
    nextButton.style.display = page === productConfig.totalPages ? 'none' : 'inline-block';
}

prevButton.addEventListener('click', () => {
    if (productConfig.currentPage > 1) {
        productConfig.currentPage--;
        renderProducts(productConfig.currentPage);
    }
});

nextButton.addEventListener('click', () => {
    if (productConfig.currentPage < productConfig.totalPages) {
        productConfig.currentPage++;
        renderProducts(productConfig.currentPage);
    }
});

fetchSettings();
