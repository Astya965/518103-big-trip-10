import AbstractComponent from './abstract-component.js';
import {Activitys} from '../mocks/event.js';
import {checkDate, getDuration, formatDateTime, capitalizeFirstLetter} from '../utils/util.js';

/**
 * Класс формы точки маршрута
 */
export default class Event extends AbstractComponent {
  constructor(tripCard) {
    super();
    this._tripCard = tripCard;
  }

  /**
  * Генерация разметки дополнительных предложений
  * @param {Array} offers - Массив дополнительных предложений
  * @return {String} Разметка дополнительных предложений
  */
  createEventOfferMarkup(offers) {
    return offers.filter((offer) => offer.checked).map((offer) => {
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
  getTemplate() {
    const {type, destination, price, offers, startDate, endDate} = this._tripCard;
    return (
      `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img
              class="event__type-icon"
              width="42"
              height="42"
              src="img/icons/${type}.png"
              alt="Event type icon">
          </div>
          <h3 class="event__title">${capitalizeFirstLetter(type)} ${Activitys.includes(type) ? `in` : `to`} ${destination}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${startDate}">
                ${formatDateTime(startDate)}
              </time>
              &mdash;
              <time class="event__end-time" datetime="${endDate}">
                ${formatDateTime(endDate)}
              </time>
            </p>
            <p class="event__duration">${checkDate(getDuration(startDate, endDate))}</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${this.createEventOfferMarkup(offers)}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
    );
  }

  /**
  * Обраточик события клика на кнопку
  * @param {Function} handler - События при клике на кнопку
  */
  setArrowBtnOpenHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
