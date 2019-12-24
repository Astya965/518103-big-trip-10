export const MonthNames = [
  `JAN`,
  `FEB`,
  `MAR`,
  `APR`,
  `MAY`,
  `JUN`,
  `JUL`,
  `AUG`,
  `SEP`,
  `OCT`,
  `NOV`,
  `DEС`
];

/**
 * Выбор случайного числа в заданном промежутке
 * @param {Number} min - Минимальное допустимое значение (включительно)
 * @param {Number} max - Максимальное допустимое значение (включительно)
 * @return {Number} Случайное целое число
 */
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Выбор случайного элемента массива
 * @param {Array} array
 * @return {Any} Случайный элемент массива
 */
const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * (array.length));
  return array[randomIndex];
};

/**
 * Перемешивание массива (на основе алгоритма Фишера-Йетса)
 * @param {Array} array - Массив, который нужно перемешать
 * @return {Array} Перемешенный массив
 */
const mixArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let k = Math.floor(Math.random() * (i + 1));
    let swap = array[k];
    array[k] = array[i];
    array[i] = swap;
  }

  return array;
};

/**
 * Генерация случайного значения true\false
 * @return {Boolean}
 */
const getRandomBoolean = () => {
  return Math.floor(Math.random() < 0.5);
};

export {getRandomNumber, getRandomElement, getRandomBoolean, mixArray};

