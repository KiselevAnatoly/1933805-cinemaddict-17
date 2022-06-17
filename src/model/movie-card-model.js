import { generateMovie} from '../mock/movie-card';
import { generateComment } from '../mock/comments';
import Observable from '../framework/observable';

const MOVIES_COUNT = 18;
const COMMENTS_COUNT = 57;

export default class MovieModel extends Observable {
  #films = Array.from({length: MOVIES_COUNT}, generateMovie);
  #comments = Array.from({length: COMMENTS_COUNT}, generateComment);

  get films () {
    return this.#films;
  }

  get comments () {
    return this.#comments;
  }
}

export{COMMENTS_COUNT,MOVIES_COUNT};
