
import AbstractView from '../framework/view/abstract-view';

const createEmptyMovieListTemplate = () =>
  '<h2 class="films-list__title">There are no movies in our database</h2>';

export default class EmptyMovieList extends AbstractView {


  get template() {
    return createEmptyMovieListTemplate();
  }

}
