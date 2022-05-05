

import MoviesPresenter from './presenter/presenter.js';
const siteMainElement = document.querySelector('.main');
const moviesPresenter = new MoviesPresenter();
moviesPresenter.init(siteMainElement);

