
import AbstractView from '../framework/view/abstract-view';
const createNavigationTemplate = (watchlistCount, historyCount, favoritesCount) =>  `<nav class="main-navigation">
<a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
<a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
<a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyCount}</span></a>
<a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>
</nav>`;

export default class MovieNavigation extends AbstractView {
  #watchlistCount= null;
  #historyCount=null;
  #favoritesCount=null;

  constructor(filmList) {
    super();
    this.filmList = filmList;

    for (let i = 0; i < this.filmList.length; i++) {
      const movie = this.filmList[i];
      if (movie.userDetails.watchlist) {
        this.#watchlistCount++;
      }
      if (movie.userDetails.alreadyWatched) {
        this.#historyCount++;
      }
      if (movie.userDetails.favorite) {
        this.#favoritesCount++;
      }
    }

  }

  get template() {
    return createNavigationTemplate(this.#watchlistCount, this.#historyCount, this.#favoritesCount);
  }

}
