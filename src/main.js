import MovieNavigation from './view/movie-filter';
import { render } from './render';
import MovieSort from './view/movie-sort';
import HeaderProfile from './view/header-profile';
import FilmSectionPresenter from './presenter/movie-presenter';
import MovieModel from './model/movie-card-model';

const movieModel = new MovieModel();

const mainBlock = document.querySelector('.main');
const header = document.querySelector('.header');

const filmSectionPresenter = new FilmSectionPresenter();


render(new MovieNavigation(), mainBlock);
render(new MovieSort(), mainBlock);
render(new HeaderProfile(), header);


filmSectionPresenter.init(mainBlock, movieModel);
