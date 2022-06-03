import View from './view-class';

const createRatingTemplate = () =>
  `<section class="header__profile profile">
  <p class="profile__rating">Anatoly</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;

export default class UserRaiting extends View {

  constructor() {
    super();
  }

  get template() {
    return createRatingTemplate();
  }

}
