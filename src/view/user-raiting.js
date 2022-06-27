
import AbstractView from '../framework/view/abstract-view';
const createRatingTemplate = (userRank) =>
  `<section class="header__profile profile">
<p class="profile__rating">${userRank}</p>
<img class="profile__avatar" src="images/bitmap.png" alt="Avatar" width="35" height="35">
</section>`;

export default class UserRaiting extends AbstractView {
  #userRank;
  constructor(userRank) {
    super();
    this.#userRank = userRank;
  }

  get template() {
    return createRatingTemplate(this.#userRank);
  }

}
