import AbstractComponent from './abstract-component.js';

/**
 * Класс пустого списка точек маршрута
 */
export default class NoEvents extends AbstractComponent {
  /**
  * Генерация разметки фильтра точек маршрута
  * @return {String} Разметка фильтра точек маршрута
  */
  getTemplate() {
    return (
      `<p class="trip-events__msg">Click New Event to create your first point</p>`
    );
  }
}
