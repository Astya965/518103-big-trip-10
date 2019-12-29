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

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

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
 * Создание элемента разметки
 * @param {String} template - Разметка в виде строки
 * @return {HTMLElement} - Элемент разметки
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

/**
 * Рендеринг элемента разментки
 * @param {HTMLElement} container - Элемент разметки, куда добавляется новый элемент
 * @param {HTMLElement} component - Новый элемент, добавляемый в DOM-дерево
 * @param {DOMString} place - Определяет позицию добавляемого элемента относительно элемента, вызвавшего метод
 */
export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component);
      break;
    case RenderPosition.BEFOREEND:
      container.append(component);
      break;
    case RenderPosition.AFTEREND:
      container.after(component);
      break;
  }
};

/**
 * Удаление элемента разментки
 * @param {HTMLElement} component - Новый элемент, добавляемый в DOM-дерево
 */
export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

/**
 * Замена старого элемента разментки новый
 * @param {HTMLElement} newComponent - Новый элемент на который будет заменен oldComponent
 * @param {HTMLElement} oldComponent - Элемент который будет заменен.
 */
export const replace = (newComponent, oldComponent) => {
  newComponent.getElement().replaceWith(oldComponent.getElement());
};
