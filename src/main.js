
import {render} from './framework/render';
import UserRaiting from './view/user-raiting';
import FilmSectionPresenter from './presenter/movie-presenter';
import MovieModel from './model/movie-card-model';
import CommentModel from './model/comment-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const movieModel = new MovieModel();
const commentModel = new CommentModel();
const filterModel = new FilterModel();
const mainBlock = document.querySelector('.main');
const header = document.querySelector('.header');

const filmSectionPresenter = new FilmSectionPresenter(mainBlock, movieModel, commentModel, filterModel);
const filterPresenter = new FilterPresenter(mainBlock, filterModel, movieModel);

render(new UserRaiting(), header);
filterPresenter.init();
filmSectionPresenter.init(mainBlock, movieModel);
