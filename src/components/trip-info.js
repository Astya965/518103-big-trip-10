import {MonthNames, createElement} from "../util.js";

/**
 * Класс информации о поездке
 */
export default class TripInfo {
  constructor(tripDays) {
    this._tripDays = tripDays;
    this._tripEvents = this._tripDays.flat();
    this._element = null;
  }

  getTripInfoTitle() {
    let citiesList = [];
    this._tripEvents.forEach((tripEvent) => {
      citiesList.push(tripEvent.city);
    });
    return citiesList.join(` &mdash; `);
  }

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
