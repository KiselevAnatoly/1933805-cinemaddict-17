
import {render, remove} from '../framework/render';
import MovieView from '../view/movie-films';
import MovieList from '../view/movie-list';
import MovieListContainer from '../view/movie-container';
import MovieCard from '../view/movie-card';
import MovieRated from '../view/movie-rated';
import MovieCommented from '../view/movie-commented';
import ButtonShowMore from '../view/button-show-more';
import MovieDetails from '../view/movie-details';
import MoviePopupComment from '../view/movie-popup-comment';
import { keydownEscape } from '../util';
import EmptyMovieList from '../view/empty-list-template ';

const MOVIE_COUNT_STEP = 5;

const getIdFilteredArray = (filmiD, commentsArray) => {
  const fillteredArray = commentsArray.filter((item) => item.id === filmiD);
  return fillteredArray;
};

export default class FilmSectionPresenter {

  #filmContainer = new MovieView();
  #filmList = new MovieList();
  #filmListContainer = new MovieListContainer();
  #showMoreMovieComponent = new ButtonShowMore();
  #mainBlock = null;
  #filmsModel = null;
  #filmsList = null;
  #commentList = null;
  #renderedFilmCount = MOVIE_COUNT_STEP;
  #filteredArray = null;

  init = (mainBlock, filmsModel) => {

    this.#mainBlock = mainBlock;
    this.#filmsModel = filmsModel;
    this.#filmsList = this.#filmsModel.films;
    this.#commentList = this.#filmsModel.comments;

    render(this.#filmContainer, this.#mainBlock);
    render(this.#filmList, this.#filmContainer.element);
    render(this.#filmListContainer, this.#filmList.element);
    render(new MovieRated(), this.#filmContainer.element);
    render(new MovieCommented(), this.#filmContainer.element);

    if (this.#filmsList.length === 0) {
      render(new EmptyMovieList, this.#filmListContainer.element);
    } else {

      for (let i = 0; i < this.#filmsList.length; i++) {
        this.#filmsList[i].id = i;
      }


      for (let i = 0; i < Math.min(this.#filmsList.length, MOVIE_COUNT_STEP); i++) {
        this.#renderFilms(this.#filmsList[i], this.#commentList);
      }

      if (this.#filmsList.length > MOVIE_COUNT_STEP) {
        render(this.#showMoreMovieComponent, this.#filmList.element);
        this.#showMoreMovieComponent.element.addEventListener('click', this.#handleShowMoreButtonClick);
      }

    }

  };

  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#filmsList
      .slice(this.#renderedFilmCount, (this.#renderedFilmCount + MOVIE_COUNT_STEP))
      .forEach((film) => this.#renderFilms(film, this.#commentList));

    this.#renderedFilmCount += MOVIE_COUNT_STEP;

    if (this.#renderedFilmCount >= this.#filmsList.length) {
      remove(this.#showMoreMovieComponent);
    }
  };

  #renderFilms = (film, commentsArray) => {
    const filmCardComponent = new MovieCard(film);
    render(filmCardComponent, this.#filmListContainer.element);

    const renderPopup = () => {

      if (document.querySelector('.film-details')) {
        document.querySelector('.film-details').remove();
      }

      document.body.classList.add('hide-overflow');

      const popupComponent = new MovieDetails(film);
      render(popupComponent, document.querySelector('body'));

      const escKeyDown = (evt) => {

        if (keydownEscape(evt)) {
          remove(popupComponent);
          closeClearFun();
        }
      };

      const closeButtonClick = () => {
        remove(popupComponent);
        closeClearFun();

      };
      function closeClearFun() {
        popupComponent.element.remove();
        document.body.classList.remove('hide-overflow');
        document.removeEventListener('keydown', escKeyDown);
      }
      this.#filteredArray = getIdFilteredArray(film.id, commentsArray);

      commentsArray.forEach((elem) => {
        render(new MoviePopupComment(elem), popupComponent.element.querySelector('.film-details__comments-list'));
      });

      popupComponent.CloseButtonHandler(closeButtonClick);
      document.addEventListener('keydown', escKeyDown);
    };

    filmCardComponent.FilmHandler(renderPopup);

  };
}
