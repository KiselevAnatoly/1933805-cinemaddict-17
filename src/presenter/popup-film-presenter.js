import MovieDetails from '../view/movie-details';
import { render } from '../framework/render';
import { UserAction, UpdateType} from '../const';

export default class PopupFilmPresenter {
  #filmsContainer = null;
  #filmComments = null;
  #popup = null;
  #renderFilmsCard = null;
  constructor (renderFilmsCard, filmControlDetailId) {
    this.#renderFilmsCard = renderFilmsCard;
    this.filmControlDetailId = filmControlDetailId;
  }

  get popup () {
    return this.#popup.element;
  }

  init = (filmContainer, filmCardModel, filmComments, openPopup) => {
    this.#filmsContainer = filmContainer;
    this.filmCardModel = filmCardModel;
    this.#filmComments = filmComments;
    this.openPopup = openPopup;
    this.#popup = new MovieDetails( this.filmCardModel, this.#filmComments, this.filmControlDetailId);
    render (this.#popup, this.#filmsContainer);
    this.#filmsContainer.classList.add('hide-overflow');
    this.#popup.setCommitCatalogHandler(this.submitComment);
    this.#popup.setDeleteCommentHandler(this.deleteCommentFilm);
    this.#popup.setEventCloseHandler(() => {
      this.#filmsContainer.classList.remove('hide-overflow');
      this.openPopup.open.remove();
      this.openPopup.open = null;
    });
    this.#getFilmDetailsControlButton();
  };

  update = (filmInfo, openPopup) => {
    this.filmCardModel = filmInfo;
    this.openPopup.open = openPopup;
    this.#popup.reset(this.filmCardModel);
    this.#filmsContainer.classList.add('hide-overflow');
    this.#popup.setCommitCatalogHandler(this.submitComment);
    this.#popup.setDeleteCommentHandler(this.deleteCommentFilm);
    this.#popup.setEventCloseHandler(() => {
      this.#filmsContainer.classList.remove('hide-overflow');
      this.openPopup.open.remove();
      this.openPopup.open = null;
    });
    this.#getFilmDetailsControlButton();
  };

  remove = () => {
    this.#filmsContainer.removeChild(this.#popup.element);
    this.#popup.removeElement();
    this.#popup.removeGlobalEvent();
  };

  block = () => {
    this.#popup.block();
  };

  shakeElement = (shakeClass) => {
    this.#popup.shake(null, shakeClass);
    this.#popup.unblock();
  };

  deleteCommentFilm = (deleteCommentId) => {
    this.filmCardModel.comments = this.filmCardModel.comments.filter((comment)=>comment !== deleteCommentId);
    this.#renderFilmsCard(UserAction.DELETE_COMMENT, UpdateType.PATCH, this.filmCardModel, deleteCommentId);

  };

  submitComment = (filmInfo, newCommentInfo ) => {
    this.#renderFilmsCard(UserAction.ADD_FILM_COMMENT, UpdateType.PATCH, filmInfo, newCommentInfo);
  };

  #getFilmDetailsControlButton = () => {
    this.#popup.setFilmDetailsControlHandler((evt) => {
      while(evt.target.id){
        if(evt.target.id === 'watchList') {
          this.openPopup.controlDetailId = evt.target.id;
          this.#popup.block();
          const updateFilm = this.filmCardModel;
          updateFilm.userDetails.watchlist = !updateFilm.userDetails.watchlist;
          this.#renderFilmsCard(UserAction.UPDATE_FILM, UpdateType.MINOR, updateFilm);
          break;
        }
        if(evt.target.id === 'alreadyWatched') {
          this.openPopup.controlDetailId = evt.target.id;
          this.#popup.block();
          const updateFilm = this.filmCardModel;
          updateFilm.userDetails.alreadyWatched = ! updateFilm.userDetails.alreadyWatched;
          this.#renderFilmsCard(UserAction.UPDATE_FILM, UpdateType.MINOR,  updateFilm);
          break;
        }
        if(evt.target.id === 'favorite') {
          this.openPopup.controlDetailId = evt.target.id;
          this.#popup.block();
          const updateFilm = this.filmCardModel;
          updateFilm.userDetails.favorite = !updateFilm.userDetails.favorite;
          this.#renderFilmsCard(UserAction.UPDATE_FILM, UpdateType.MINOR, updateFilm);
          break;
        }
        break;
      }
    });
  };
}
