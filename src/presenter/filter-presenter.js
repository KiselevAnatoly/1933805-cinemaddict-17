import { FilterType, UpdateType } from '../const';
import MovieNavigation from '../view/movie-navigation';
import { filterFilms } from '../util';
import { render, RenderPosition, remove } from '../framework/render';


export default class FilterPresenter {
  #filmsCardModel = null;
  #navMenu = null;
  #navMenuPlace = null;

  getFilmsFilterLength = (films) => {
    const filteredFilms = films;
    return ({
      wishlist: filterFilms[FilterType.WATCH_LIST](filteredFilms).length,
      history: filterFilms[FilterType.ALREADY_WATCHED](filteredFilms).length,
      favorites: filterFilms[FilterType.FAVORITE](filteredFilms).length,
    });
  };

  init = (main, filterNavMenu, films) => {
    this.#filmsCardModel = films;
    const filterLength = this.getFilmsFilterLength(this.#filmsCardModel.films);
    this.#navMenuPlace = main;
    this.filterNavMenu = filterNavMenu;
    this.#navMenu = new MovieNavigation(filterLength, this.filterNavMenu);
    render(this.#navMenu, this.#navMenuPlace, RenderPosition.AFTERBEGIN);
    this.#navMenu.setClickNavHandler(this.#filterChange);
  };

  reset = (films) => {
    this.#filmsCardModel = films;
    const filterLength = this.getFilmsFilterLength(this.#filmsCardModel.films);
    this.#navMenu.reset(filterLength);
  };

  #filterChange = (filterType) => {
    if (this.filterNavMenu.filters === filterType) {
      return;
    }
    this.filterNavMenu.setFilter(UpdateType.MAJOR, filterType);
  };

  destroy = () => {
    remove(this.#navMenu);
  };
}


