
import AbstractView from '../framework/view/abstract-view';
const createMovieContainerTemplate = () =>
  `<div class="films-list__container">
  </div>`;

export default class MovieContainer extends AbstractView {

  get template() {
    return createMovieContainerTemplate();
  }

}
