import { generateMovie} from '../mock/movie-card';
import { generateComment } from '../mock/comments';

const MOVIES_COUNT = 18;
const COMMENTS_COUNT = 57;

export default class MovieModel {
  #films = Array.from({length: MOVIES_COUNT}, generateMovie);
  #comments = Array.from({length: COMMENTS_COUNT}, generateComment);

  get films () {
    return this.#films;
  }

  get comments () {
    return this.#comments;
  }
}
