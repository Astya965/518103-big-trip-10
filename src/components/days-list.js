import {MonthNames, createElement} from "../util.js";

/**
 * Класс списка дней маршрута
 */
export default class TripDays {
  constructor(tripDays) {
    this._tripDays = tripDays;
    this._element = null;
  }

  /**
  * Генерация разметки дней и точек маршрута
  * @param {Array} tripDays - Массив дней путешествия
  * @return {String} Разметка дней и точек маршрута
  */
  getTemplate() {
    return (
      `<ul class="trip-days">
          ${this._tripDays.map((day, i) => {
        const getTripDay = () => {
          const dayDate = day[0].startDate;
          return `${MonthNames[dayDate.getMonth()]} ${dayDate.getDate()}`;
        };

        return (
          `<li class="trip-days__item  day">
            <div class="day__info">
              <span class="day__counter">${i + 1}</span>
              <time class="day__date" datetime="${day[0].startDate}">${getTripDay()}</time>
            </div>
            <ul class="trip-events__list data-date="${day[0].startDate.getDate()}/${day[0].startDate.getMonth()}">
            </ul>
          </li>`
        );
      }).join(`\n`)}
      </ul>`
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
