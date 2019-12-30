import AbstractComponent from './abstract-component.js';
import {MonthNames} from "../utils/util.js";

/**
 * Класс информации о поездке
 */
export default class TripInfo extends AbstractComponent {
  constructor(tripDays) {
    super();
    this._tripDays = tripDays;
    this._tripEvents = this._tripDays.flat();
  }

  /**
  * Генерация разметки списка городов
  * @return {HTMLElement} Разметка списка городов
  */
  getTripInfoTitle() {
    let citiesList = [];
    this._tripEvents.forEach((tripEvent) => {
      citiesList.push(tripEvent.city);
    });
    return citiesList.join(` &mdash; `);
  }

  /**
  * Генерация разметки периода путешествия
  * @return {HTMLElement} Разметка периода путешествия
  */
  getTripInfoDates() {
    const startDate = this._tripEvents[0].startDate;
    const endDate = this._tripEvents[this._tripEvents.length - 1].endDate;
    const startMonth = MonthNames[startDate.getMonth()];
    const startDay = startDate.getDate();
    const endMonth = MonthNames[endDate.getMonth()];
    const endDay = endDate.getDate();
    return `${startMonth} ${startDay}&nbsp;&mdash;&nbsp;${startMonth === endMonth ? `` : endMonth} ${endDay}`;
  }

  /**
  * Генерация разметки информации о поездке
  * @param {Array} tripDays - Массив дней путешествия
  * @return {String} Разметка информации о поездке
  */
  getTemplate() {
    return (
      `<div class="trip-info__main">
        <h1 class="trip-info__title">${this.getTripInfoTitle()}</h1>

        <p class="trip-info__dates">${this.getTripInfoDates()}</p>
      </div>`
    );
  }
}
