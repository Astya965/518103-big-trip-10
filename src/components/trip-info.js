import AbstractComponent from './abstract-component.js';
import {formatMonthDay, formatDay, isSameMonth} from "../utils/util.js";

/**
 * Класс информации о поездке
 */
export default class TripInfo extends AbstractComponent {
  constructor(tripEvents) {
    super();
    this._tripEvents = tripEvents;
  }

  /**
  * Генерация разметки списка городов
  * @return {HTMLElement} Разметка списка городов
  */
  getTripInfoTitle() {
    let destinationsList = [];
    this._tripEvents.forEach((tripEvent) => {
      destinationsList.push(tripEvent.city);
    });
    if (destinationsList.length <= 3) {
      return destinationsList.join(` &mdash; `);
    }
    return `${destinationsList[0]} &mdash; ... &mdash; ${destinationsList[destinationsList.length - 1]}`;
  }

  /**
  * Генерация разметки периода путешествия
  * @return {HTMLElement} Разметка периода путешествия
  */
  getTripInfoDates() {
    const startDate = this._tripEvents[0].startDate;
    const endDate = this._tripEvents[this._tripEvents.length - 1].endDate;

    return `${formatMonthDay(startDate)}&nbsp;&mdash;&nbsp;${isSameMonth(startDate, endDate) ? formatDay(endDate) : formatMonthDay(endDate)}`;
  }

  /**
  * Генерация разметки информации о поездке
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
