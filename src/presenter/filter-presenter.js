import {FilterType, UpdateType} from '../const';
import MovieNavigation from '../view/movie-filter';
import { filter } from '../util';
import { render, replace, remove } from '../framework/render';


export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filmsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, filmsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const films = this.#filmsModel.films;

    return {
      [FilterType.ALL]: {name: 'All movies', count: filter[FilterType.ALL](films).length},
      [FilterType.WATCHLIST]: {name: 'Watchlist ', count: filter[FilterType.WATCHLIST](films).length},
      [FilterType.HISTORY]: {name: 'History ', count: filter[FilterType.HISTORY](films).length},
      [FilterType.FAVORITES]: {name: 'Favorites ', count: filter[FilterType.FAVORITES](films).length}
    };
  }

  init () {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new MovieNavigation(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {

    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

}
