import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class FilmsApiService extends ApiService {

  get films () {
    return this._load({url:'movies'})
      .then(ApiService.parseResponse);
  }

  updateFilm = async (movie) => {
    const response = await this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.adaptFilmToServer(movie)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parseResponse =  ApiService.parseResponse(response);
    return parseResponse;

  };

  getComments = (filmId) => this._load({url: `/comments/${filmId}`}).then(ApiService.parseResponse);

  addComment = async (film, comment) => {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parseResponse =  ApiService.parseResponse(response);
    return parseResponse;
  };

  deleteComment = async (commentId, film) => {
    await this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    return this.updateFilm(film);
  };

  adaptFilmToServer = (film) => {
    const adaptFilm =  {...film,
      ['film_info']: film.filmInfo,
      ['user_details']: film.userDetails,
    };
    adaptFilm['film_info'] = {...adaptFilm['film_info'],
      ['alternative_title']: adaptFilm.film_info.alternativeTitle,
      ['age_rating']:adaptFilm.film_info.ageRating,
      ['total_rating']:adaptFilm.film_info.totalRating,
      ['release'] : { date:adaptFilm.film_info.release.date, ['release_country']: adaptFilm.film_info.release.releaseCountry}
    };
    adaptFilm['user_details'] = {...adaptFilm['user_details'],
      ['already_watched']:adaptFilm.user_details.alreadyWatched
    };
    delete adaptFilm.film_info.alternativeTitle;
    delete  adaptFilm.film_info.ageRating;
    delete adaptFilm.film_info.totalRating;
    delete adaptFilm.film_info.release.releaseCountry;
    delete adaptFilm.user_details.alreadyWatched;
    delete adaptFilm.filmInfo;
    delete adaptFilm.userDetails;
    return adaptFilm;
  };

}
