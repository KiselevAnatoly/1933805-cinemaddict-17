
import { render } from '../render';
import MovieView from '../view/movie-films';
import MovieList from '../view/movie-list';
import MovieListContainer from '../view/movie-container';
import MovieCard from '../view/movie-card';
import MovieRated from '../view/movie-rated';
import MovieCommented from '../view/movie-commented';
import ButtonShowMore from '../view/button-show-more';
import MovieDetails from '../view/movie-details';
import MoviePopupComment from '../view/movie-popup-comment';
import { keydownEscape } from '../util';


const getIdFilteredArray = (filmiD, commentsArray) => {
  const fillteredArray = commentsArray.filter((item) => item.id === filmiD);
  return fillteredArray;
};

export default class FilmSectionPresenter {

  #filmContainer = new MovieView();
  #filmList = new MovieList();
  #filmListContainer = new MovieListContainer();
  // #popupComponent = new MovieDetails();

  #mainBlock = null;
  #filmsModel = null;
  #filmsList = null;
  #commentList = null;
  #filteredArray = null;


  init = (mainBlock, filmsModel) => {

    this.#mainBlock = mainBlock;
    this.#filmsModel = filmsModel;
    this.#filmsList = this.#filmsModel.films;
    this.#commentList = this.#filmsModel.comments;

    render(this.#filmContainer, this.#mainBlock);
    render(this.#filmList, this.#filmContainer.element);
    render(this.#filmListContainer, this.#filmList.element);
    render(new ButtonShowMore(), this.#filmContainer.element);

    render(new MovieRated(), this.#filmContainer.element);
    render(new MovieCommented(), this.#filmContainer.element);

    for (let i = 0; i < this.#filmsList.length; i++) {
      this.#filmsList[i].id = i;
      this.#filteredArray = getIdFilteredArray(this.#filmsList[i].id, this.#commentList);
      this.#renderFilms(this.#filmsList[i], this.#filteredArray);
    }

  };

  #renderFilms = (film, commentsArray) => {
    const filmCardComponent = new MovieCard(film);
    render(filmCardComponent, this.#filmListContainer.element);

    const renderPopup = () => {

      if (document.querySelector('.film-details')) {
        document.querySelector('.film-details').remove();
      }

      document.body.classList.add('hide-overflow');

      const popupComponent = new MovieDetails(film);
      render(popupComponent, document.querySelector('body'));
      // render(this.#popupComponent, this.#popupComponent.element);

      const escKeyDown = (evt) => {
        if (keydownEscape(evt)) {
          closeClearFun();
        }
      };

      const closeButtonClick = () => {
        closeClearFun();
      };

      function closeClearFun() {
        // this.#popupComponent.element.remove();
        popupComponent.element.remove();
        document.body.classList.remove('hide-overflow');
        document.removeEventListener('keydown', escKeyDown);

      }
      commentsArray.forEach((elem) => {
        render(new MoviePopupComment(elem), popupComponent.element.querySelector('.film-details__comments-list'));
      });
      //   render(new MoviePopupComment(elem), this.#popupComponent.element.querySelector('.film-details__comments-list'));

      // });

      popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', closeButtonClick);
      document.addEventListener('keydown', escKeyDown);
    };

    //   this.#popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', closeButtonClick);
    //   document.addEventListener('keydown', escKeyDown);
    // };


    filmCardComponent.element.addEventListener('click', renderPopup);

  };
}
