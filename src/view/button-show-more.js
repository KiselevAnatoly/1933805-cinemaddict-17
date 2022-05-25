import View from './view-class';

const createShowMoreButtonTemplate = () =>
  `<button class="films-list__show-more">Show more
  </button>`;

export default class ButtonShowMore extends View {

  constructor() {
    super();
  }

  get template() {
    return createShowMoreButtonTemplate();
  }

}
