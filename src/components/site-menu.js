import AbstractComponent from './abstract-component.js';

/**
 * Класс меню
 */
export default class Menu extends AbstractComponent {
  /**
  * Генерация разметки меню
  * @return {String} Разметка меню
  */
  getTemplate() {
    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
        <a class="trip-tabs__btn" href="#">Stats</a>
      </nav>`
    );
  }
}
