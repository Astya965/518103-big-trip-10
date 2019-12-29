import {createElement} from '../util.js';

/**
 * Класс пустого списка точек маршрута
 */
export default class NoEvents {
  constructor() {
    this._element = null;
  }

  /**
  * Генерация разметки фильтра точек маршрута
  * @return {String} Разметка фильтра точек маршрута
  */
  getTemplate() {
    return (
      `<p class="trip-events__msg">Click New Event to create your first point</p>`
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
