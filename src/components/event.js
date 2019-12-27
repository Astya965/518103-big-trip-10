import {checkDate} from '../mocks/event.js';
import {сreateElement} from "../util.js";

/**
 * Генерация разметки точки маршрута
 * @param {Array} tripDays - Массив дней путешествия
 * @return {String} Разметка точки маршрута
 */
const createEventTemplate = (tripDays) => {
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img
            class="event__type-icon"
            width="42"
            height="42"
            src="img/icons/${tripDays.type.toLowerCase()}.png"
            alt="Event type icon">
        </div>
        <h3 class="event__title">${tripDays.type} to airport</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${tripDays.startDate}">
              ${checkDate(tripDays.startDate.getHours())}:${checkDate(tripDays.startDate.getMinutes())}
            </time>
            &mdash;
            <time class="event__end-time" datetime="${tripDays.endDate}">
              ${checkDate(tripDays.endDate.getHours())}:${checkDate(tripDays.endDate.getMinutes())}
            </time>
          </p>
          <p class="event__duration">${tripDays.duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${tripDays.price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${tripDays.offers
            .map((offer) => {
              return `
                <li class="event__offer">
                  <span class="event__offer-title">${offer.name}</span>
                  &plus; &euro;&nbsp;
                  <span class="event__offer-price">${offer.price}</span>
                </li>
              `;
            })
            .join(``)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

/**
 * Класс формы точки маршрута
 */
export default class Event {
  constructor(tripDays) {
    this._tripDays = tripDays;
    this._element = null;
  }

  getTemplate() {
    return createEventTemplate(this._tripDays);
  }

  getElement() {
    if (!this._element) {
      this._element = сreateElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
