import AbstractSmartComponent from './abstract-smart-component.js';
import {
  EventCities,
  Transfers,
  Activitys,
  checkDate,
  getOffers,
  getRandomDescription
} from '../mocks/event.js';
import {capitalizeFirstLetter} from '../utils/util.js';

/**
 * Класс формы редактирования точки маршрута
 */
export default class EventEdit extends AbstractSmartComponent {
  constructor(tripCard) {
    super();
    this._tripCard = tripCard;
    this._tripCardForReset = Object.assign({}, tripCard);

    this._resetHandler = null;
    this._submitHandler = null;

    this._subscribeOnEvents();
  }

  /**
   * Генерация формы выбора активностей
   * @param {Array} types - Массив типов активностей
   * @param {Object} tripCard - Объект точки маршрута (содержащий определенную ативность)
   * @return {String} Разметка формы выбора активностей
   */
  createTypeTemplate(types, tripCard) {
    return types
      .map((typeItem) => {
        return (
          `<div class="event__type-item">
            <input
            id="event-type-${typeItem}-1"
            class="event__type-input
            visually-hidden"
            type="radio"
            name="event-type"
            value="${typeItem}"
            ${tripCard.type === typeItem && `checked`}
            >
            <label class="event__type-label  event__type-label--${typeItem}" for="event-type-${typeItem}-1">${capitalizeFirstLetter(typeItem)}</label>
          </div>`
        );
      })
      .join(`\n`);
  }

  /**
   * Генерация формы выбора пункта назначения
   * @param {Array} destinations - Массив городов
   * @return {String} Разметка формы выбора пункта назначения
   */
  createDestinationList(destinations) {
    return destinations
      .map((destination) => {
        return (
          `<option value="${destination}"></option>`
        );
      })
      .join(`\n`);
  }

  /**
   * Генерация формы редактирования точки маршрута
   * @param {Array} newEvent - Случайная точка маршрута
   * @param {Array} tripDays - Массив дней путешествия
   * @return {String} Разметка формы редактирования точки маршрута
   */
  getTemplate() {
    const {type, description, city, price, offers, startDate, endDate, photos, isFavorite} = this._tripCard;
    const transferType = this.createTypeTemplate(Transfers, this._tripCard);
    const activityType = this.createTypeTemplate(Activitys, this._tripCard);
    const destinationList = this.createDestinationList(EventCities);
    return (
      `<form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img
                class="event__type-icon"
                width="17" height="17"
                src="img/icons/${type}.png"
                alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${transferType}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${activityType}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${capitalizeFirstLetter(type)} ${Activitys.includes(type) ? `at` : `to`}
            </label>
            <input
              class="event__input
              event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${city}"
              list="destination-list-1">
              <datalist id="destination-list-1">
              ${destinationList}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input
              class="event__input
              event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${checkDate(startDate.getHours())}:${checkDate(startDate.getMinutes())}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input
              class="event__input
              event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${checkDate(endDate.getHours())}:${checkDate(endDate.getMinutes())}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input
              event__input--price"
              id="event-price-1"
              type="text"
              name="event-price"
              value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">

          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offers
                .map((offer) => {
                  return `
                    <div class="event__offer-selector">
                      <input
                        class="event__offer-checkbox  visually-hidden"
                        id="event-offer-${offer.type}-1"
                        type="checkbox"
                        name="event-offer-${offer.type}"
                        ${offer.checked && `checked`}
                      />
                      <label class="event__offer-label" for="event-offer-
                      ${offer.type}-1">
                        <span class="event__offer-title">${offer.name}</span>
                        &plus; &euro;&nbsp;<span class="event__offer-price">
                        ${offer.price}
                        </span>
                      </label>
                    </div>
                  `;
                })
                .join(``)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${photos
                  .map((photo) => {
                    return `<img class="event__photo" src="${photo}" alt="Event photo">`;
                  })
                  .join(``)}
              </div>
            </div>
          </section>
        </section>
      </form>`
    );
  }

  reset() {
    this._tripCard = Object.assign({}, this._tripCardForReset, {isFavorite: this._tripCard.isFavorite});
    this.rerender();
  }

  /**
  * Обраточик события клика на кнопку
  * @param {Function} handler - События при клике на стрелку
  */
  setArrowBtnCloseHandler(handler) {
    if (!this._resetHandler) {
      this._resetHandler = handler;
    }

    this.getElement().querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, handler);
  }

  /**
  * Обраточик события клика на кнопку
  * @param {Function} handler - События при клике на кнопку сброса
  */
  setBtnResetHandler(handler) {
    if (!this._resetHandler) {
      this._resetHandler = handler;
    }

    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);
  }

  /**
  * Обраточик события клика на кнопку
  * @param {Function} handler - События при клике на кнопку отправки
  */
  setBtnSubmitHandler(handler) {
    if (!this._submitHandler) {
      this._submitHandler = handler;
    }

    this.getElement().querySelector(`.event__save-btn`)
    .addEventListener(`click`, handler);
  }

  /**
  * Восстановление обработчиков событий
  */
  recoveryListeners() {
    this.setBtnSubmitHandler(this._submitHandler);
    this.setArrowBtnCloseHandler(this._resetHandler);
    this.setBtnResetHandler(this._resetHandler);
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__favorite-btn`).addEventListener(`click`, () => {
      this._tripCard = Object.assign({}, this._tripCard, {isFavorite: !this._tripCard.isFavorite});
    });

    element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      this._tripCard = Object.assign({}, this._tripCard,
          {offers: getOffers()},
          {type: evt.target.value}
      );
      this.rerender();
    });

    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      if (EventCities.includes(evt.target.value)) {
        this._tripCard = Object.assign({}, this._tripCard,
            {description: getRandomDescription()},
            {city: evt.target.value}
        );
      }
      this.rerender();
    });
  }
}
