import Filters from '../view/filters.js';
import {render} from '../render.js';
import MovieSort from '../view/movie-sort.js';
import  MovieDetails from '../view/movie-details.js';
import  FilmCard from '../view/film-card.js';
import  ShowMore from '../view/button-show-more.js';

export default class MoviesPresenter {

  init = (filmsContainer ) => {
    this.filmsContainer  = filmsContainer ;
    const movieList = new MovieDetails();
    const filmsListContainer = movieList.getElement().querySelector('.films-list__container');
    const QUANTITY_CARDS = 5;
    render(new Filters(), this.filmsContainer );
    render(new MovieSort(), this.filmsContainer );
    render(movieList, this.filmsContainer );
    render(new ShowMore(), this.filmsContainer );


    for (let i = 0; i < QUANTITY_CARDS; i++) {
      render(new FilmCard(),filmsListContainer);
    }

  };
}

