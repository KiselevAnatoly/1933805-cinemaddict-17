import { generateComment } from '../mock/comments';
import Observable from '../framework/observable';
import { COMMENTS_COUNT } from './model/movie-card-model';

export default class MovieModel extends Observable {
  #comments = Array.from({ length: COMMENTS_COUNT }, generateComment);

  get comments() {
    return this.#comments;
  }
}
