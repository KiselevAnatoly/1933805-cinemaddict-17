
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

const getIdFilteredArray = (filmiD, commentsArray) => {
  const fillteredArray = commentsArray.filter((item) => item.id === filmiD);
  return fillteredArray;
};

export default class FilmSectionPresenter {

  #filmContainer = new MovieView();
  #filmList = new MovieList();
  #filmListContainer = new MovieListContainer();
  #mainBlock = null;
  #filmsModel = null;
  #filmsList = null;
  #commentList = null;

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

    for (let i = 0; i <this.#filmsList.length; i++) {
      render(new MovieCard(this.#filmsList[i]), this.#filmListContainer.element);
      this.#filmsList[i].id = i;
    }

    this.filteredArray = getIdFilteredArray(this.#filmsList[0].id, this.#commentList);

  };

  #renderPopup = (film) => {
    render(new MovieDetails(film), document.querySelector('body'));

    for (let i = 0; i < this.filteredArray.length; i++) {
      render(new MoviePopupComment(this.filteredArray[i]), document.querySelector('.film-details__comments-list'));
    }
  };
}
