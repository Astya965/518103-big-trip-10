import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';

import {render, replace, remove, RenderPosition} from '../utils/render.js';
import {Key, Mode, ButtonText, emptyPoint, SHAKE, SHAKE_ANIMATION_TIMEOUT} from '../utils/constants.js';
import PointModel from '../models/point.js';
import Store from '../api/store.js';

import moment from 'moment';

export default class PointContoller {
  constructor(container, onDataChange, onViewChange) {
    this._tripCard = null;
    this._container = container;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._mode = Mode.DEFAULT;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      this._showСard();
    }
  }

  render(eventCard, mode) {
    this._eventCard = eventCard;
    this._mode = mode;

    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventComponent(eventCard);
    this._eventEditComponent = new EventEditComponent(eventCard);

    this._eventComponent.setArrowBtnOpenHandler(() => {
      this._showEdit();
    });

    this._eventEditComponent.setArrowBtnCloseHandler(() => {
      this._showСard();
    });

    this._eventEditComponent.setBtnDeleteHandler(() => {
      this._eventEditComponent.setText({
        deleteButton: ButtonText.DELETING
      });
      this._onDataChange(this, this._eventCard, null);
      this._eventEditComponent.blockForm();
      this._eventEditComponent.reset();
    });

    this._eventEditComponent.setBtnSubmitHandler((evt) => {
      evt.preventDefault();
      const formData = this._eventEditComponent.getData();
      const data = this._parseFormData(formData);

      this._eventEditComponent.setText({
        saveButton: ButtonText.SAVING
      });

      this._onDataChange(this, this._eventCard, data);
      this._eventEditComponent.blockForm();
    });

    this._eventEditComponent.setFavoriteBtnClickHandler(() => {
      const newEventCard = PointModel.clone(eventCard);
      newEventCard.isFavorite = !newEventCard.isFavorite;

      this._onDataChange(this, eventCard, newEventCard);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventComponent && oldEventEditComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
        } else {
          render(this._container, this._eventComponent.getElement(), RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADD:
        this.setDefaultView();
        if (oldEventComponent && oldEventEditComponent) {
          remove(oldEventComponent);
          remove(oldEventEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._eventEditComponent.getElement(), RenderPosition.AFTERBEGIN);
        break;
    }
  }

  shake() {
    this._eventEditComponent.getElement().style.animation = `${SHAKE} ${SHAKE_ANIMATION_TIMEOUT /
      1000}s`;
    this._eventComponent.getElement().style.animation = `${SHAKE} ${SHAKE_ANIMATION_TIMEOUT /
      1000}s`;

    setTimeout(() => {
      this._eventEditComponent.getElement().style.animation = ``;
      this._eventComponent.getElement().style.animation = ``;

      this._eventEditComponent.setText({
        saveButton: ButtonText.SAVE,
        deleteButton: ButtonText.DELETE
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === Key.ESCAPE || evt.key === Key.ESC;
    if (isEscKey) {
      if (this._mode === Mode.ADD) {
        this._onDataChange(this, emptyPoint, null);
      }
      this._showСard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _showСard() {
    this._eventEditComponent.reset();
    this._replaceEditToCard();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _showEdit() {
    this._onViewChange();
    this._replaceCardToEdit();
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.EDIT;
  }

  _replaceCardToEdit() {
    replace(this._eventEditComponent, this._eventComponent);
  }

  _replaceEditToCard() {
    replace(this._eventComponent, this._eventEditComponent);
  }

  _parseFormData(formData) {

    const checkedOffersLabels = [
      ...document.querySelectorAll(`.event__offer-checkbox[checked=""]+label[for^="event-offer"]`)
    ];

    const destination = Store.getDestinations().find(
        (city) => city.name === formData.get(`event-destination`)
    );

    return new PointModel({
      'base_price': formData.get(`event-price`),
      'date_from': new Date(
          moment(formData.get(`event-start-time`), `DD/MM/YY HH:mm`).valueOf()
      ).toISOString(),
      'date_to': new Date(
          moment(formData.get(`event-end-time`), `DD/MM/YYYY HH:mm`).valueOf()
      ).toISOString(),
      'destination': {
        description: destination.description,
        name: destination.name,
        pictures: destination.pictures
      },
      'is_favorite': formData.get(`event-favorite`) === `on`,
      'offers': checkedOffersLabels.map((offer) => ({
        title: offer.querySelector(`.event__offer-title`).textContent,
        price: Number(offer.querySelector(`.event__offer-price`).textContent)
      })),
      'type': formData.get(`event-type`)
    });
  }

}
