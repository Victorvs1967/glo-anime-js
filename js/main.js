const main = () => {

  const renderGanresList = ganres => {
    const dropdown = document.querySelector('.header__menu .dropdown');

    ganres.forEach(ganre => {
      dropdown.insertAdjacentHTML('beforeend', `
        <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>      
      `)
    });
    
  };

  const renderAnimeList = (array, ganres) => {
    const product = document.querySelector('.product .col-lg-8');

    ganres.forEach(ganre => {
      const productBlock = document.createElement('div'),
            listBlock = document.createElement('div');
      const list = array.filter(item => item.ganre === ganre);

      productBlock.insertAdjacentHTML('beforeend', `
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-8">
            <div class="section-title">
              <h4>${ganre}</h4>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4">
            <div class="btn__all">
              <a href="/categories.html?ganre=${ganre}" class="primary-btn">View All <span class="arrow_right"></span></a>
            </div>
          </div>
        </div>
      `);

      list.forEach(item => {
        const listTags = document.createElement('ul');
        item.tags.forEach(tag => listTags.insertAdjacentHTML('afterbegin', `<li>${tag}</li>`))
        listBlock.insertAdjacentHTML('beforeend', `
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="product__item">
              <div class="product__item__pic set-bg" data-setbg="${item.image}">
                <div class="ep">${item.rating} / 10</div>
                <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
              </div>
              <div class="product__item__text">
                ${listTags.outerHTML}
                <h5><a href="/anime-details.html?itemId=${item.id}">${item.title}</a></h5>
              </div>
            </div>
          </div>  
        `);
      });

      listBlock.classList.add('row');
      productBlock.append(listBlock);
      product.append(productBlock);
      productBlock.classList.add('mb-5');
      product.querySelectorAll('.set-bg').forEach(item => item.style.backgroundImage = `url('${item.dataset.setbg}')`);
    });
  };

  const renderTopAnime = array => {
    const topViews = document.querySelector('.filter__gallery');

    array.forEach(anime => {
      topViews.insertAdjacentHTML('beforeend', `
        <div class="product__sidebar__view__item set-bg mix" data-setbg="${anime.image}">
          <div class="ep">${anime.rating} / 10</div>
          <div class="view"><i class="fa fa-eye"></i> ${anime.views}</div>
          <h5><a href="/anime-details.html">${anime.title}</a></h5>
        </div>
      `);
    });
    topViews.querySelectorAll('.set-bg').forEach(item => {
      item.style.backgroundImage = `url('${item.dataset.setbg}')`;
    });  
  };

  fetch('https://anime-app-web-default-rtdb.europe-west1.firebasedatabase.app/anime.json')
    .then(data => data.json())
    .then(res => {
      const ganres = new Set();
      res.forEach(anime => ganres.add(anime.ganre));

      renderTopAnime(res.sort((a, b) => a.views < b.views).slice(0, 5));
      renderAnimeList(res, ganres);
      renderGanresList(ganres);
    });
};

main();