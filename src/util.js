
import dayjs from 'dayjs';

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

// const generateDate = () => {
//   const daysGap = getRandomInteger(-1, -60);

//   return dayjs().add(daysGap, 'day').toDate();
// };


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

/// функции отображения дат в разных форматах
const humanizeReleaseDate = (dueDate, dateFormat) => dayjs(dueDate).format(dateFormat);
//const getHumanDate = (date) => dayjs(date).format('DD MMMM YYYY');
//const gethumanDate2 = (date) => dayjs(date).format('D MMMM YYYY');
//const gethumanDate3 = (date) => dayjs(date).format('YYYY/mm/DD hh:mm');

// функция перевода минут в часы и минуты
const getRuntimeFromMins = (mins) => {
  const hour = Math.trunc(mins/60);
  const min = mins % 60;
  return `${hour}h ${min}m`;
};

export {getRandomInteger, humanizeReleaseDate, getRuntimeFromMins, generateRandomElement};
