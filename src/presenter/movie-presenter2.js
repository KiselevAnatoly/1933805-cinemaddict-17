import MovieCard from '../view/movie-card';
import MovieDetails from '../view/movie-details';
import MoviePopupComment from '../view/movie-popup-comment';
import {render, remove, replace} from '../framework/render';
import { keydownEscape } from '../util';

const getIdFilteredArray = (filmiD, commentsArray) => {
  const fillteredArray = commentsArray.filter((item) => item.id === filmiD);
  return fillteredArray;
};


export default class FilmPresenter {

  #commentList;
  #filteredArray;
  #changeData;
  #filmCardComponent;
  #popupComponent;
  #filmItem;
  #containerBlock;
  #updateMainNav;

  constructor(commentList, changeData, containerBlock, updateMainNav) {
    this.#commentList = commentList;
    this.#changeData = changeData;
    this.#containerBlock = containerBlock;
    this.#updateMainNav = updateMainNav;
  }

  init = (film) => {

    this.#filmItem = film;

    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new MovieCard(film);

    this.#filmCardComponent.setFilmClickHandler(this.#onCardClick);
    this.#filmCardComponent.setWatchlistClickHandler(this.#handleControlClick);
    this.#filmCardComponent.setAlreadyWatchedClickHandler(this.#handleControlClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#handleControlClick);

    if(!prevFilmCardComponent) {
      render(this.#filmCardComponent, this.#containerBlock);
      return;
    }

    if(this.#containerBlock.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }
    remove(prevFilmCardComponent);

  };

  destroy = () => {
    remove(this.#filmCardComponent);
  };

  copyItem = (anoyherTops) => {
    render(this.#filmCardComponent, anoyherTops);
  };


  #onCardClick = () => {
    if(document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
    this.#renderPopup();
  };

  #renderPopup = () => {

    document.body.classList.add('hide-overflow');

    this.#popupComponent = new MovieDetails(this.#filmItem);
    this.#popupComponent.setWatchlistClickHandler(this.#handleControlClick);
    this.#popupComponent.setAlreadyWatchedClickHandler(this.#handleControlClick);
    this.#popupComponent.setFavoriteClickHandler(this.#handleControlClick);

    render(this.#popupComponent, document.querySelector('body'));

    const onEscKeyDown = (evt) => {
      if(keydownEscape(evt)) {
        remove(this.#popupComponent);
        document.body.classList.remove('hide-overflow');
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const onCloseButtonClick = () => {
      remove(this.#popupComponent);
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
    };

    this.#filteredArray = getIdFilteredArray(this.#filmItem.id, this.#commentList);

    for (let i = 0; i < this.#filteredArray.length; i++) {
      render( new MoviePopupComment (this.#filteredArray[i]), this.#popupComponent.element.querySelector('.film-details__comments-list'));
    }

    this.#popupComponent.setCloseButtonClickHandler(onCloseButtonClick);
    document.addEventListener('keydown', onEscKeyDown);
  };


  #handleControlClick = (controlName) => {
    this.#changeData({...this.#filmItem, userDetails: {...this.#filmItem.userDetails, [controlName]: !this.#filmItem.userDetails[controlName]}});
    this.#updateMainNav();
  };

}