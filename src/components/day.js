import AbstractComponent from './abstract-component.js';
import {formatMonthDay} from '../utils/util.js';


export default class Day extends AbstractComponent {
  constructor(date, day) {
    super();
    this._date = date;
    this._day = day;
  }

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

