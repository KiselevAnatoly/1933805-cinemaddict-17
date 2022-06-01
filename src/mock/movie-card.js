
import { generateRandomElement, getRandomInteger, generateDate,} from '../util';
import { MAX_ID } from './comments';

const MOVIE_POSTERS = [
  'the-dance-of-life.jpg',
  'sagebrush-trail.jpg',
  'the-man-with-the-golden-arm.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'popeye-meets-sinbad.png'];

const MOVIE_TITLES = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  '18 comments',
  'Popeye the Sailor Meets Sindbad the Sailor'];

const MOVIE_DESCRIPTIONS = [
  'Aliquam id orci ut lectus varius viverra.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'];

const GENRES = [
  'Musical',
  'Western',
  'Drama',
  'Comedy',
  'Cartoon',
  'Romance',
];

const MOVIE_ACTORS = [
  'Ben Affleck',
  'Hugh Jackman',
  'Johnny Depp',
  'Jim Carrey',
  'Gary Oldman'];


const MOVIE_WRITERS = [
  'Quentin Tarantino',
  'Adam McKay',
  'Billy Wilder',
  'Robert Towne'];

const MOVIE_DIRECTOR = [
  'Steven Spielberg',
  'David Fincher',
  'James Cameron',
  'Martin Scorsese',
  'Peter Jackson'
];
const COUNTRY = [
  'Russian',
  'Finland',
  'USA',
  'Italy',
  'India'
];
const AGE_RATING = [
  '0+',
  '6+',
  '12+',
  '16+',
  '18+'
];

export const generateMovie = () => ({
  id: getRandomInteger(0, MAX_ID),
  commentCount: '0',
  filmInfo: {
    title: generateRandomElement(MOVIE_TITLES),
    alternativeTitle: generateRandomElement(MOVIE_TITLES),
    totalRating: 5.3,
    poster: generateRandomElement(MOVIE_POSTERS),
    ageRating: generateRandomElement(AGE_RATING),
    director: generateRandomElement(MOVIE_DIRECTOR),
    writers: generateRandomElement(MOVIE_WRITERS),
    actors: generateRandomElement(MOVIE_ACTORS),
    release: {
      date: generateDate(),
      releaseCountry: generateRandomElement(COUNTRY),
    },
    runtime: 77,
    genre: generateRandomElement(GENRES),
    description: generateRandomElement(MOVIE_DESCRIPTIONS)
  },
  userDetails: {
    watchlist: Boolean(getRandomInteger(0, 1)),
    alreadyWatched: Boolean(getRandomInteger(0, 1)),
    watchingDate: generateDate(),
    favorite: Boolean(getRandomInteger(0, 1))
  },

});

