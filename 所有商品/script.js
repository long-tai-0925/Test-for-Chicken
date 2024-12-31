fetch('/json/product.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(products => {
    const productList = document.getElementById('product-list');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.textContent = 'Loading...';
    productList.appendChild(loader);

    const productsPerPage = 6;
    let currentPage = 1;
    let currentCategory = null;

    function displayProducts(category = null) {
      currentCategory = category;
      let filteredProducts = category
        ? products.filter(product => product.category === category)
        : products;

      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const currentProducts = filteredProducts.slice(startIndex, endIndex);

      productList.innerHTML = '';

      if (currentProducts.length === 0) {
        productList.innerHTML = '<p>QQ 沒有這個分類的商品.json</p>';
        if (loader && productList.contains(loader)) {
          productList.removeChild(loader);
        }
        return;
      }

      currentProducts.forEach(product => {
        const productElement = `
          <div class="product-item">
            <a href="${product.url}"> <img src="${product.image}" alt="${product.name}"></a>
            <div class="item-content">
              <h3>${product.name}</h3>
            </div>
          </div>
        `;
        productList.innerHTML += productElement;
      });

      const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

      // Pagination button logic
      if (totalPages === 1) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
      } else if (currentPage === 1) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'block';
      } else if (currentPage === totalPages) {
        prevButton.style.display = 'block';
        nextButton.style.display = 'none';
      } else {
        prevButton.style.display = 'block';
        nextButton.style.display = 'block';
      }

      if (loader && productList.contains(loader)) {
        productList.removeChild(loader);
      }
    }

    displayProducts();

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        currentPage = 1;
        displayProducts(link.dataset.category);
      });
    });

    function changePage(page) {
      currentPage = page;
      displayProducts(currentCategory);
    }

    prevButton.addEventListener('click', () => changePage(currentPage - 1));
    nextButton.addEventListener('click', () => changePage(currentPage + 1));
  })
  .catch(error => {
    const productList = document.getElementById('product-list');
    console.error('Error fetching products:', error);
    productList.innerHTML = 'Error loading products';
    if (loader && productList.contains(loader)) {
      productList.removeChild(loader);
    }
  });

const burger = document.querySelector('.burger');
const navUl = document.querySelector('nav ul');

burger.addEventListener('click', () => {
  if (navUl.style.display === 'none' || navUl.style.display === '') {
    navUl.style.display = 'block';
  } else {
    navUl.style.display = 'none';
  }
});
