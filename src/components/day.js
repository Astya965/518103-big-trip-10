import AbstractComponent from './abstract-component.js';
import {formatMonthDay} from '../utils/util.js';

/**
 * Класс списка дней маршрута
 */
export default class Day extends AbstractComponent {
  constructor(date, day) {
    super();
    this._date = date;
    this._day = day;
  }

  /**
  * Генерация разметки дней и точек маршрута
  * @param {Array} tripDays - Массив дней путешествия
  * @return {String} Разметка дней и точек маршрута
  */
  getTemplate() {
    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._day || ``}</span>
          <time class="day__date" datetime="${this._date || ``}">${this._date ? formatMonthDay(this._date) : ``}</time>
        </div>

        <ul class="trip-events__list">
        </ul>
      </li>`
    );
  }
}

