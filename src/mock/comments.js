import { getRandomInteger, generateRandomElement } from '../util';

const MAX_ID = 4;

const COMMENT_EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry'];

const COMMENT_AUTORS = [
  'Roger Ebert',
  'MAndrew Harris',
  'Anthony Scott',
  'Todd McCarthy',
  'Peter Travers'];

const COMMENT_TEXTS = [
  'You won t even understand what the movie is about',
  'We would love to see it again.',
  'Oh, and the main character is scary...',
  'Thanks for the warning not to download.',
  'Great movie, more of these.'];

const COMMENT_DATES = [
  '2015-10-11T12:11:52.554Z',
  '2020-06-11T17:16:10.554Z',
  '2014-11-10T15:23:40.554Z',
  '2022-10-15T17:33:15.554Z'];
export const generateComment = () => ({
  id: getRandomInteger(0,MAX_ID ),
  author: generateRandomElement(COMMENT_AUTORS),
  comment: generateRandomElement(COMMENT_TEXTS),
  date: generateRandomElement(COMMENT_DATES),
  emotion: generateRandomElement(COMMENT_EMOTIONS)
}
);
export {MAX_ID};
