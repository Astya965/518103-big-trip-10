import AbstractComponent from './abstract-component.js';

/**
 * Класс кнопки добавления новых элементов
 */
export default class EventAddButton extends AbstractComponent {

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
  * Обраточик события клика на кнопку
  * @param {Function} handler - События при клике на кнопку
  */
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
