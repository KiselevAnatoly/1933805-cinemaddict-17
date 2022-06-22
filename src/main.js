
import MoviePresenter from './presenter/movie-presenter';
import FilterPresenter from './presenter/filter-presenter';
import UserProfilePresenter from './presenter/user-profile-presenter';
import MovieCardModel from './model/movie-card-model';
import FilterModel from './model/filter-model';
import FilmsApiService from './api-service';


const AUTHORIZATION = 'Basic Anatoly';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filmApiService = new FilmsApiService(END_POINT, AUTHORIZATION);
const filmsModel = new MovieCardModel(filmApiService);
const filterModel = new FilterModel();
const contentPresenter = new MoviePresenter(siteMainElement, filmsModel, filterModel, filmApiService);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const userProfilePresenter = new UserProfilePresenter(siteHeaderElement, filmsModel);


filterPresenter.init();
contentPresenter.init();
filmsModel.init();
userProfilePresenter.init();


