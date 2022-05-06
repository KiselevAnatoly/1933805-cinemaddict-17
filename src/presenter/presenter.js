import Filters from '../view/filters.js';
import {render} from '../render.js';
import MovieSort from '../view/movieSort.js';
import  MovieDetails from '../view/movie-details.js';
import  FilmCard from '../view/film-card.js';
import  ShowMore from '../view/button-show-more.js';

export default class MoviesPresenter {

  init = (cinemaddict) => {
    this.cinemaddict = cinemaddict;
    const movieList = new MovieDetails();
    const filmsListContainer = movieList.getElement().querySelector('.films-list__container');
    render(new Filters(), this.cinemaddict);
    render(new MovieSort(), this.cinemaddict);
    render(movieList, this.cinemaddict);
    render(new ShowMore(), this.cinemaddict);
    // render(new FilmCard(), filmsListContainer);


    for (let i = 0; i < 5; i++) {
      render(new FilmCard(),filmsListContainer);
    }

  };
}
