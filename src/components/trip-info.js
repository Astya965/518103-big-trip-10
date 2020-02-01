import AbstractComponent from './abstract-component.js';
import {formatMonthDay, formatDay, isSameMonth} from "../utils/util.js";

export default class TripInfo extends AbstractComponent {
  constructor(tripEvents) {
    super();
    this._tripEvents = tripEvents;
  }

  getTitleTemplate() {
    const destinationsList = [];
    this._tripEvents.forEach((tripEvent) => {
      destinationsList.push(tripEvent.city);
    });
    if (destinationsList.length <= 3) {
      return destinationsList.join(` &mdash; `);
    }
    return `${destinationsList[0]} &mdash; ... &mdash; ${destinationsList[destinationsList.length - 1]}`;
  }

  getDatesTemplate() {
    const startDate = this._tripEvents[0].startDate;
    const endDate = this._tripEvents[this._tripEvents.length - 1].endDate;

    return `${formatMonthDay(startDate)}&nbsp;&mdash;&nbsp;${isSameMonth(startDate, endDate) ? formatDay(endDate) : formatMonthDay(endDate)}`;
  }

  getTemplate() {
    return (
      `<div class="trip-info__main">
        <h1 class="trip-info__title">${this.getTitleTemplate()}</h1>

        <p class="trip-info__dates">${this.getDatesTemplate()}</p>
      </div>`
    );
  }
}
