import moment from 'moment';

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
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Выбор случайного элемента массива
 * @param {Array} array
 * @return {Any} Случайный элемент массива
 */
export const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * (array.length));
  return array[randomIndex];
};

/**
 * Перемешивание массива (на основе алгоритма Фишера-Йетса)
 * @param {Array} array - Массив, который нужно перемешать
 * @return {Array} Перемешенный массив
 */
export const mixArray = function (array) {
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
export const getRandomBoolean = () => {
  return Math.floor(Math.random() < 0.5);
};

/**
 * Заменяет первую букву строки на заглавную
 * @param {String} str - Строка
 * @return {String} - Строка с первой заглавной буквой
 */
export const capitalizeFirstLetter = (str) => {
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
};

/**
 * Получение времени на основе даты
 * @param {Number} date - Дата
 * @return {String} Длительность события
 */
export const formatDateTime = (date) => {
  return moment(date).format(`HH:mm`);
};

/**
 * Получение месяца и дня на основе даты
 * @param {Number} date - Дата
 * @return {String} Дата в формате MMM DD (сокращенно месяц и день)
 */
export const formatMonthDay = (date) => {
  return moment(date).format(`MMM DD`);
};

/**
 * Получение дгя на основе даты
 * @param {Number} date - Дата
 * @return {String} Дата в формате DD (сокращенно месяц и день)
 */
export const formatDay = (date) => {
  return moment(date).format(`DD`);
};

/**
 * Получение полной даты на основе даты
 * @param {Number} date - Дата
 * @return {String} Дата в формате DD/MM/YY HH:mm
 */
export const formatFullDate = (date) => {
  return moment(date).format(`DD/MM/YY HH:mm`);
};

/**
 * Сравнение месяцев
 * @param {Number} firstDate - Первая дата
 * @param {Number} secondDate - Вторая дата
 * @return {Boolean} Являются ли месяцы одинаковым (в формате true\false)
 */
export const isSameMonth = (firstDate, secondDate) => {
  return moment(firstDate).isSame(secondDate, `month`) && moment(firstDate).isSame(secondDate, `year`);
};

/**
 * Разность дат
 * @param {Number} firstDate - Первая дата
 * @param {Number} secondDate - Вторая дата
 * @return {Number} Разница между первой и второй датой в формате Unix
 */
export const getDatesDiff = (firstDate, secondDate) => {
  return moment(firstDate) - moment(secondDate);
};

/**
 * Получение дистанции на основе даты начала и конца
 * @param {Number} startDate - Дата начала
 * @param {Number} endDate - Дата конца
 * @return {String} Длительность события
 */
export const getDuration = (startDate, endDate) => {
  const duration = moment.duration(moment(endDate).diff(moment(startDate)));

  const durationDays = duration.days();
  const durationHours = duration.get(`hours`);
  const durationMinutes = duration.get(`minutes`);

  return `${durationDays > 0 ? (durationDays) + `D` : ``} ${durationHours > 0 ? durationHours + `H` : ``} ${durationMinutes}M`;
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
