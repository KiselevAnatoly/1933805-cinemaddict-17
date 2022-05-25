import { generateMovie} from '../fish/movie-card';
import { generateComment } from '../fish/comments';


export default class MovieModel {
  #films = Array.from({length: 5}, generateMovie);
  #comments = Array.from({length: 25}, generateComment);

  get films () {
    return this.#films;
  }

  get comments () {
    return this.#comments;
  }
}
