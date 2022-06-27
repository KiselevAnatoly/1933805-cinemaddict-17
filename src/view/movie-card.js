
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getYearFromDate, getRuntime,getNormalDescription,getFilmCardControlActive } from '../util';


const createMovieCard = (filmInfo, isDisabled) => {
  const {
    comments,
    filmInfo:{title, totalRating, poster,
      release:{date},
      runtime,
      genre :allGenre,
      description},
    userDetails
  } = filmInfo;
  const normalGenre = allGenre[0];
  const normalDescription = getNormalDescription(description);
  const releaseDate = getYearFromDate(date);
  const runtimeHourMinute = getRuntime(runtime);
  return (  `<article class="film-card" width="230">
<a class="film-card__link">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${releaseDate}</span>
    <span class="film-card__duration">${runtimeHourMinute}</span>
    <span class="film-card__genre">${normalGenre}</span>
  </p>
  <img src=${poster} alt="" class="film-card__poster" width="230">
  <p class="film-card__description">${normalDescription}</p>
  <span class="film-card__comments">${comments.length} comments</span>
</a>
<div class="film-card__controls">
  <button  class="film-card__controls-item film-card__controls-item--add-to-watchlist ${getFilmCardControlActive(userDetails.watchlist)}" id="watchList" type="button" ${isDisabled ? 'disabled' : ''}>Add to watchList</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${getFilmCardControlActive(userDetails.alreadyWatched)}" id="alreadyWatched" type="button" ${isDisabled ? 'disabled' : ''}>Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite ${getFilmCardControlActive(userDetails.favorite)}" id="favorite" type="button" ${isDisabled ? 'disabled' : ''}>Mark as favorite</button>
</div>
</article>`);
};

export default class MovieCard extends AbstractStatefulView{
  #filmInfo = null;
  #prevFilmInfo = null;
  #isDisabled = false;
  constructor( filmInfo) {
    super();
    this.#filmInfo = filmInfo;
  }

  get template() {
    return createMovieCard(this.#filmInfo, this.#isDisabled);
  }

  reset = (filmInfo) => {
    this._state = {};
    this.#filmInfo = filmInfo;
    this.#isDisabled = false;
    this.updateElement(this.#filmInfo);

  };

  block = () => {
    this._state = {};
    this.#isDisabled = true;
    this.updateElement( this.#prevFilmInfo);
  };

  unblock = () => {
    this._state = {};
    this.#isDisabled = false;
    this.updateElement(this.#prevFilmInfo);
  };

  _restoreHandlers = () => {
    this.element.querySelector('.film-card__controls').addEventListener('click', this.#addDetailsControl);
    this.element.querySelector('.film-card__link').addEventListener('click', this.#setClickHandler);
  };

  #setClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #addDetailsControl = (evt) => {
    evt.preventDefault();
    this._callback.clickFilmDetailsControl(evt);
  };

  setClickOpenPopupHandler = (callback ) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#setClickHandler);
  };

  setFilmDetailsControlHandler = (callback) => {
    this.#prevFilmInfo = {...this.#filmInfo};
    this._callback.clickFilmDetailsControl = callback;
    this.element.querySelector('.film-card__controls').addEventListener('click', this.#addDetailsControl);
  };

}
