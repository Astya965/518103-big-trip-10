import AbstractSmartComponent from './abstract-smart-component.js';
import {transfers, activitys, defaultText} from '../utils/constants.js';
import Store from "../api/store.js";
import {formatDateTime, getDatesDiff, capitalizeFirstLetter} from '../utils/util.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class EventEdit extends AbstractSmartComponent {
  constructor(tripCard) {
    super();
    this._tripCard = tripCard;
    this._tripCardForReset = Object.assign({}, tripCard);

    this._destinations = Store.getDestinations();
    this._offers = Store.getOffers();
    this._buttonText = defaultText;

    this._resetHandler = null;
    this._submitHandler = null;
    this._deleteHandler = null;
    this._favoriteHandler = null;
    this._flatpickr = {
      START: null,
      END: null
    };

    this._applyFlatpickr();
    this._subscribeOnEvents();
    this._removeFlatpickr = this._removeFlatpickr.bind(this);
  }

  getTypeTemplate(types, tripCard) {
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

  getDestinationListTemplate(destinations) {
    return destinations
      .map((destination) => {
        return (
          `<option value="${destination.name}"></option>`
        );
      })
      .join(`\n`);
  }

  getTemplate() {
    const {type, price, description, city, startDate, endDate, photos, isFavorite, isNew} = this._tripCard;
    const transferType = this.getTypeTemplate(transfers, this._tripCard);
    const activityType = this.getTypeTemplate(activitys, this._tripCard);
    const destinationList = this.getDestinationListTemplate(this._destinations);
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
            ${capitalizeFirstLetter(type)} ${activitys.includes(type) ? `in` : `to`}
            </label>
            <input
              class="event__input
              event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${this._tripCard.city || ``}"
              required
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
              min="0"
              required>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">${this._buttonText.saveButton}</button>
          <button class="event__reset-btn" type="reset">${!isNew ? this._buttonText.deleteButton : `Cancel`}</button>

        ${!isNew ?
        `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`
        : ``}

        </header>

        ${(city || this._offers.find(
          (offer) => offer.type === this._tripCard.type).offers).length > 0 ?
        `<section class="event__details">
          <section class="event__section  event__section--offers">
          ${(this._offers.find(
          (offer) => offer.type === this._tripCard.type).offers).length > 0 ? `<h3 class="event__section-title  event__section-title--offers">Offers</h3>` : ``}


            <div class="event__available-offers">
              ${(this._offers.find(
          (offer) => offer.type === this._tripCard.type).offers)
                .map((offer, i) => {
                  return `
                    <div class="event__offer-selector">
                      <input
                        class="event__offer-checkbox  visually-hidden"
                        id="event-offer-${type}-${i + 1}"
                        type="checkbox"
                        name="event-offer-${type}"
                        ${this._tripCard.offers.find((offerItem) => offerItem.title === offer.title) ? `checked` : ``}
                      />
                      <label class="event__offer-label" for="event-offer-${type}-${i + 1}">
                        <span class="event__offer-title">${offer.title}</span>
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
            ${city ? `<h3 class="event__section-title  event__section-title--destination">Destination</h3>` : ``}
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${photos
                  .map((photo) => {
                    return `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;
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

  getData() {
    const form = this.getElement();
    return new FormData(form);
  }

  setText(text) {
    this._buttonText = Object.assign({}, defaultText, text);
    this.rerender();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  reset() {
    this._tripCard = Object.assign({}, this._tripCardForReset, {isFavorite: this._tripCard.isFavorite});
    this.rerender();
  }

  blockForm() {
    const form = this.getElement();

    form.querySelectorAll(`input`).forEach((input) => {
      input.disabled = true;
    });
    form.querySelectorAll(`button`).forEach((button) => {
      button.disabled = true;
    });
  }

  recoveryListeners() {
    this.setBtnSubmitHandler(this._submitHandler);
    this.setArrowBtnCloseHandler(this._resetHandler);
    this.setBtnDeleteHandler(this._deleteHandler);
    this.setFavoriteBtnClickHandler(this._favoriteHandler);
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      this._tripCard = Object.assign({}, this._tripCard,
          {offers: this._offers.find(
              (offer) => offer.type === this._tripCard.type).offers},
          {type: evt.target.value}
      );
      this.rerender();
    });

    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      if (this._destinations.find((destination) => destination.name === evt.target.value)) {
        element.querySelector(`input[name=event-destination]`).setCustomValidity(``);
        this._tripCard = Object.assign({}, this._tripCard,
            {description: this._destinations.find(
                (destination) => destination.name === evt.target.value).description},
            {photos: this._destinations.find(
                (destination) => destination.name === evt.target.value).pictures},
            {city: evt.target.value}
        );
        this.rerender();
      } else {
        this._tripCard.city = ``;
        element.querySelector(`input[name=event-destination]`).setAttribute(`style`, `outline: 1px solid red`);
        element.querySelector(`input[name=event-destination]`).setCustomValidity(`Choose a city from the list`);
      }
    });

    element.querySelector(`.event__input--price`).addEventListener(`change`, (evt) => {
      if (+evt.target.value < 0 || +evt.target.value % 1 !== 0) {
        element.querySelector(`input[name=event-price]`).setAttribute(`style`, `outline: 1px solid red`);
        element.querySelector(`input[name=event-price]`).setCustomValidity(`Price should be a positive integer`);
      } else {
        element.querySelector(`input[name=event-destination]`).setCustomValidity(``);
        this._tripCard = Object.assign({}, this._tripCard,
            {price: +evt.target.value}
        );
        this.rerender();
      }
    });

    if ((this._offers.find((offer) => offer.type === this._tripCard.type).offers).length > 0) {
      element.querySelectorAll(`.event__offer-checkbox`).forEach((checkbox) => checkbox.addEventListener(`click`, () => {
        if (checkbox.hasAttribute(`checked`)) {
          checkbox.removeAttribute(`checked`);
        } else {
          checkbox.setAttribute(`checked`, ``);
        }
      }));
    }

    const form = this.getElement();
    this.getElement().querySelector(`.event__save-btn`).disabled = true;
    if (form.checkValidity()) {
      this.getElement().querySelector(`.event__save-btn`).disabled = false;
    }
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
    const startDateInput = this.getElement().querySelector(`input[name=event-start-time]`);
    if (getDatesDiff(this._tripCard.startDate, this._tripCard.endDate) > 0) {
      startDateInput.setCustomValidity(`The start time should be earlier than the end time`);
      this.getElement().querySelector(`.event__save-btn`).disabled = true;
    } else {
      startDateInput.setCustomValidity(``);
      this.getElement().querySelector(`.event__save-btn`).disabled = false;
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
          this._tripCard = Object.assign({}, this._tripCard,
              {startDate: pickerDate[0]}
          );
        } else {
          this._tripCard = Object.assign({}, this._tripCard,
              {endDate: pickerDate[0]}
          );
        }
        this._setTimeValidation();
      }
    });
  }

  setArrowBtnCloseHandler(handler) {
    if (!this._resetHandler) {
      this._resetHandler = handler;
    }

    if (!this._tripCard.isNew) {
      this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
    }

  }

  setBtnDeleteHandler(handler) {
    if (!this._deleteHandler) {
      this._deleteHandler = handler;
    }

    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);
  }

  setBtnSubmitHandler(handler) {
    if (!this._submitHandler) {
      this._submitHandler = handler;
    }

    this.getElement().querySelector(`.event__save-btn`)
    .addEventListener(`click`, handler);
  }

  setFavoriteBtnClickHandler(handler) {
    if (!this._favoriteHandler) {
      this._favoriteHandler = handler;
    }

    if (!this._tripCard.isNew) {
      this.getElement().querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, handler);
    }
  }

}
