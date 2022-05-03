
import Filters from './view/filters.js';
import {render} from './render.js';
import MoveCards from './view/movie-card.js';
import  MovieDetails from './view/movie-details.js';
//import ShowMoreButton from './view/show-more.js';


const siteMainElement = document.querySelector('.main');


render(new Filters(), siteMainElement);
render(new MoveCards(),siteMainElement);
render(new MovieDetails(),siteMainElement);
//render(new ShowMoreButton(),siteMainElement);
