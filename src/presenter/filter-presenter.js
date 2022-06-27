import { FilterType, UpdateType } from '../const';
import MovieNavigation from '../view/movie-navigation';
import { filter } from '../util';
import { render, RenderPosition, remove } from '../framework/render';


export default class FilterPresenter {
  #filmsCardModel = null;
  #navMenu = null;
  #navMenuPlace = null;

  getFilmsFilterLength = (films) => {
    const filterFilms = films;
    return ({
      wishlist: filter[FilterType.WATCH_LIST](filterFilms).length,
      history: filter[FilterType.ALREADY_WATCHED](filterFilms).length,
      favorites: filter[FilterType.FAVORITE](filterFilms).length,
    });
  };

  init = (main, filterNavMenu, films) => {
    this.#filmsCardModel = films;
    const filterLength = this.getFilmsFilterLength(this.#filmsCardModel.films);
    this.#navMenuPlace = main;
    this.filterNavMenu = filterNavMenu;
    this.#navMenu = new MovieNavigation(filterLength, this.filterNavMenu);
    render(this.#navMenu, this.#navMenuPlace, RenderPosition.AFTERBEGIN);
    this.#navMenu.setClickNavHandler(this.#filterChang);
  };

  reset = (films) => {
    this.#filmsCardModel = films;
    const filterLength = this.getFilmsFilterLength(this.#filmsCardModel.films);
    this.#navMenu.reset(filterLength);
  };

  #filterChang = (filterType) => {
    if (this.filterNavMenu.filters === filterType) {
      return;
    }
    this.filterNavMenu.setFilter(UpdateType.MAJOR, filterType);
  };

  destroy = () => {
    remove(this.#navMenu);
  };
}


