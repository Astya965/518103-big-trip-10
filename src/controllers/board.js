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
    this._tripDays = generateTripDays(this._tripCards);
    this._tripEvents = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
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

      this._tripEvents = this.renderTripEvents(this._onDataChange, this._onViewChange);

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        let sortedEvents = [];

        switch (sortType) {
          case SortTypes.DEFAULT:
            sortedEvents = this._tripCards;
            break;
          case SortTypes.TIME:
            sortedEvents = this._tripCards.slice().sort((a, b) => b.duration - a.duration);
            break;
          case SortTypes.PRICE:
            sortedEvents = this._tripCards.slice().sort((a, b) => b.price - a.price);
            break;
        }

        document.querySelector(`.trip-days`).remove();
        if (sortType === SortTypes.TIME || sortType === SortTypes.PRICE) {
          render(siteTripEventsElement, new SortedEventsContainer().getElement(), RenderPosition.BEFOREEND);
          const tripEventsList = document.querySelector(`.trip-events__list`);
          sortedEvents.forEach((sortedEvent) => {
            const pointController = new PointController(tripEventsList, this._onDataChange, this._onViewChange);
            pointController.render(sortedEvent);
          });
          return;
        } else if (sortType === SortTypes.DEFAULT) {
          render(siteTripEventsElement, new TripDaysListComponent(this._tripDays).getElement(), RenderPosition.BEFOREEND);
          this.renderTripEvents(this._onDataChange, this._onViewChange);
        }
      });
    }
  }

  /**
  * Изменение точки маршрута на основе новых данных
  * @param {Class} pointController
  * @param {Function} oldData - Старая точка маршрута
  * @param {Function} newData - Новая точка маршрута
  */
  _onDataChange(pointController, oldData, newData) {
    const i = this._tripDays.flat().findIndex((it) => it === oldData);
    if (i === -1) {
      return;
    }
    this._tripCards[i] = newData;
    pointController.render(newData);
  }

  _onViewChange() {
    this._tripEvents.forEach((it) => it.setDefaultView());
  }

  /**
  * Рендеринг точек маршрута
  * @param {Function} onDataChange
  * @param {Function} onViewChange
  * @return {Array} Массив элементов разметки точек маршрута
  */
  renderTripEvents(onDataChange, onViewChange) {
    const events = [];
    const tripEventsList = document.querySelectorAll(`.trip-events__list`);
    this._tripCards.forEach((tripCard) => {
      tripEventsList.forEach((tripDay) => {
        const pointController = new PointController(tripDay, onDataChange, onViewChange);
        if (tripDay.dataset.date === `${tripCard.startDate.getDate()}/${tripCard.startDate.getMonth()}`) {
          pointController.render(tripCard);
          events.push(pointController);
        }
      });
    });
    return events;
  }
}
