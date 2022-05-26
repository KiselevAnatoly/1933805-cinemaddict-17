import View from './view-class';

const createMovieListTemplate = () =>
  `<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`;

export default class MovieList extends View {

  constructor() {
    super();
  }

  get template() {
    return createMovieListTemplate();
  }
}
