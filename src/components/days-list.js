import {createEventTemplate} from "../components/event";
import {MonthNames, createElement} from "../util.js";

/**
 * Генерация разметки дней и точек маршрута
 * @param {Array} tripDays - Массив дней путешествия
 * @return {String} Разметка дней и точек маршрута
 */
const createDaysListTemplate = (tripDays) => {
  return (
    `<ul class="trip-days">
        ${tripDays.map((day, i) => {
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
          <ul class="trip-events__list">
          ${day.map((tripCard) => createEventTemplate(tripCard)).join(`\n`)}
          </ul>
        </li>`
      );
    })}
    </ul>`
  );
};

/**
 * Класс списка дней маршрута
 */
export default class tripDays {
  constructor() {
    this._tripDays = tripDays;
    this._element = null;
  }

  getTemplate() {
    return createDaysListTemplate(this._tripDays);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
