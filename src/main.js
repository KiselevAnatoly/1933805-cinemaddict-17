import UserProfilePresenter from './presenter/user-profile-presenter';
import BoardPresenter from './presenter/board-presenter';
import MovieCardModel from './model/movie-card-model';
import CommentsModel from './model/comments-model';
import FilmsApiService from './api-serv';
import { render } from './framework/render';
import MovieList from './view/movie-list';


const AUTHORIZATION = 'Basic Anatoly';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const userProfilePresenter = new UserProfilePresenter(siteHeaderElement);
const main = document.querySelector('.main');
const body = document.querySelector('body');
const filmApiService = new FilmsApiService(END_POINT, AUTHORIZATION);
const filmsModel = new MovieCardModel(filmApiService);
const filmsComment = new CommentsModel(filmApiService);
filmsModel.init();
render(new MovieList(), main);
const filmsContainer = main.querySelector('.films-list__container');
const filmsCatalogPresenter = new BoardPresenter
(filmsContainer, filmsModel, body, filmsComment, userProfilePresenter);
filmsCatalogPresenter.init();
