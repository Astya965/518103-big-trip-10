import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';

import {render, replace, RenderPosition} from '../utils/render.js';

export default class PointContoller {
  constructor(container) {
    this._container = container;
  }

  /**
  * Рендеринг точки маршрута
  * @param {Object} eventCard - Данные для точки маршрута
  */
  render(eventCard) {
    this._eventCard = eventCard;

    this._eventComponent = new EventComponent(eventCard);
    this._eventEditComponent = new EventEditComponent(eventCard);

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

    render(this._container, this._eventComponent.getElement(), RenderPosition.BEFOREEND);
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
