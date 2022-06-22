
import AbstractView from '../framework/view/abstract-view';
const createShowMoreButtonTemplate = () =>
  `<button class="films-list__show-more">Show more
  </button>`;

export default class ButtonShowMore extends AbstractView {

  get template() {
    return createShowMoreButtonTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#handleClick);
  };

  #handleClick = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}

