
window.addEventListener('resize', function() {
    const contentHeight = document.getElementById('.main-content').offsetHeight;
    const footer = document.querySelector('footer');
    footer.style.top = contentHeight + 'px';
  });