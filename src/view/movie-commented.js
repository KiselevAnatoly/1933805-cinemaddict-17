
import AbstractView from '../framework/view/abstract-view';
const createMovieCommented = () =>

  `<section class="films-list films-list--extra">
<h2 class="films-list__title">Most commented</h2>

<div class="films-list__container">

</div>
</section>`;

export default class MovieCommented extends AbstractView {

  get template() {
    return createMovieCommented();
  }

}
