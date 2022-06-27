import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { FilterType } from '../const';

const createNavigationTemplate = (films, filterModels) => {
  const {wishlist, history, favorites} = films;
  return (`<nav class="main-navigation">
<a href="#all" class="main-navigation__item
${(filterModels === FilterType.All) ? 'main-navigation__item--active' : '' } "
 data-filter-type = ${FilterType.All}>All movies</a>
<a href="#watchList" class="main-navigation__item
${(filterModels === FilterType.WATCH_LIST) ? 'main-navigation__item--active' : '' }"
data-filter-type = ${FilterType.WATCH_LIST}>WatchList <span class="main-navigation__item-count">${wishlist}</span></a>
<a href="#history" class="main-navigation__item
${(filterModels === FilterType.ALREADY_WATCHED) ? 'main-navigation__item--active' : '' }"
data-filter-type = ${FilterType.ALREADY_WATCHED}>History <span class="main-navigation__item-count">${history}</span></a>
<a href="#favorites" class="main-navigation__item
${(filterModels === FilterType.FAVORITE) ? 'main-navigation__item--active' : '' }"
data-filter-type = ${FilterType.FAVORITE}>Favorites <span class="main-navigation__item-count">${favorites}</span></a>
</nav>`
  );
};

export default class MovieNavigation extends AbstractStatefulView {
  constructor(films, filterModel) {
    super();
    this._state.filter = filterModel.filter;
    this._state.films = films;
  }

  get template() {
    return createNavigationTemplate(this._state.films, this._state.filter);
  }

  reset = (films) => {
    this._state.films = films;
    this.updateElement(this._state.films);
  };

  _restoreHandlers = () => {
    this.element.addEventListener('click', this.#navMenuClickHandler);
  };

  #navMenuClickHandler = (evt) => {
    if(evt.target.tagName === 'A'){
      evt.preventDefault();
      this._callback.clickNav(evt.target.dataset.filterType);
    }
  };

  setClickNavHandler = (callback) => {
    this._callback.clickNav = callback;
    this.element.addEventListener('click', this.#navMenuClickHandler);
  };
}
