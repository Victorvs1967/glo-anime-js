const detailData = () => {

  const renderGanresList = ganres => {
    const dropdown = document.querySelector('.header__menu .dropdown');

    ganres.forEach(ganre => dropdown.insertAdjacentHTML('beforeend', `
        <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>      
      `)
    );
  };

  const renderAnimeDetails = (array, itemId) => {
    const animeDetail = document.querySelector('.anime__details__content'),
          breadcrumb = document.querySelector('.breadcrumb__links span');

    const anime = array.find(item => item.id === +itemId);
    breadcrumb.textContent = anime.ganre;
    anime ? 
      animeDetail.insertAdjacentHTML('beforeend', `
        <div class="row">
          <div class="col-lg-3">
            <div class="anime__details__pic set-bg" data-setbg="${anime.image}">
              <div class="view"><i class="fa fa-eye"></i> ${anime.views}</div>
            </div>
          </div>
            <div class="col-lg-9">
              <div class="anime__details__text">
                <div class="anime__details__title">
                  <h3>${anime.title}</h3>
                  <span>${anime['original-title']}</span>
                </div>
                <p>${anime.description}</p>
                <div class="anime__details__widget">
                  <div class="row">
                    <div class="col-lg-6 col-md-6">
                      <ul>
                        <li><span>Date aired:</span>${anime.date}</li>
                        <li><span>Rating:</span>${anime.rating}</li>
                        <li><span>Genre:</span>${anime.tags.join(', ')}</li>
                      </ul>
                    </div>
                    <div class="col-lg-6 col-md-6">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      `) : console.log('Anime not found...');
      const animeImage = document.querySelector('.anime__details__pic');
      anime ? animeImage.dataset.setbg = anime.image : console.log('Anime not found...');
      const bgImage = animeDetail.querySelector('.set-bg');
      bgImage.style.backgroundImage = `url('${bgImage.dataset.setbg}')`;  
  
  };

  fetch('https://anime-app-web-default-rtdb.europe-west1.firebasedatabase.app/anime.json')
    .then(data => data.json())
    .then(res => {
      const ganres = new Set();
      const param = new URLSearchParams(window.location.search).get('itemId');
      
      res.forEach(anime => ganres.add(anime.ganre));

      param ? renderAnimeDetails(res, param) : console.log('Anime not found...');
      renderGanresList(ganres);

    });
}

detailData();