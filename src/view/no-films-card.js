import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';

const noFilmsCardType = {
  [FilterType.All]: 'There are no movies in our database',
  [FilterType.WATCH_LIST]: 'There are no movies to watch now',
  [FilterType.ALREADY_WATCHED]: 'There are no watched movies now',
  [FilterType.FAVORITE]: 'There are no favorite movies now',
};

const getDomNoFilmCard = (filterType) => {
  const noFilmsTextValue = noFilmsCardType[filterType];
  return (`<h2 class="films-list__title"> ${noFilmsTextValue} </h2>`);
};

export default class NoFilmCard extends AbstractView {
  #filterType = null;
  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return getDomNoFilmCard(this.#filterType);
  }
}
