import { createElement } from '../render.js';

const showMoreButton = () => '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreButton  {
  getTemplate() {
    return showMoreButton();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
