import AbstractComponent from './abstract-component.js';

/**
 * Класс списка дней маршрута
 */
export default class TripDaysList extends AbstractComponent {
  /**
  * Генерация разметки списка дней
  * @return {String} Разметка списка дней
  */
  getTemplate() {
    return `<ul class="trip-days"></ul>`;
  }
}
