
import PopupFilmPresenter from '../presenter/popup-film-presenter';
import MovieCard from '../view/movie-card';
import { render, remove } from '../framework/render';
import { ControlDetailsFilmCard } from '../util';
import { UserAction, UpdateType } from '../const';


export default class MoviePresenter {
  #filmsContainer = null;
  #filmCard = null;
  constructor(filmsContainer, body, renderFilmsCard, openPopup, filmComments) {
    this.#filmsContainer = filmsContainer;
    this.body = body;
    this.renderFilmsCard = renderFilmsCard;
    this.openPopup = openPopup;
    this.filmCommits = filmComments;
    this.filmControlDetailId = null;
  }

  get filmControlDetail() {
    return this.filmControlDetailId;
  }

  init = (filmModel) => {
    this.filmCardModel = filmModel;
    this.#filmCard = new MovieCard(this.filmCardModel);
    render(this.#filmCard, this.#filmsContainer);
    this.#filmCard.setClickOpenPopupHandler(this.#setClickPopupHandler);
    this.#filmCard.setFilmDetailsControlHandler(this.#getFilmDetailsControlButton);

  };

  destroy = () => {
    remove(this.#filmCard);
  };

  initPopup = () => {
    this.openPopup.open.init(this.body, this.filmCardModel, this.filmCommits, this.openPopup);
  };


  resetPopup = (filmInfo, disabled) => {
    this.filmCardModel = filmInfo;
    this.#filmCard.reset(filmInfo, disabled);
    this.openPopup.open.update(filmInfo, this.openPopup.open);
  };

  resetFilmCard = (ControlDetails, film) => {
    switch (ControlDetails) {
      case ControlDetailsFilmCard.UNBLOCK_CONTROL_PANEL:
        this.#filmCard.unblock();
        break;
      case ControlDetailsFilmCard.UPDATE_CONTROL_PANEL:
        this.#filmCard.reset(film);
    }
  };

  #isPopupOpen() {
    if (this.openPopup.open !== null) {
      this.openPopup.open.remove();
    }
  }

  #getFilmDetailsControlButton = (evt) => {
    while (evt.target.id) {
      if (evt.target.id === 'watchList') {
        this.filmControlDetailId = evt.target.id;
        this.#filmCard.block();
        const updateFilm = this.filmCardModel;
        updateFilm.userDetails.watchlist = !updateFilm.userDetails.watchlist;
        this.renderFilmsCard(UserAction.UPDATE_FILM, UpdateType.MINOR, updateFilm);
        break;
      }
      if (evt.target.id === 'alreadyWatched') {
        this.filmControlDetailId = evt.target.id;
        this.#filmCard.block();
        const updateFilm = this.filmCardModel;
        updateFilm.userDetails.alreadyWatched = !updateFilm.userDetails.alreadyWatched;
        this.renderFilmsCard(UserAction.UPDATE_FILM, UpdateType.MINOR, updateFilm);
        break;
      }
      if (evt.target.id === 'favorite') {
        this.filmControlDetailId = evt.target.id;
        this.#filmCard.block();
        const updateFilm = { ...this.filmCardModel };
        updateFilm.userDetails.favorite = !updateFilm.userDetails.favorite;
        this.renderFilmsCard(UserAction.UPDATE_FILM, UpdateType.MINOR, updateFilm);
        break;
      }
      break;
    }

  };

  #setClickPopupHandler = () => {
    this.#isPopupOpen();
    this.openPopup.open = new PopupFilmPresenter(this.renderFilmsCard);
    this.filmCommits.init(this.filmCardModel);
  };
}
