
import dayjs from 'dayjs';
import { FilterType } from './const';
const GENRES_LENGTH = 2;
const START_SLICE_DESCRIPTION = 0;
const SIZE_DESCRIPTION = 140;

const getDuration = (mins) => `${Math.floor(mins / 60)}h ${mins % 60}m`;
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}; const getDateComment = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');
const getString = (array) => `${array.join(', ')}`;
const getNormalList = (...genre) => {
  const genres = Array.from(genre);
  const result = !genres.length <= GENRES_LENGTH ? getString(genres) : genre[0];
  return result;
};
const getGenreList = (genre) => {

  const list = genre.map((element) => `<span class="film-details__genre">${element},</span>`).join('');
  return list;
};
const getReleaseDate = (date) => dayjs(date).format('DD MMMM YYYY');
const keydownEscape = (evt) => evt.key === 'Esc' || evt.key === 'Escape';
const getYearFromDate = (date) => dayjs(date).format('YYYY');
const humanizeReleaseDate = (dueDate, dateFormat) => dayjs(dueDate).format(dateFormat);
const humanizeFilmReleaseDate = (date) => dayjs(date).format('DD MMMM YYYY');
const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};
const sortByDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};
const humanizeCommentDate = (date) => dayjs(date).fromNow();
const isWatchList = (film) => film.userDetails.watchlist === true;
const isAlreadyWatched = (film) => film.userDetails.alreadyWatched === true;
const isFavorite = (film) => film.userDetails.favorite === true;
const filter = {
  [FilterType.All]: (films) => [...films],
  [FilterType.WATCH_LIST]: (films) => films.filter((film) => isWatchList(film)),
  [FilterType.ALREADY_WATCHED]: (films) => films.filter((film) => isAlreadyWatched(film)),
  [FilterType.FAVORITE]: (films) => films.filter((film) => isFavorite(film))
};
const sortByRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;
const isCtrlEnterKey = (evt) => evt.ctrlKey && evt.key === 'Enter';
const ControlDetailsFilmCard = {
  UNBLOCK_CONTROL_PANEL: 'UNBLOCK',
  UPDATE_CONTROL_PANEL: 'UPDATE',
};
const getRuntime = (min) => {
  const hours = Math.trunc(min / 60);
  const minute = Math.trunc(min % 60);
  return `${hours}h ${minute}m`;
};

const getFilmCardControlActive = (filmDetailsControlButton) =>
  filmDetailsControlButton
    ? 'film-card__controls-item--active'
    : '';
const getNormalDescription = (description) => {
  const shortDescription = description.slice(START_SLICE_DESCRIPTION, SIZE_DESCRIPTION);
  const descriptionForFilmCard = shortDescription.length < description.length
    ? `${shortDescription}…`
    : description;
  return descriptionForFilmCard;
};
const getFilmDetailsControlActive = (filmDetailsControlButton) =>
  filmDetailsControlButton
    ? 'film-details__control-button--active'
    : '';

const sortFilmRating = (a, b) => {

  if (a.filmInfo.totalRating > b.filmInfo.totalRating) {
    return -1;
  }
  if (a.filmInfo.totalRating < b.filmInfo.totalRating) {
    return 1;
  }
  if (a.filmInfo.totalRating === b.filmInfo.totalRating) {
    return 0;
  }
};

const sortFilmDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};
export {
  isCtrlEnterKey,
  humanizeFilmReleaseDate,
  getDuration, getYearFromDate,
  humanizeCommentDate,
  sortByRating,
  sortByDate,
  getRandomInteger,
  humanizeReleaseDate,
  keydownEscape,
  getRuntime,
  getNormalDescription,
  getFilmCardControlActive,
  getReleaseDate,
  getGenreList,
  getNormalList,
  getDateComment,
  getFilmDetailsControlActive,
  sortFilmRating,
  sortFilmDate,
  filter,
  ControlDetailsFilmCard
};
