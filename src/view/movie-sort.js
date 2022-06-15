
import AbstractView from '../framework/view/abstract-view';


const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};


const createSortTemplate = () =>
  `<ul class="sort">
<li><a href="#" class="sort__button" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
<li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
<li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
</ul>`;

export default class MovieSort extends AbstractView {
  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

}


export{SortType,MovieSort};
