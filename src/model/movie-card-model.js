import { generateMovie} from '../mock/movie-card';
import Observable from '../framework/observable';

const MOVIES_COUNT = 18;
const ADDITIONAL_FILM_COUNT = 2;

export default class MovieModel extends Observable {
  #films = Array.from({length: MOVIES_COUNT}, generateMovie);
  #topRatedFilms;
  #mostCommentedFilms;

  get films () {
    return this.#films;
  }

  set films (films) {
    this.#films = films;
  }

  get topRatedFilms () {
    if (!this.#topRatedFilms) {
      this.#topRatedFilms = [...this.films]
        .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
        .slice(0, Math.min(this.films.length, ADDITIONAL_FILM_COUNT));
    }

    return this.#topRatedFilms;
  }

  get mostCommentedFilms () {
    if (!this.#mostCommentedFilms) {
      this.#mostCommentedFilms = [...this.films]
        .sort((a, b) => b.filmInfo.commentCount - a.filmInfo.commentCount)
        .slice(0, Math.min(this.films.length, ADDITIONAL_FILM_COUNT));
    }

    return this.#mostCommentedFilms;
  }

  updateFilm = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this.#mostCommentedFilms = null;
    this.#topRatedFilms = null;

    this._notify(updateType, update);
  };

}
