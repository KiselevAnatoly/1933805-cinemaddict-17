
const SortType = {
  DEFAULT: 'default',
  DATA: 'date',
  RATING: 'rating'
};

const UserAction  = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_FILM_COMMENT: 'ADD_FILM_COMMENT',
  DELETE_COMMENT: 'DELETE_FILM_COMMENT',
};

const UpdateType  = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  All: 'all',
  WATCH_LIST:'watchList',
  ALREADY_WATCHED:'alreadyWatched',
  FAVORITE:'favorite'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};
const ShakeClass = {
  POPUP_COMMENTS : '.film-details__comments-wrap',
  POPUP :'.film-details__inner',
  POPUP_DETAILS: '.film-details__controls'
};
export{UserAction,UpdateType,FilterType,SortType,Mode,ShakeClass};
