import { createElement } from '../render.js';
const createShowMoreTemplate = () => `<section class="films">
<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

  <div class="films-list__container"></div>


  <button class="films-list__show-more">Show more</button>
</section>

</section>`;


export default class ShowMore {
  getTemplate() {
    return createShowMoreTemplate();
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
