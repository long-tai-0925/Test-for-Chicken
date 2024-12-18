const itemsPerPage = 2;
let currentPage = 1;
let products = [];
let totalPages = 0;
const productContainer = document.querySelector('.product-container');
const prevButton = document.querySelector('.page-button:first-child');
const nextButton = document.querySelector('.page-button:last-child');
async function fetchProducts() {
    try {
        const response = await fetch('/json/product.json');
        if (!response.ok) {
            throw new Error('無法載入產品資料');
        }
        products = await response.json();
        totalPages = Math.ceil(products.length / itemsPerPage);
        renderProducts(currentPage);
    } catch (error) {
        console.error(error);
    }
}
function renderProducts(page) {
    productContainer.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = Math.min(page * itemsPerPage, products.length);
    for (let i = start; i < end; i++) {
        const product = products[i];
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="item-content">${product.name}</div>
        `;
        productContainer.appendChild(productItem);
    }
    prevButton.style.display = (page === 1) ? 'none' : 'inline-block';
    nextButton.style.display = (page === totalPages) ? 'none' : 'inline-block';
}
fetchProducts();
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
