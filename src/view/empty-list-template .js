import { FilterType } from '../const';
import AbstractView from '../framework/view/abstract-view';

const NoFilmsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

const createEmptyMovieListTemplate = (filterType) => {
  const noFilmsText = NoFilmsTextType[filterType];

  return (
    `<section class="films">
    <section class="films-list">
        <h2 class="films-list__title">${noFilmsText}</h2>
    </section>
  </section>`
  );
};

export default class EmptyMovieList extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyMovieListTemplate(this.#filterType);
  }
}
