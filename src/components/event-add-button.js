import {createElement} from '../utils/render.js';

/**
 * Класс кнопки добавления новых элементов
 */
export default class EventAddBtn {
  constructor() {
    this._element = null;
  }

  /**
  * Генерация разметки фильтра точек маршрута
  * @return {String} Разметка фильтра точек маршрута
  */
  getTemplate() {
    return (
      `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
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

  /**
  * Обраточик события клика на кнопку
  * @param {Function} handler - События при клике на кнопку
  */
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
