import { render, remove } from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import MovieView from '../view/movie-films';
import MovieList from '../view/movie-list';
import MovieContainer from '../view/movie-container';
import ButtonShowMore from '../view/button-show-more';
import MovieSort from '../view/movie-sort';
import { sortByDate, filter, sortByRating } from '../util';
import FilmPresenter from './movie-presenter';
import { SortType, UserAction, UpdateType, Mode, FilterType } from '../const';
import LoadingView from '../view/loading-view';

const MOVIE_COUNT_STEP = 5;
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
export default class BoardPresenter {

  #contentContainer = null;
  #filmsModel = null;
  #filterModel = null;
  #sortComponent = null;
  #showMoreButtonComponent = null;
  #noFilmsComponent = null;
  #filmApiService = null;

  #renderedFilmsCount = MOVIE_COUNT_STEP;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  #isLoading = true;

  #sectionFilmsComponent = new MovieView();
  #filmsListComponent = new MovieList();
  #filmsContainerComponent = new MovieContainer();
  #loadingComponent = new LoadingView();

  #filmPresentersMap = new Map();

  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  #openPopupId = null;
  #popupScroll = null;

  constructor(contentContainer, filmsModel, filterModel, filmApiService) {
    this.#contentContainer = contentContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;
    this.#filmApiService = filmApiService;

    this.#filmsModel.addObserver(this.#handleFilmsModelEvent);
    this.#filterModel.addObserver(this.#handleFilmsModelEvent);
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortByDate);
      case SortType.RATING:
        return filteredFilms.sort(sortByRating);
    }

    return filteredFilms;
  }

  init = () => {
    this.#renderContent();
  };

  #handleViewAction = async (actionType, updateType, update, popupMode, popupScroll) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_FILM:
        if (popupMode === Mode.POPUP) {
          this.#openPopupId = update.id;
          this.#popupScroll = popupScroll;
        }
        try {
          await this.#filmsModel.updateFilm(updateType, update);
        } catch (err) {
          this.#filmPresentersMap.get(update.id).setAborting(UserAction.UPDATE_FILM);
        }
        break;
      default:
        this.#popupScroll = popupScroll;
        try {
          await this.#filmsModel.updateFilm(updateType, update);
        } catch (err) {
          this.#filmPresentersMap.get(update.id).renderComponents();
        }
    }

    this.#uiBlocker.unblock();
  };

  #handleFilmsModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresentersMap.get(data.id).setPopupScroll(this.#popupScroll);
        this.#filmPresentersMap.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearContent();
        this.#renderContent();
        break;
      case UpdateType.MAJOR:
        this.#openPopupId = null;
        this.#clearContent({ resetRenderedFilmsCount: true, resetSortType: true });
        this.#renderContent();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderContent();
        break;
    }
  };

  #handleShowMoreButtonClick = () => {
    const filmsCount = this.films.length;
    const newRenderedFilmsCount = Math.min(filmsCount, this.#renderedFilmsCount + MOVIE_COUNT_STEP);
    const films = this.films.slice(this.#renderedFilmsCount, newRenderedFilmsCount);

    this.#renderFilms(films);
    this.#renderedFilmsCount = newRenderedFilmsCount;

    if (this.#renderedFilmsCount >= filmsCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleModeChange = () => {
    this.#filmPresentersMap.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearContent({ resetRenderedFilmsCount: true });
    this.#renderContent();
  };

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilmCard(film));
  };

  #renderFilmCard = (film) => {
    const filmPresenter = new FilmPresenter(
      this.#filmsContainerComponent,
      this.#handleViewAction,
      this.#handleModeChange,
      this.#filmApiService,
      this.#uiBlocker
    );

    if (film.id === this.#openPopupId) {
      filmPresenter.setPopupOpen();
      filmPresenter.setPopupScroll(this.#popupScroll);
      this.#openPopupId = null;
    }

    filmPresenter.init(film);
    this.#filmPresentersMap.set(film.id, filmPresenter);
  };

  #renderSort = () => {
    this.#sortComponent = new MovieSort(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#contentContainer);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#contentContainer);
  };


  #renderFilmsListContainer = () => {
    render(this.#sectionFilmsComponent, this.#contentContainer);
    render(this.#filmsListComponent, this.#sectionFilmsComponent.element);
    render(this.#filmsContainerComponent, this.#filmsListComponent.element);
  };

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ButtonShowMore();
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
  };

  #clearContent = ({ resetRenderedFilmsCount = false, resetSortType = false } = {}) => {
    const filmsCount = this.films.length;

    this.#filmPresentersMap.forEach((presenter) => presenter.destroy());
    this.#filmPresentersMap.clear();

    remove(this.#loadingComponent);
    remove(this.#sortComponent);
    remove(this.#showMoreButtonComponent);
    remove(this.#filmsContainerComponent);
    remove(this.#filmsListComponent);
    remove(this.#sectionFilmsComponent);

    if (this.#noFilmsComponent) {
      remove(this.#noFilmsComponent);
    }

    if (resetRenderedFilmsCount) {
      this.#renderedFilmsCount = MOVIE_COUNT_STEP;
    } else {
      this.#renderedFilmsCount = Math.min(filmsCount, this.#renderedFilmsCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderContent = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const films = this.films;
    const filmsCount = films.length;

    this.#renderSort();
    this.#renderFilmsListContainer();

    this.#renderFilms(films.slice(0, Math.min(filmsCount, this.#renderedFilmsCount)));

    if (filmsCount > this.#renderedFilmsCount) {
      this.#renderShowMoreButton();
    }
  };
}
