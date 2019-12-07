import {getRandomNumber, getRandomElement, getRandomBoolean, mixArray} from '../util.js';

const OFFERS_AMOUNT = 2;

const EVENT_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`];

const CITIES = [`Copenhagen`, `Oslo`, `Bergen`, `Moscow`];

const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus,
  purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const offers = [
  {
    name: `Add luggage`,
    type: `luggage`,
    price: 15,
    checked: getRandomBoolean()
  },
  {
    name: `Switch to comfort class`,
    type: `comfort`,
    price: 55,
    checked: getRandomBoolean()
  },
  {
    name: `Add meal`,
    type: `meal`,
    price: 10,
    checked: getRandomBoolean()
  },
  {
    name: `Choose seats`,
    type: `seats`,
    price: 15,
    checked: getRandomBoolean()
  },
  {
    name: `Travel by train`,
    type: `train`,
    price: 35,
    checked: getRandomBoolean()
  }
];

/**
 * Получает случайное время и дату
 * @return {String} Время и дата в формате DD/MM/YYYY HH:mm
 */
const getRandomDate = () => {
  const randomDate = `${getRandomNumber(1, 30)}/${getRandomNumber(1, 12)}/${getRandomNumber(19, 22)} ${getRandomNumber(0, 23)}:${getRandomNumber(0, 59)}`;
  const regExp = /\b([1-9])(?!\d)/g;
  return `${randomDate.replace(regExp, `0$1`)}`;
};

/**
 * Получает путь к случайной фотографии
 * @return {String} Путь фотографии
 */
const getRandomPhoto = () => `http://picsum.photos/300/150?r=${Math.random()}`;

/**
 * Получает случайное описание на основе такста
 * @param {String} text - Текст
 * @return {String} Cлучайное описание
 */
const getRandomDescription = (text) => {
  const textArray = text.split(`.`);
  return textArray.slice(0, getRandomNumber(1, 4))
                  .join(`. `);
};

/**
 * Генерация мокков для точки маршрута
 * @return {Number} Данные для точки маршрута
 */
export const generateEvent = () => {
  return {
    type: getRandomElement(EVENT_TYPES),
    city: getRandomElement(CITIES),
    startDate: getRandomDate(),
    endDate: getRandomDate(),
    offers: mixArray(offers).slice(0, OFFERS_AMOUNT),
    price: Math.round(getRandomNumber(10, 100)),
    photos: Array(getRandomNumber(1, 4))
            .fill(``)
            .map(getRandomPhoto),
    discription: getRandomDescription(TEXT)
  };
};
