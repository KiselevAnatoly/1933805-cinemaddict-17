import { UpdateType } from '../const';
import Observable from '../framework/observable';


export default class CommentsModel extends Observable {
  #addCommentResponse = null;
  #filmAddComment = null;
  #comments = [];
  #apiServes = null;
  constructor(api) {
    super();
    this.#apiServes= api;
  }

  get comments () {
    return this.#comments;
  }

  init = async (film) => {
    try{
      const comments = await this.#apiServes.getComments(film.id);
      this.#comments = comments;
    } catch (err) {
      throw new Error('Not comment');
    }
    this._notify(UpdateType.INIT_POPUP, film);
  };

  addNewComment = async(film,addComment) => {
    try{
      this.#addCommentResponse = await this.#apiServes.addComment(film, addComment);
      this.#filmAddComment = this.#adaptToClient(this.#addCommentResponse.movie);
      this.#comments = this.#addCommentResponse.comments;
    }catch (err) {
      throw new Error ('Not addComment!');
    }
    this._notify(UpdateType.PATCH,this.#filmAddComment);

  };

  deleteComment = async( updateType, film, deleteCommentId) => {
    const updateFilm = film;
    updateFilm.comments = updateFilm.comments.filter((comment)=>comment !== deleteCommentId);
    try{
      const response = await this.#apiServes.deleteComment(deleteCommentId, updateFilm);
      const comments = await this.#apiServes.getComments(film.id);
      this.#comments = comments;
      const adaptFilm = this.#adaptToClient(response);

      this._notify(updateType, adaptFilm);
    }catch(err ){
      throw new Error ('Not delete comment');
    }

  };

  #adaptToClient = (films) => {
    const adaptFilm =  {...films,
      filmInfo: films.film_info,
      userDetails: films.user_details,
    };
    adaptFilm.filmInfo = {...adaptFilm.filmInfo,
      alternativeTitle: adaptFilm.filmInfo.alternative_title,
      ageRating: adaptFilm.filmInfo.age_rating,
      totalRating: adaptFilm.filmInfo.total_rating,
      release : {date:adaptFilm.filmInfo.release.date, releaseCountry: adaptFilm.filmInfo.release.release_country}
    };
    adaptFilm.userDetails= {...adaptFilm.userDetails,
      watchList:adaptFilm.userDetails.watch_list,
      alreadyWatched:adaptFilm.userDetails.already_watched
    };
    delete adaptFilm.filmInfo.alternative_title;
    delete  adaptFilm.filmInfo.age_rating;
    delete adaptFilm.filmInfo.total_rating;
    delete adaptFilm.filmInfo.release.release_country;
    delete adaptFilm.userDetails.watch_list;
    delete adaptFilm.userDetails.already_watched;
    delete adaptFilm.film_info;
    delete adaptFilm.user_details;
    return adaptFilm;
  };
}
