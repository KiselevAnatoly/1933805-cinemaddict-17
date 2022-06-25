
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { FilterType } from './const';


const getDuration = (mins) => `${Math.floor(mins / 60)}h ${mins % 60}m`;
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


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
const filter = {
  [FilterType.ALL]: (arr) => arr,
  [FilterType.WATCHLIST]: (arr) => arr.filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (arr) => arr.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (arr) => arr.filter((film) => film.userDetails.favorite),
};
const sortByRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;
const isCtrlEnterKey = (evt) => evt.ctrlKey && evt.key === 'Enter';

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
  filter,
};
