import { render, remove, RenderPosition } from '../framework/render';
import FilterModel from '../model/filter-model';
import NoFilmCard from '../view/no-films-card';
import MoviePresenter from './movie-presenter';
import FilterPresenter from './filter-presenter';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import ButtonShowMore from '../view/button-show-more';
import MovieSort from '../view/movie-sort';
import StatisticsView from '../view/statistics-view';
import { sortFilmDate, filterFilms, sortFilmRating, } from '../util';
import { SortType, UserAction, UpdateType, ShakeClass} from '../const';
import LoadingView from '../view/loading-view';
import { ControlDetailsFilmCard } from '../util';

const MOVIE_COUNT_STEP = 5;
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
export default class BoardPresenter {

  #filmsCardModel =  null;
  #openPopup = {
    open: null,
  };

  #currentSortType = SortType.DEFAULT;
  #noFilmCard = null;
  #buttonShowMore = null;
  #filmRenderCount = MOVIE_COUNT_STEP;
  #buttonPlace = null;
  #filmCardPresenters = new Map();
  #navMenuPresenter = null;
  #filterNavMenu = null;
  #sort = null;
  #loadingView = new LoadingView();
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);
  #avatarRankPresenter = null;
  constructor (filmContainer, filmsCardModel, body, filmComment, avatarRank){
    this.filmComment = filmComment;
    this.filmContainer = filmContainer;
    this.#filmsCardModel =  filmsCardModel;
    this.body = body;
    this.#buttonPlace = this.body.querySelector('.films-list');
    this.menuPlace = this.body.querySelector('.main');
    this.#filterNavMenu = new FilterModel();
    this.#navMenuPresenter = new FilterPresenter();
    this.#avatarRankPresenter = avatarRank;
    this.#filmsCardModel.addObserver(this.#handleModelEvent);
    this.#filterNavMenu.addObserver(this.#handleModelEvent);
    this.filmComment.addObserver(this.#handleModelEvent);
  }

  get filmsModelsFiltered () {
    const filmsModelsBase = this.#filmsCardModel.films;
    const filterType = this.#filterNavMenu.filter;
    const filmsModelsFiltered = filterFilms[filterType](filmsModelsBase);
    switch (this.#currentSortType) {
      case SortType.DATA:
        return [...filmsModelsFiltered].sort(sortFilmDate);

      case SortType.RATING:
        return [...filmsModelsFiltered].sort(sortFilmRating);

    }
    return filmsModelsFiltered;
  }

  init = () => {
    this.#renderFilmsBoard();
  };

  #renderFilmLoading = () =>{
    render(this.#loadingView, this.filmContainer);

  };

  #renderSort = () => {
    this.#sort = new MovieSort(this.#currentSortType);
    render(this.#sort, this.menuPlace, RenderPosition.AFTERBEGIN);
    this.#sort.setClickTypeSortHandler(this.#setSortTypeHandler);
  };

  #renderShowMoreButton = () => {
    this.#buttonShowMore = new ButtonShowMore();
    render(this.#buttonShowMore, this.#buttonPlace);
    this.#buttonShowMore.setClickMoreFilmHandler(this.clickMoreFilmsButtonHandler);
  };

  #removeButtonShowMore = () => {
    this.#buttonPlace.removeChild(this.#buttonShowMore.element);
    this.#buttonShowMore.removeElement();
  };

  #renderNoFilmsCards = () => {
    remove(this.#loadingView);
    this.#noFilmCard = new NoFilmCard(this.#filterNavMenu.filter);
    render (this.#noFilmCard, this.#buttonPlace);
  };

  #renderFilms = (films) => {
    films.forEach((film) => {
      this.#renderFilmCard(this.filmContainer, this.body, film, this.#openPopup);
    });
  };

  #renderFilmCard = (filmContainer, body, filmModel, openPopup) => {
    const filmPresenter =  new MoviePresenter(filmContainer, body, this.#handleViewAction, openPopup, this.filmComment);
    filmPresenter.init(filmModel);
    this. #filmCardPresenters.set(filmModel.id, filmPresenter);
  };

  #renderFilmsBoard = () => {
    if(this.#isLoading) {
      this.#renderFilmLoading();
      return;
    }
    this.#avatarRankPresenter.init(this.#filmsCardModel.films);

    const filmsModelsLength = this.filmsModelsFiltered.length;
    if(filmsModelsLength === 0) {
      this.#navMenuPresenter.init(this.menuPlace, this.#filterNavMenu, this.#filmsCardModel);
      this.#renderNoFilmsCards();
    } else {
      this.#renderSort();
      this.#navMenuPresenter.init(this.menuPlace, this.#filterNavMenu, this.#filmsCardModel);
      const films = this.filmsModelsFiltered.slice(0, Math.min(filmsModelsLength,this.#filmRenderCount));
      this.#renderFilms(films);
      if(filmsModelsLength > this.#filmRenderCount) {
        this.#renderShowMoreButton();
      }
    }
    this.#renderFooterStatistics();
  };

  #clearFilmBoard = ({resetRenderedFilmsCount = false, resetSortType = false}={}) => {
    const filmCount = this.filmsModelsFiltered.length;
    this. #filmCardPresenters.forEach((filmCard) => filmCard.destroy());
    this. #filmCardPresenters.clear();
    remove(this.#sort);
    remove(this.#buttonShowMore);
    remove(this.#noFilmCard);
    remove(this.#loadingView);
    this.#navMenuPresenter.destroy();
    this.#avatarRankPresenter.destroy();

    if(resetRenderedFilmsCount) {
      this.#filmRenderCount = MOVIE_COUNT_STEP;
    }else{
      this.#filmRenderCount = Math.min(filmCount, this.#filmRenderCount);
    }
    if(resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #setSortTypeHandler = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearFilmBoard({resetRenderedFilmsCount: true});
    this.#renderFilmsBoard();
  };

  #handleViewAction = async (actionType, updateType, update,comment) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.ADD_FILM_COMMENT:
        this.#openPopup.open.block();
        try{
          await this.filmComment.addNewComment(update, comment);
        }catch (err){
          this.#openPopup.open.shakeElement(ShakeClass.POPUP);
        }
        break;
      case UserAction.UPDATE_FILM:

        try{
          await this.#filmsCardModel.updateFilms(updateType, update);
        }catch (err) {
          if(this.#openPopup.open === null) {
            this.#filmCardPresenters.get(update.id).resetFilmCard(ControlDetailsFilmCard.UNBLOCK_CONTROL_PANEL);
          }else {
            this.#openPopup.open.shakeElement(ShakeClass.POPUP_DETAILS);
          }
        }
        break;
      case UserAction.DELETE_COMMENT:
        this.#openPopup.open.block();
        try{
          await this.filmComment.deleteComment(updateType, update, comment);
        }catch (err) {
          this.#openPopup.open.shakeElement(ShakeClass.POPUP_COMMENTS);
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, updateInfo) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmCardPresenters.get(updateInfo.id).resetPopup(updateInfo);
        break;
      case UpdateType.MINOR:
        if(this.#filterNavMenu.filter === this.#filmCardPresenters.get(updateInfo.id).filmControlDetail
        || this.#filterNavMenu.filter === this.#openPopup.controlDetailId){
          this.#handleModelEvent(UpdateType.MAJOR, updateInfo);
          return;
        }
        this.#avatarRankPresenter.destroy();
        if(this.#openPopup.open !== null){
          this.#avatarRankPresenter.init(this.#filmsCardModel.films);
          this.#filmCardPresenters.get(updateInfo.id).resetPopup(updateInfo);
          this.#navMenuPresenter.reset(this.#filmsCardModel);
          this.#filmCardPresenters.get(updateInfo.id).resetFilmCard(ControlDetailsFilmCard.UPDATE_CONTROL_PANEL, updateInfo);
          return;
        }
        this.#avatarRankPresenter.init(this.#filmsCardModel.films);
        this.#filmCardPresenters.get(updateInfo.id).resetFilmCard(ControlDetailsFilmCard.UPDATE_CONTROL_PANEL, updateInfo);
        this.#navMenuPresenter.reset(this.#filmsCardModel);
        break;
      case UpdateType.MAJOR:
        if(this.#openPopup.open !== null){
          this.#clearFilmBoard({resetRenderedFilmsCount: true, resetSortType: true});
          this.#renderFilmsBoard();
          this.#filmCardPresenters.get(updateInfo.id).initPopup();
          return;
        }
        this.#clearFilmBoard({resetRenderedFilmsCount: true, resetSortType: true});
        this.#renderFilmsBoard();

        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingView);
        this.#renderFilmsBoard();
        break;
      case UpdateType.INIT_POPUP:
        this.#filmCardPresenters.get(updateInfo.id).initPopup();
        break;

    }
  };

  #renderFooterStatistics = () => {
    const statisticsContainer = document.querySelector('.footer__statistics');
    statisticsContainer.innerHTML = '';
    render(new StatisticsView(this.#filmsCardModel.films), statisticsContainer);
  };

  clickMoreFilmsButtonHandler = () => {
    const filmsModelsLength = this.filmsModelsFiltered.length;
    const filmsModelsFiltered = this.filmsModelsFiltered;
    const newRenderFilmsModelsCount = Math.min(filmsModelsLength,this.#filmRenderCount+MOVIE_COUNT_STEP);
    const films = filmsModelsFiltered.slice(this.#filmRenderCount, newRenderFilmsModelsCount);
    this.#renderFilms(films);
    this.#filmRenderCount = newRenderFilmsModelsCount;
    if(this.#filmRenderCount >= filmsModelsLength){

      this.#removeButtonShowMore();
    }
  };
}
