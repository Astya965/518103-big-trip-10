import {MonthNames, createElement} from "../util.js";

/**
 * Генерация разметки информации о поездке
 * @param {Array} tripDays - Массив дней путешествия
 * @return {String} Разметка информации о поездке
 */
const createTripInfoTemplate = (tripDays) => {
  const tripEvents = tripDays.flat();

  const getTripInfoTitle = () => {
    let citiesList = [];
    tripEvents.forEach((tripEvent) => {
      citiesList.push(tripEvent.city);
    });
    return citiesList.join(` &mdash; `);
  };

  const getTripInfoDates = () => {
    const startDate = tripEvents[0].startDate;
    const endDate = tripEvents[tripEvents.length - 1].endDate;
    const startMonth = MonthNames[startDate.getMonth()];
    const startDay = startDate.getDate();
    const endMonth = MonthNames[endDate.getMonth()];
    const endDay = endDate.getDate();
    return `${startMonth} ${startDay}&nbsp;&mdash;&nbsp;${startMonth === endMonth ? `` : endMonth} ${endDay}`;
  };

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${getTripInfoTitle()}</h1>

      <p class="trip-info__dates">${getTripInfoDates()}</p>
    </div>`
  );
};

/**
 * Класс информации о поездке
 */
export default class TripInfo {
  constructor(tripDays) {
    this._tripDays = tripDays;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripDays);
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
