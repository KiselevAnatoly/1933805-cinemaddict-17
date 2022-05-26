import View from './view-class';

const createMovieListContainerTemplate = () =>
  `<div class="films-list__container">
  </div>`;

export default class MovieListContainer extends View {

  constructor() {
    super();
  }

  get template() {
    return createMovieListContainerTemplate();
  }

}
