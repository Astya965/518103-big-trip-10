import AbstractSmartComponent from './abstract-smart-component.js';
import {
  Destinations,
  Transfers,
  Activitys,
  getOffers,
  getRandomDescription,
  getPhotos
} from '../mocks/event.js';
import {formatDateTime, getDatesDiff, capitalizeFirstLetter} from '../utils/util.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import moment from "moment";

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
    this._deleteHandler = null;
    this._flatpickr = {
      START: null,
      END: null
    };

    this._applyFlatpickr();
    this._subscribeOnEvents();
    this._removeFlatpickr = this._removeFlatpickr.bind(this);
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
    const {type, description, destination, price, offers, startDate, endDate, photos, isFavorite} = this._tripCard;
    const transferType = this.createTypeTemplate(Transfers, this._tripCard);
    const activityType = this.createTypeTemplate(Activitys, this._tripCard);
    const destinationList = this.createDestinationList(Destinations);
    return (
      `<form class="event event--edit" action="#" method="post">
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
            ${capitalizeFirstLetter(type)} ${Activitys.includes(type) ? `in` : `to`}
            </label>
            <input
              class="event__input
              event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${destination || ``}"
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
              value="${formatDateTime(startDate)}">
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
              value="${formatDateTime(endDate)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input event__input--price"
              id="event-price-1"
              type="number"
              name="event-price"
              value="${price}"
              required">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${destination > 0 ? `Delete` : `Cancel`}</button>

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

        ${destination ?
        `<section class="event__details">

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
                        ${offer.checked ? `checked` : ``}
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
        </section>`
        : ``}
      </form>`
    );
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
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
  setBtnDeleteHandler(handler) {
    if (!this._deleteHandler) {
      this._deleteHandler = handler;
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
    this.setBtnDeleteHandler(this._deleteHandler);
    this._subscribeOnEvents();
  }

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);

    return this._parseFormData(formData,
        this._tripCard.offers,
        this._tripCard.photos,
        this._tripCard.description,
        this._tripCard.id
    );
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
      if (Destinations.includes(evt.target.value)) {
        this._tripCard = Object.assign({}, this._tripCard,
            {description: getRandomDescription()},
            {photos: getPhotos()},
            {destination: evt.target.value}
        );
      }
      this.rerender();
    });

    element.querySelector(`.event__input--price`).addEventListener(`change`, (evt) => {
      if (evt.valid) {
        this._tripCard.price = +evt.target.value;
      }
    });
  }

  _removeFlatpickr() {
    if (this._flatpickr.START && this._flatpickr.END) {
      this._flatpickr.START.destroy();
      this._flatpickr.END.destroy();
      this._flatpickr.START = null;
      this._flatpickr.END = null;
    }
  }

  _applyFlatpickr() {
    this._removeFlatpickr();

    const [startDateInput, endDateInput] = Array.from(this.getElement().querySelectorAll(`.event__input--time`));
    this._flatpickr.START = this._createFlatpickrInput(startDateInput, this._tripCard.startDate);
    this._flatpickr.END = this._createFlatpickrInput(endDateInput, this._tripCard.endDate);
  }

  _setTimeValidation() {
    const startDateInput = this._element.querySelector(`input[name=event-start-time]`);
    if (getDatesDiff(this._tripCard.startDate, this._tripCard.endDate) > 0) {
      startDateInput.setCustomValidity(`The start time should be earlier than the end time`);
    } else {
      startDateInput.setCustomValidity(``);
    }
  }


  _createFlatpickrInput(node, date) {
    return flatpickr(node, {
      allowInput: true,
      enableTime: true,
      defaultDate: new Date(date),
      dateFormat: `d/m/Y H:i`,
      onValueUpdate: (pickerDate) => {
        if (node.name === `event-start-time`) {
          this._tripCard.startDate = pickerDate[0];
        } else {
          this._tripCard.endDate = pickerDate[0];
        }
        this._setTimeValidation();
      }
    });
  }

  _parseFormData(formData, offers, photos, description, id) {

    return {
      type: formData.get(`event-type`),
      destination: formData.get(`event-destination`),
      startDate: moment(formData.get(`event-start-time`), `DD/MM/YY HH:mm`
      ).valueOf(),
      endDate: moment(formData.get(`event-end-time`), `DD/MM/YY HH:mm`).valueOf(),
      offers: offers.map((offer) => {
        return {
          name: offer.name,
          price: offer.price,
          type: offer.type,
          checked:
            formData.get(`event-offer-${offer.type}`) === `on` ? true : false
        };
      }),
      photos,
      description,
      price: formData.get(`event-price`),
      id,
      isFavorite: formData.get(`event-favorite`) === `on`
    };
  }

}
