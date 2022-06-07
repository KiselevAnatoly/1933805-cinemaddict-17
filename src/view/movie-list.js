
import AbstractView from '../framework/view/abstract-view';
const createMovieListTemplate = () =>
  `<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`;

export default class MovieList extends AbstractView {

  get template() {
    return createMovieListTemplate();
  }
}
