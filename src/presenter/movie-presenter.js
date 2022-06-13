import { render, remove } from '../framework/render';
import MovieView from '../view/movie-films';
import MovieList from '../view/movie-list';
import MovieRated from '../view/movie-rated';
import MovieCommented from '../view/movie-commented';
import ButtonShowMore from '../view/button-show-more';
import MovieNavigation from '../view/movie-filter';
import MovieSort from '../view/movie-sort';

import MovieListContainer from '../view/movie-container';

import { updateItem } from '../util';
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
  #renderedFilmCount = null;
  #MOVIE_COUNT_STEP = MOVIE_COUNT_STEP;
  #FILMS_LIST_CONTAINER = FILMS_LIST_CONTAINER;

  init = (mainBlock, filmsModel) => {

    this.#mainBlock = mainBlock;
    this.#filmsModel = filmsModel;
    this.#filmsList = this.#filmsModel.films;
    this.#commentList = this.#filmsModel.comments;
    this.#renderedFilmCount = this.#MOVIE_COUNT_STEP;


    render(new MovieNavigation(this.#filmsList), this.#mainBlock);
    this.#renderSort();

    render(this.#filmContainer, this.#mainBlock);
    render(this.#filmList, this.#filmContainer.element);


    if (this.#filmsList.length === 0) {
      render(new MovieListContainer, this.#filmListContainer.element);
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

  };

  #renderFilm = (film, container) => {
    const filmPresenter = new FilmPresenter(this.#commentList, this.#changeData, container);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilms = (from, to, list, container) => {
    list
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film, container));
  };

  #renderFilmList = () => {
    this.#renderFilms(0, Math.min(this.#filmsList.length, this.#MOVIE_COUNT_STEP), this.#filmsList, this.#filmListContainer);

    if (this.#filmsList.length > this.#MOVIE_COUNT_STEP) {
      render(this.#showMoreFilmComponent, this.#filmListContainer, 'afterend');
      this.#showMoreFilmComponent.setClickHandler(this.#handleShowMoreButtonClick);
    }
  };


  #changeData = (film) => {
    this.#filmsList = updateItem(this.#filmsList, film);
    this.#filmPresenter.get(film.id).init(film, this.#filmListContainer);
  };

  #additionalFilmTops = (filmsList) => {
    const mostCommentedFilms = filmsList.slice();
    const topRatedFilms = filmsList.slice();

    mostCommentedFilms.sort((a, b) => b.filmInfo.commentCount - a.filmInfo.commentCount);
    topRatedFilms.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);

    render(this.#mostCommentedFilms, this.#filmList.element, 'afterend');
    render(this.#topRatedFilms, this.#filmList.element, 'afterend');

    this.#renderFilms(0, this.#FILMS_LIST_CONTAINER, mostCommentedFilms, this.#mostCommentedFilms.element.querySelector('.films-list__container'));
    this.#renderFilms(0, this.#FILMS_LIST_CONTAINER, topRatedFilms, this.#topRatedFilms.element.querySelector('.films-list__container'));


  };


  #handleShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + this.#MOVIE_COUNT_STEP, this.#filmsList, this.#filmListContainer);

    this.#renderedFilmCount += this.#MOVIE_COUNT_STEP;

    if (this.#renderedFilmCount >= this.#filmsList.length) {
      remove(this.#showMoreFilmComponent);
    }
  };

}


