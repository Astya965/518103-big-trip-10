import {getRandomNumber, getRandomElement, getRandomBoolean, mixArray} from '../utils/util.js';

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
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

export const Activitys = [
  `check-in`,
  `sightseeing`,
  `restaurant`,
];

/**
 * @description Объединение массивов Transfers и Activitys
 */
const EventTypes = Transfers.concat(Activitys);

export const Destinations = [`Copenhagen`, `Oslo`, `Bergen`, `Moscow`];

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
export const getRandomDescription = () => {
  const textArray = TEXT.split(`.`);
  return textArray.slice(0, getRandomNumber(1, 4))
                  .join(`. `);
};

/**
 * Генерация случайный набор специальных предложений
 * @return {Array} Случайный набор специальных предложений
 */
export const getOffers = () => {
  return mixArray(Offers).slice(0, OFFERS_AMOUNT);
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
    destination: getRandomElement(Destinations),
    startDate: new Date(Math.min(firstDate, secondDate)),
    endDate: new Date(Math.max(firstDate, secondDate)),
    offers: getOffers(),
    price: Math.round(getRandomNumber(10, 100)),
    photos: Array(getRandomNumber(1, 4))
            .fill(``)
            .map(getRandomPhoto),
    description: getRandomDescription(),
    isFavorite: false
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

