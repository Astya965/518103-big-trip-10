import NoEventsComponent from '../components/no-events.js';
import TripSortComponent, {SortTypes} from '../components/sort.js';
import TripInfoComponent from '../components/trip-info.js';
import TripDaysListComponent from '../components/days-list.js';
import SortedEventsContainer from '../components/sorted-events-container.js';

import PointController from './point.js';

import {generateTripDays, getTripCost, tripCards} from '../mocks/event.js';
import {render, RenderPosition} from '../utils/render.js';

/**
 * Класс основной панели взаимодействия (инфрмация, сортировка, карточки
 * либо приветственное собщение при остутствии карточек)
 */
export default class BoardController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new TripSortComponent();
    this._tripCards = tripCards;
    this._tripDays = generateTripDays(tripCards);
    this._tripEvents = [];

    this._onDataChange = this._onDataChange.bind(this);
  }

  /**
  * Рендеринг основной панели взаимодействия
  */
  render() {
    const siteTripEventsElement = document.querySelector(`.trip-events`);

    if (tripCards.length === 0) {
      render(siteTripEventsElement, new NoEventsComponent().getElement(), RenderPosition.BEFOREEND);
    } else {
      const siteTripInfoElement = document.querySelector(`.trip-info`);

      render(siteTripEventsElement, this._sortComponent.getElement(), RenderPosition.BEFOREEND);
      render(siteTripInfoElement, new TripInfoComponent(this._tripDays).getElement(), RenderPosition.AFTERBEGIN);
      const siteTripInfoCostElement = document.querySelector(`.trip-info__cost-value`);
      siteTripInfoCostElement.textContent = getTripCost(this._tripDays);

      render(siteTripEventsElement, new TripDaysListComponent(this._tripDays).getElement(), RenderPosition.BEFOREEND);

      this._tripEvents = this.renderTripEvents();

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        let sortedEvents = [];

        switch (sortType) {
          case SortTypes.DEFAULT:
            sortedEvents = this._cards;
            break;
          case SortTypes.TIME:
            sortedEvents = this._cards.slice().sort((a, b) => b.duration - a.duration);
            break;
          case SortTypes.PRICE:
            sortedEvents = this._cards.slice().sort((a, b) => b.price - a.price);
            break;
        }

        document.querySelector(`.trip-days`).remove();
        if (sortType === SortTypes.TIME || sortType === SortTypes.PRICE) {
          render(siteTripEventsElement, new SortedEventsContainer().getElement(), RenderPosition.BEFOREEND);
          const tripEventsList = document.querySelector(`.trip-events__list`);
          sortedEvents.forEach((sortedEvent) => {
            const pointController = new PointController(tripEventsList, this._onDataChange);
            pointController.render(sortedEvent);
          });
          return;
        } else if (sortType === SortTypes.DEFAULT) {
          render(siteTripEventsElement, new TripDaysListComponent(this._tripDays).getElement(), RenderPosition.BEFOREEND);
          sortedEvents.forEach((tripCard) => {
            this.renderTripEvents(tripCard);
          });
        }
      });
    }
  }

  _onDataChange(oldEvent, newEvent) {
    const eventIndex = this._tripEvents.findIndex((tripEvent) => tripEvent === oldEvent);
    if (eventIndex !== -1) {
      this._tripEvents[eventIndex] = newEvent;
    }

    PointController.render(newEvent);
  }

  /**
  * Рендеринг точек маршрута
  * @param {Function} onDataChange - Что-то делает
  * @return {Array} Массив элементов разметки точек маршрута
  */
  renderTripEvents(onDataChange) {
    const events = [];
    const tripEventsList = document.querySelectorAll(`.trip-events__list`);
    this._tripCards.forEach((tripCard) => {
      tripEventsList.forEach((tripDay) => {
        const pointController = new PointController(tripDay, onDataChange);
        if (tripDay.dataset.date === `${tripCard.startDate.getDate()}/${tripCard.startDate.getMonth()}`) {
          pointController.render(tripCard);
          events.push(pointController);
        }
      });
    });
    return events;
  }
}
