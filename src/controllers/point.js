import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';

import {render, replace, remove, RenderPosition} from '../utils/render.js';
import {Mode, EmptyPoint} from '../utils/constants.js';
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

  /**
  * Рендеринг точки маршрута
  * @param {Object} eventCard - Данные для точки маршрута
  * @param {String} mode - Режим карточки
  */
  render(eventCard, mode) {
    this._eventCard = eventCard;
    this._mode = mode;

    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventComponent(eventCard);
    this._eventEditComponent = new EventEditComponent(eventCard);

    /**
    * Событие открытия формы редактирования при клике на стрелку
    */
    this._eventComponent.setArrowBtnOpenHandler(() => {
      this._showEdit();
    });

    /**
    * Событие закрытия формы редактирования при клике на стрелку
    */
    this._eventEditComponent.setArrowBtnCloseHandler(() => {
      this._eventEditComponent.reset();
      this._showСard();
    });

    /**
    * Событие закрытия формы редактирования при клике на кнопку сброса
    */
    this._eventEditComponent.setBtnDeleteHandler(() => {
      this._onDataChange(this, this._eventCard, null);
      this._showСard();
    });

    /**
    * Событие закрытия формы редактирования при клике на кнопку отправки
    */
    this._eventEditComponent.setBtnSubmitHandler((evt) => {
      evt.preventDefault();
      const formData = this._eventEditComponent.getData();
      const data = this._parseFormData(formData);
      this._onDataChange(this, this._eventCard, data);
      this._showСard();
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
        this.setDefaultView();
        render(this._container, this._eventEditComponent.getElement(), RenderPosition.AFTERBEGIN);
        break;
    }
  }

  /**
  * Возвращение карточек в обычное состояние
  */
  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      this._showСard();
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  /**
  * Событие нажатия на Esc
  * @param {evt} evt
  */
  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      if (this._mode === Mode.ADD) {
        this._onDataChange(this, EmptyPoint, null);
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

  /**
  * Замена карточку маршрута на форму редактирования точки марщрута
  */
  _replaceCardToEdit() {
    replace(this._eventEditComponent, this._eventComponent);
  }

  /**
  * Замена формы редактирования точки марщрута на карточку маршрута
  */
  _replaceEditToCard() {
    replace(this._eventComponent, this._eventEditComponent);
  }

  _parseFormData(formData) {

    const offerLabels = [
      ...document.querySelectorAll(`label[for^="event-offer"]`)
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
      'is_favorite': formData.get(`event-favorite`) === `on` ? true : false,
      'offers': offerLabels.map((offer) => ({
        title: offer.querySelector(`.event__offer-title`).textContent,
        price: Number(offer.querySelector(`.event__offer-price`).textContent)
      })),
      'type': formData.get(`event-type`)
    });
  }

}
