import { getRandomInteger } from '../util';


const generateDescription = () => {
  const description = `
  Aliquam id orci ut lectus varius viverra.
  Sed sed nisi sed augue convallis suscipit in sed felis.
  Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus.
  In rutrum ac purus sit amet tempus.
`.split('.');

  const randomIndex = getRandomInteger(0, description.length - 1);

  return description[randomIndex];
};

const generatePoster = () => {
  const posters = [
    'the-dance-of-life.jpg',
    'sagebrush-trail.jpg',
    'the-man-with-the-golden-arm.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'popeye-meets-sinbad.png'
  ];
  return posters[getRandomInteger(0, posters.length - 1)];
};

export const generateMovie = () => ({
  _id: '0',
  _commentCount: '0',
  filmInfo: {
    title: [
      'The Dance of Life',
    ],
    alternativeTitle: 'The Man with the Golden Arm',
    totalRating: 5.3,
    poster: generatePoster(),
    ageRating: 0,
    director: 'Jim Carrey',
    writers: [
      'Takeshi Kitano'
    ],
    actors: [
      'Hugh Jackman',
    ],
    release: {
      date: '2022-07-15T00:00:00.000Z',
      releaseCountry: 'Russian'
    },
    runtime: 57,
    genre: [
      'Comedy'
    ],
    description: generateDescription()
  },
  userDetails: {
    watchlist: Boolean(getRandomInteger(0, 1)),
    alreadyWatched: Boolean(getRandomInteger(0, 1)),
    watchingDate: '2016-09-12T17:10:20.554Z',
    favorite: Boolean(getRandomInteger(0, 1))
  },

  get id() {
    return this._id;
  },

  set id(newValue) {
    this._id = newValue;
  },

  get commentCount() {
    return this._commentCount;
  },

  set commentCount(newValue) {
    this._commentCount = newValue;
  }
});
