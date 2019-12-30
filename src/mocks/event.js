import {getRandomNumber, getRandomElement, getRandomBoolean, mixArray} from '../util.js';

const CARD_COUNT = 4;
const OFFERS_AMOUNT = 2;

const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus,
  purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

/**
 * Максимальное и минимальное значение для даты, в формате Unix.
 * Значение в милисекундах.
 */
const MIN_DATA = Date.now();
const MAX_DATA = 1671062399 * 1000;
const HOUR = 3600 * 1000;
// Убери из максимальной даты магические числа

export const Transfers = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
];

export const Activitys = [
  `Check-in`,
  `Sightseeing`,
  `Restaurant`,
];

/**
 * @description Объединение массивов Transfers и Activitys
 */
const EventTypes = Transfers.concat(Activitys);

export const EventCities = [`Copenhagen`, `Oslo`, `Bergen`, `Moscow`];

export const Offers = [
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
 * @return {Number} Время и дата в формате Unix
 */
const getRandomDate = () => {
  return getRandomNumber(MIN_DATA, MAX_DATA);
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
 * Исправляет формат времени и даты
 * @param {Number} anyDate - Изначальная дата в человекочитаемом формате
 * @return {String} Исправленная версия DD/MM/YYYY HH:mm (на основе изначальной)
 */
export const checkDate = (anyDate) => {
  const regExp = /\b([1-9])(?!\d)/g;
  return `${anyDate.toString().replace(regExp, `0$1`)}`;
};

/**
 * Перевод дистанции в человекочитаемый формат
 * @param {Number} duration - Изначальная дата в формате Unix
 * @return {String} Длительность события
 */
export const getDuration = (duration) => {
  const days = (duration / 86400 / 1000);
  const rdays = Math.floor(days);
  const hours = ((days - rdays) * 24);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return `${rdays > 0 ? rdays + `D` : ``} ${rhours > 0 ? rhours + `H` : ``} ${rminutes}M`;
};


/**
 * Генерация мокков для точки маршрута
 * @return {Number} Данные для точки маршрута
 */
export const generateEvent = () => {
  let firstDate = getRandomDate();
  let secondDate = firstDate + getRandomNumber(HOUR, HOUR * 24 * 2);
  return {
    type: getRandomElement(EventTypes),
    city: getRandomElement(EventCities),
    startDate: new Date(Math.min(firstDate, secondDate)),
    endDate: new Date(Math.max(firstDate, secondDate)),
    duration: getDuration(Math.max(firstDate, secondDate) - Math.min(firstDate, secondDate)),
    offers: mixArray(Offers).slice(0, OFFERS_AMOUNT),
    price: Math.round(getRandomNumber(10, 100)),
    photos: Array(getRandomNumber(1, 4))
            .fill(``)
            .map(getRandomPhoto),
    description: getRandomDescription(TEXT)
  };
};

/**
 * Генерация массива точек маршрута
 * @param {Number} count - Нужное число точек
 * @return {Array} Массив точек маршрута
 */
export const generateEvents = (count) => {
  return new Array(count)
  .fill(null)
  .map(generateEvent);
};

/**
 * @description Сортировка массива точек маршрута по дате в порядке возрастания
 */
const tripCards = generateEvents(CARD_COUNT);
tripCards.sort((a, b) => Date.parse(a.startDate) > Date.parse(b.startDate) ? 1 : -1);
export {tripCards};

/**
 * Генерация массива дней путешествия (разделение массива точек маршрута на подмассивы)
 * @param {Array} array - Массив точек маршрута
 * @return {Array} Массив дней путешествия
 */
export const generateTripDays = (array) => {
  let tripDays = [];
  let dayEvents = [];

  array.forEach((elem, i) => {
    let prevCard = i > 0 ? array[i - 1] : null;

    if (prevCard && elem.startDate.getDate() !== prevCard.startDate.getDate()) {
      tripDays.push(dayEvents);
      dayEvents = [];
    }

    dayEvents.push(elem);

    if (i === array.length - 1) {
      tripDays.push(dayEvents);
    }
  });

  return tripDays;
};

/**
 * Генерация массива точек маршрута
 * @param {Array} tripDays - Массив дней путешествия
 * @return {Number} Итоговая цена всей поездки
 */
export const getTripCost = (tripDays) => {
  const tripEvents = tripDays.flat();
  let tripCost = tripEvents.reduce((sum, tripEvent) => {
    return sum + tripEvent.price;
  }, 0);
  return tripCost;
};

