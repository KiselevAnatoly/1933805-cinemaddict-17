
import {render} from './framework/render';
import StatisticsView from './view/statistics-view';
import FilmSectionPresenter from './presenter/movie-presenter';
import FilterPresenter from './presenter/filter-presenter';
import UserProfilePresenter from './presenter/user-profile-presenter';
import MovieModel from './model/movie-card-model';
import FilterModel from './model/filter-model';
import FilmsApiService from './api-service';
import { UpdateType } from './const';


const AUTHORIZATION = 'Basic Anatoly';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');
const filmApiService = new FilmsApiService(END_POINT, AUTHORIZATION);
const filmsModel = new MovieModel(filmApiService);
const filterModel = new FilterModel();
const contentPresenter = new FilmSectionPresenter(siteMainElement, filmsModel, filterModel, filmApiService);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const userProfilePresenter = new UserProfilePresenter(siteHeaderElement, filmsModel);


filterPresenter.init();
contentPresenter.init();
filmsModel.init();
userProfilePresenter.init();

filmsModel.addObserver((updateType) => {
  if (updateType === UpdateType.INIT) {
    render(new StatisticsView(filmsModel.films), siteFooterStatisticsElement);

  }
});
