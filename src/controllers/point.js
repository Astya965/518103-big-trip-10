import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';

import {render, replace, RenderPosition} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointContoller {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._eventComponent = null;
    this._editEventComponent = null;

    this._mode = Mode.DEFAULT;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._replaceEditToCard = this._replaceEditToCard.bind(this);
    this._replaceCardToEdit = this._replaceCardToEdit.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  /**
  * Рендеринг точки маршрута
  * @param {Object} eventCard - Данные для точки маршрута
  */
  render(eventCard) {
    this._eventCard = eventCard;

    this._eventComponent = new EventComponent(eventCard);
    this._eventEditComponent = new EventEditComponent(eventCard);

    const oldEventComponent = this._eventComponent;
    const oldEditEventComponent = this._eventEditComponent;

    /**
    * Событие открытия формы редактирования при клике на стрелку
    */
    this._eventComponent.setArrowBtnOpenHandler(() => {
      this._replaceCardToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    /**
    * Событие закрытия формы редактирования при клике на стрелку
    */
    this._eventEditComponent.setArrowBtnCloseHandler(() => {
      this._replaceEditToCard();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    /**
    * Событие закрытия формы редактирования при клике на кнопку сброса
    */
    this._eventEditComponent.setBtnResetHandler(() => {
      this._replaceEditToCard();
    });

    /**
    * Событие закрытия формы редактирования при клике на кнопку отправки
    */
    this._eventEditComponent.setBtnSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToCard();
    });

    /**
    * Событие добления карточки в избранное при клике на кнопку «Favorite»
    */
    this._eventEditComponent.setFavoriteHandler(() => {
      this._onDataChange(this, this._eventCard, Object.assign({}, this._eventCard, {
        isFavorite: !oldEventComponent.isFavorite
      }));
    });

    if (oldEventComponent && oldEditEventComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEditEventComponent);
    }
    render(this._container, this._eventComponent.getElement(), RenderPosition.BEFOREEND);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceCardToEdit();
    }
  }

  /**
  * Событие нажатия на Esc
  * @param {evt} evt
  */
  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._replaceEditToCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  /**
  * Замена карточку маршрута на форму редактирования точки марщрута
  */
  _replaceCardToEdit() {
    replace(this._eventComponent, this._eventEditComponent);
  }

  /**
  * Замена формы редактирования точки марщрута на карточку маршрута
  */
  _replaceEditToCard() {
    replace(this._eventEditComponent, this._eventComponent);
  }

}
