import {createElement} from '../utils/render.js';

/**
 * Класс меню
 */
export default class Menu {
  constructor() {
    this._element = null;
  }

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

  /**
  * Создание DOM-элемента
  * @return {HTMLElement} Возвращать созданный DOM-элемент
  */
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  /**
  * Удаление ссылки на DOM-элемент
  */
  removeElement() {
    this._element = null;
  }
}
