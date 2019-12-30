import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';
import NoEventsComponent from '../components/no-events.js';
import TripSortComponent from '../components/trip-sort.js';
import TripInfoComponent from '../components/trip-info.js';
import TripDaysListComponent from '../components/days-list.js';

import {generateTripDays, getTripCost, tripCards} from '../mocks/event.js';
import {render, replace, RenderPosition} from '../utils/render.js';

/**
* Рендеринг точки маршрута
* @param {HTMLElement} container - Место вставки элемнета точки маршрута
* @param {Object} eventCard - Данные для точки маршрута
*/
const renderTripEvent = (container, eventCard) => {
  const eventComponent = new EventComponent(eventCard);
  const eventEditComponent = new EventEditComponent(eventCard);

  /**
  * Замена карточку маршрута на форму редактирования точки марщрута
  */
  const replaceCardToEdit = () => {
    replace(eventComponent, eventEditComponent);
  };

  /**
  * Замена формы редактирования точки марщрута на карточку маршрута
  */
  const replaceEditToCard = () => {
    replace(eventEditComponent, eventComponent);
  };

  /**
  * Событие нажатия на Esc
  * @param {evt} evt
  */
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      replaceEditToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  /**
  * Событие открытия формы редактирования при клике на стрелку
  */
  eventComponent.setArrowBtnOpenHandler(() => {
    replaceCardToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  /**
  * Событие закрытия формы редактирования при клике на кнопку сброса
  */
  eventEditComponent.setBtnResetHandler(() => {
    replaceEditToCard();
  });

  /**
  * Событие закрытия формы редактирования при клике на кнопку отправки
  */
  eventEditComponent.setBtnSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToCard();
  });

  render(container, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

/**
* Рендеринг точки маршрута
* @param {Object} tripCard - Данные для точки маршрута
*/
const renderTripEvents = (tripCard) => {
  const tripEventsList = document.querySelectorAll(`.trip-events__list`);
  tripEventsList.forEach((tripDay) => {
    if (tripDay.dataset.date === `${tripCard.startDate.getDate()}/${tripCard.startDate.getMonth()}`) {
      renderTripEvent(tripDay, tripCard);
    }
  });
};

/**
 * Класс основной панели взаимодействия (инфрмация, сортировка, карточки
 * либо приветственное собщение при остутствии карточек)
 */
export default class BoardController {
  constructor(container) {
    this._container = container;
  }

  /**
  * Рендеринг основной панели взаимодействия
  */
  render() {
    const siteTripEventsElement = document.querySelector(`.trip-events`);

    if (tripCards.length === 0) {
      render(siteTripEventsElement, new NoEventsComponent().getElement(), RenderPosition.BEFOREEND);
    } else {
      const tripDays = generateTripDays(tripCards);
      const siteTripInfoElement = document.querySelector(`.trip-info`);

      render(siteTripEventsElement, new TripSortComponent().getElement(), RenderPosition.BEFOREEND);
      render(siteTripInfoElement, new TripInfoComponent(tripDays).getElement(), RenderPosition.AFTERBEGIN);
      const siteTripInfoCostElement = document.querySelector(`.trip-info__cost-value`);
      siteTripInfoCostElement.textContent = getTripCost(tripDays);

      render(siteTripEventsElement, new TripDaysListComponent(tripDays).getElement(), RenderPosition.BEFOREEND);

      tripCards.forEach((tripCard) => {
        renderTripEvents(tripCard);
      });
    }
  }
}
