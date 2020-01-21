import AbstractComponent from './abstract-component.js';

/**
 * Класс меню
 */
export default class Menu extends AbstractComponent {
  constructor(menuItems) {
    super();
    this._menuItems = menuItems;
  }
  /**
  * Генерация разметки меню
  * @return {String} Разметка меню
  */
  getTemplate() {
    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
        ${this._menuItems
          .map(
              (item) =>
                `<a class="trip-tabs__btn ${
                  item.active ? `trip-tabs__btn--active` : ``
                }" href="#" id="${item.name}">${item.name}</a>`
          )
          .join(``)}
      </nav>`
    );
  }
}
