
import AbstractView from '../framework/view/abstract-view';
const createMovieListContainerTemplate = () =>
  `<div class="films-list__container">
  </div>`;

export default class MovieListContainer extends AbstractView {

  get template() {
    return createMovieListContainerTemplate();
  }

}
