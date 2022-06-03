import View from './view-class';

const createEmptyMovieListTemplate = () =>
  '<h2 class="films-list__title">There are no movies in our database</h2>';

export default class EmptyMovieList extends View {

  constructor() {
    super();
  }

  get template() {
    return createEmptyMovieListTemplate();
  }

}
