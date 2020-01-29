import AbstractComponent from './abstract-component.js';

/**
 * Класс кнопки добавления новых элементов
 */
export default class EventAddBtn extends AbstractComponent {

  /**
  * Генерация разметки фильтра точек маршрута
  * @return {String} Разметка фильтра точек маршрута
  */
  getTemplate() {
    return (
      `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
    );
  }
}
