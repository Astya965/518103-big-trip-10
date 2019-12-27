import {checkDate} from '../mocks/event.js';
import {createElement} from "../util.js";

/**
 * Класс формы точки маршрута
 */
export default class Event {
  constructor(tripCard) {
    this._tripCard = tripCard;
    this._element = null;
  }

  createEventOfferMarkup(offers) {
    return offers.map((offer) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${offer.name}</span>
          &plus; &euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>
      `);
    })
    .join(``);
  }

  /**
  * Генерация разметки точки маршрута
  * @param {Array} tripCard - Массив дней путешествия
  * @return {String} Разметка точки маршрута
  */
  getTemplate(tripCard) {
    return (
      `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img
              class="event__type-icon"
              width="42"
              height="42"
              src="img/icons/${tripCard.type.toLowerCase()}.png"
              alt="Event type icon">
          </div>
          <h3 class="event__title">${tripCard.type} to airport</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${tripCard.startDate}">
                ${checkDate(tripCard.startDate.getHours())}:${checkDate(tripCard.startDate.getMinutes())}
              </time>
              &mdash;
              <time class="event__end-time" datetime="${tripCard.endDate}">
                ${checkDate(tripCard.endDate.getHours())}:${checkDate(tripCard.endDate.getMinutes())}
              </time>
            </p>
            <p class="event__duration">${tripCard.duration}</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${tripCard.price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${this.createEventOfferMarkup(tripCard.offers)}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._tripDays));
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
