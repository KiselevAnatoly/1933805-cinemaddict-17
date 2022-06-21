import { generateComment } from '../mock/comments';
import Observable from '../framework/observable';

const COMMENTS_COUNT = 57;

export default class CommentModel extends Observable {
  #comments = Array.from({ length: COMMENTS_COUNT }, generateComment);

  get comments () {
    return this.#comments;
  }

  set comments(comments) {
    this.#comments = comments;
  }

  deleteComment = (updateType, id) => {
    this.#comments = this.#comments.filter((comment) => comment.id !== id);

    this._notify(updateType, id);
  };

  addComment = (updateType, update) => {
    this.#comments.push(update);

    this._notify(updateType, update);
  };
}
