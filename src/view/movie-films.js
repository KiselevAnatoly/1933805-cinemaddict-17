import View from './view-class';

const createFilmsTemplate = () =>
  `<section class="films">

    </section>`;

export default class MovieView extends View {

  constructor() {
    super();
  }

  get template() {
    return createFilmsTemplate();
  }


}
