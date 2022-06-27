
import AbstractView from '../framework/view/abstract-view';
import { SortType} from '../const';

const createSortTemplate = (currentSortType) => `<ul class="sort">
<li><a href="#" class="sort__button ${ currentSortType === SortType.DEFAULT ? 'sort__button--active' : ''} " data-sort-type = ${SortType.DEFAULT} >Sort by default</a></li>
<li><a href="#" class="sort__button ${ currentSortType === SortType.DATA ? 'sort__button--active' : ''}" data-sort-type = ${SortType.DATA}>Sort by date</a></li>
<li><a href="#" class="sort__button ${ currentSortType === SortType.RATING ? 'sort__button--active' : ''}" data-sort-type = ${SortType.RATING}>Sort by rating</a></li>
</ul>`;

export default class MovieSort extends AbstractView {
  #currentSortType = SortType.DEFAULT;
  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate (this.#currentSortType);
  }

  #sortClickHandler= (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.click(evt.target.dataset.sortType);
  };

  setClickTypeSortHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#sortClickHandler);
  };
}
