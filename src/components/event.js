import AbstractComponent from './abstract-component.js';
import {activitys} from '../utils/constants';
import {checkDate, getDuration, formatDateTime, capitalizeFirstLetter} from '../utils/util.js';

export default class Event extends AbstractComponent {
  constructor(tripCard) {
    super();
    this._tripCard = tripCard;
  }

  getOfferMarkupTemplate(offers) {
    return offers.slice(0, 3).map((offer) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus; &euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>
      `);
    })
    .join(``);
  }

  getTemplate() {
    const {type, city, price, offers, startDate, endDate} = this._tripCard;
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
          <h3 class="event__title">${capitalizeFirstLetter(type)} ${activitys.includes(type) ? `in` : `to`} ${city}</h3>

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
            ${this.getOfferMarkupTemplate(offers)}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
    );
  }

  setArrowBtnOpenHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
