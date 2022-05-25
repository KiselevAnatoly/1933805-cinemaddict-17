import View from './view-class';
import { humanizeReleaseDate } from '../util';


const createMoviePopupComments = (commentArrayItem) => {
  const {comment, author, emotion, date} = commentArrayItem;

  const commentDate = date !== null
    ? humanizeReleaseDate(date, 'YYYY/M/D H:m')
    : '';

  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
  </span>
  <div>
    <p class="film-details__comment-text">${comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${commentDate}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};

export default class MoviePopupComment extends View {

  constructor(commentArrayItem) {
    super();
    this.commentArrayItem = commentArrayItem;
  }

  get template() {
    return createMoviePopupComments(this.commentArrayItem);
  }

}
