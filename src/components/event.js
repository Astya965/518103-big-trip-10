import {checkDate} from '../mocks/event.js';
import {createElement} from "../utils/render.js";

/**
 * Класс формы точки маршрута
 */
export default class Event {
  constructor(tripCard) {
    this._tripCard = tripCard;
    this._element = null;
  }

  /**
  * Генерация разметки дополнительных предложений
  * @param {Array} offers - Массив дополнительных предложений
  * @return {String} Разметка дополнительных предложений
  */
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
  getTemplate() {
    const {type, duration, city, price, offers, startDate, endDate} = this._tripCard;
    return (
      `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img
              class="event__type-icon"
              width="42"
              height="42"
              src="img/icons/${type.toLowerCase()}.png"
              alt="Event type icon">
          </div>
          <h3 class="event__title">${type} to ${city}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${startDate}">
                ${checkDate(startDate.getHours())}:${checkDate(startDate.getMinutes())}
              </time>
              &mdash;
              <time class="event__end-time" datetime="${endDate}">
                ${checkDate(endDate.getHours())}:${checkDate(endDate.getMinutes())}
              </time>
            </p>
            <p class="event__duration">${duration}</p>
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
  * Создание DOM-элемента
  * @return {HTMLElement} Возвращать созданный DOM-элемент
  */
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._tripDays));
    }
    return this._element;
  }

  /**
  * Удаление ссылки на DOM-элемент
  */
  removeElement() {
    this._element = null;
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
