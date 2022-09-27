const modal = () => {
  const modal = document.querySelector('.search-model'),
      searchBtn = document.querySelector('.search-switch'),
      searchCloseBtn = modal.querySelector('.search-close-switch');

  searchBtn.addEventListener('click', () => modal.style.display = 'block');
  searchCloseBtn.addEventListener('click', () => modal.style.display = 'none');
};

modal();