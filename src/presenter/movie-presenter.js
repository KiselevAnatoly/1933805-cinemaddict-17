import { render, remove,replace } from '../framework/render';
import MovieView from '../view/movie-films';
import MovieList from '../view/movie-list';
import MovieRated from '../view/movie-rated';
import MovieCommented from '../view/movie-commented';
import ButtonShowMore from '../view/button-show-more';
import MovieNavigation from '../view/movie-filter';
import {MovieSort,SortType} from '../view/movie-sort';

import EmptyMovieList from '../view/empty-list-template ';
import { updateItem, sortFilm }  from '../util';
import FilmPresenter from './movie-presenter2';

const MOVIE_COUNT_STEP = 5;
const FILMS_LIST_CONTAINER = 2;

export default class FilmSectionPresenter {

  #filmContainer = new MovieView();
  #filmList = new MovieList();
  #filmListContainer = this.#filmList.element.querySelector('.films-list__container');
  #showMoreFilmComponent = new ButtonShowMore();
  #topRatedFilms = new MovieRated();
  #mostCommentedFilms = new MovieCommented();
  #sortComponent = new MovieSort();
  #mainBlock = null;
  #filmsModel = null;
  #filmsList = null;
  #commentList = null;
  #filmPresenter = new Map();
  #topRatedFilmPresenter = new Map();
  #mostCommentedFilmPresenter = new Map();
  #renderedFilmCount = null;
  #MOVIE_COUNT_STEP = MOVIE_COUNT_STEP;
  #FILMS_LIST_CONTAINER = FILMS_LIST_CONTAINER;
  #currentSortType = SortType.DEFAULT;
  #sourcedFilmSection = [];
  #mainNavView = null;

  constructor(filmSectionContainer, filmModel) {
    this.#mainBlock = filmSectionContainer;
    this.#filmsModel = filmModel;
  }

  updateMainNav = () => {
    const mainNav = new MovieNavigation(this.#filmsList);
    replace(mainNav, this.#mainNavView);
    this.#mainNavView = mainNav;
  };


  init = () => {

    this.#filmsList = this.#filmsModel.films;
    this.#commentList = this.#filmsModel.comments;
    this.#renderedFilmCount = this.#MOVIE_COUNT_STEP;
    this.#sourcedFilmSection = this.#filmsList.slice();
    this.#mainNavView = new MovieNavigation(this.#filmsList);
    render(this.#mainNavView, this.#mainBlock);
    this.#renderSort();

    render(this.#filmContainer, this.#mainBlock);
    render(this.#filmList, this.#filmContainer.element);


    if (this.#filmsList.length === 0) {
      render(new EmptyMovieList,this.#filmList.element);
    } else {

      for (let i = 0; i < this.#filmsList.length; i++) {
        this.#filmsList[i].id = i;
      }
      this.#renderFilmList();

    }
    this.#additionalFilmTops(this.#filmsList);

  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainBlock);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #handleSortTypeChange = (sortType) => {
    this.#sortFilms(sortType);
    this.#clearTaskList();
    this.#renderFilmList();
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#filmsList.sort(sortFilm);
        break;
      case SortType.RATING:
        this.#filmsList.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
        break;
      default:
        this.#filmsList = [...this.#sourcedFilmSection];
    }

    this.#currentSortType = sortType;
  };


  #renderFilm = (film, container, map) => {
    const filmPresenter = new FilmPresenter(this.#commentList, this.#changeData, container, this.updateMainNav);
    filmPresenter.init(film);
    map.set(film.id, filmPresenter);
  };


  #renderFilms = (from, to, list, container,map) => {
    list
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film, container,map));
  };

  #renderFilmList = () => {
    this.#renderFilms(0, Math.min(this.#filmsList.length, this.#MOVIE_COUNT_STEP), this.#filmsList, this.#filmListContainer, this.#filmPresenter);

    if (this.#filmsList.length > this.#MOVIE_COUNT_STEP) {
      render(this.#showMoreFilmComponent, this.#filmListContainer, 'afterend');
      this.#showMoreFilmComponent.setClickHandler(this.#handleShowMoreButtonClick);
    }
  };


  #changeData = (film) => {
    this.#filmsList = updateItem(this.#filmsList, film);
    if (this.#topRatedFilmPresenter.get(film.id)) {
      this.#topRatedFilmPresenter.get(film.id).init(film);
    }

    if (this.#mostCommentedFilmPresenter.get(film.id)) {
      this.#mostCommentedFilmPresenter.get(film.id).init(film);
    }

    if (this.#filmPresenter.get(film.id)) {
      this.#filmPresenter.get(film.id).init(film);
    }
  };


  #additionalFilmTops = (filmsList) => {
    render(this.#mostCommentedFilms, this.#filmList.element, 'afterend');
    render(this.#topRatedFilms, this.#filmList.element, 'afterend');

    const mostCommentedFilms = [...filmsList.sort((a, b) => b.filmInfo.commentCount - a.filmInfo.commentCount)];
    const topRatedFilms = [...filmsList.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)];

    this.#renderFilms(0, this.#FILMS_LIST_CONTAINER, mostCommentedFilms, this.#mostCommentedFilms.element.querySelector('.films-list__container'), this.#topRatedFilmPresenter);
    this.#renderFilms(0, this.#FILMS_LIST_CONTAINER, topRatedFilms, this.#topRatedFilms.element.querySelector('.films-list__container'), this.#mostCommentedFilmPresenter);

  };


  #clearTaskList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = MOVIE_COUNT_STEP;
    remove(this.#showMoreFilmComponent);
  };


  #handleShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + this.#MOVIE_COUNT_STEP, this.#filmsList, this.#filmListContainer, this.#filmPresenter);

    this.#renderedFilmCount += this.#MOVIE_COUNT_STEP;

    if (this.#renderedFilmCount >= this.#filmsList.length) {
      remove(this.#showMoreFilmComponent);
    }
  };

}


