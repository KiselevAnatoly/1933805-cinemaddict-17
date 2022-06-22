
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
const SIXTY = 60;
import { FilterType } from './const';

// функция перевода минут в часы и минуты
const getRuntimeFromMins = (mins) => {
  const hour = Math.trunc(mins / SIXTY);
  const min = mins % SIXTY;
  return `${hour}h ${min}m`;
};
const getDuration = (mins) => `${Math.floor(mins / 60)}h ${mins % 60}m`;
// генерация случайного числа с интервалом
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// const createDataIds = (size) => Array.from({length: size}, (item, index) => index + 1);

// генерация случайного элемента из массива
const generateRandomElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const generateDate = () => {
  const daysGap = getRandomInteger(-1, -10000);

  return dayjs().add(daysGap, 'day').toDate();
};
const keydownEscape = (evt) => evt.key === 'Esc' || evt.key === 'Escape';

// const getDateForComment = (date) => {
//   const dateInner = dayjs(date);
//   const dayDiff = dayjs().diff(dateInner, 'days');

//   if (dayDiff <= 1) {
//     return 'Today';
//   }
//   if (dayDiff > 1 && dayDiff <= 30) {
//     return `${dayDiff} days ago`;
//   }
//   if (dayDiff > 30) {
//     return dayjs(date).format('YYYY/MM/DD HH:MM');
//   }

//   return dayjs(date).format('YYYY/MM/DD HH:MM');
// };

const getYearFromDate = (date) => dayjs(date).format('YYYY');
const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);
/// функции отображения дат в разных форматах
const humanizeReleaseDate = (dueDate, dateFormat) => dayjs(dueDate).format(dateFormat);

const humanizeFilmReleaseDate = (date) => dayjs(date).format('DD MMMM YYYY');
//const gethumanDate2 = (date) => dayjs(date).format('D MMMM YYYY');
//const gethumanDate3 = (date) => dayjs(date).format('YYYY/mm/DD hh:mm');
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
  isCtrlEnterKey, humanizeFilmReleaseDate, getDuration,getYearFromDate,humanizeCommentDate,
  sortByRating,
  sortByDate,
  getRandomInteger,
  humanizeReleaseDate,
  getRuntimeFromMins,
  generateRandomElement,
  keydownEscape,
  generateDate,
  updateItem,
  filter,
};
