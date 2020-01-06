import NoEventsComponent from '../components/no-events.js';
import TripSortComponent, {SortTypes} from '../components/sort.js';
import TripInfoComponent from '../components/trip-info.js';
import TripDaysListComponent from '../components/days-list.js';
import SortedEventsContainer from '../components/sorted-events-container.js';

import PointController from './point.js';

import {generateTripDays, getTripCost, tripCards} from '../mocks/event.js';
import {render, RenderPosition} from '../utils/render.js';

/**
* Рендеринг точек маршрута
* @param {Object} tripCard - Данные для точки маршрута
*/
const renderTripEvents = (tripCard) => {
  const tripEventsList = document.querySelectorAll(`.trip-events__list`);
  tripEventsList.forEach((tripDay) => {
    const pointController = new PointController(tripDay);
    if (tripDay.dataset.date === `${tripCard.startDate.getDate()}/${tripCard.startDate.getMonth()}`) {
      pointController.render(tripCard);
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
    this._sortComponent = new TripSortComponent();
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

      render(siteTripEventsElement, this._sortComponent.getElement(), RenderPosition.BEFOREEND);
      render(siteTripInfoElement, new TripInfoComponent(tripDays).getElement(), RenderPosition.AFTERBEGIN);
      const siteTripInfoCostElement = document.querySelector(`.trip-info__cost-value`);
      siteTripInfoCostElement.textContent = getTripCost(tripDays);

      render(siteTripEventsElement, new TripDaysListComponent(tripDays).getElement(), RenderPosition.BEFOREEND);


      tripCards.forEach((tripCard) => {
        renderTripEvents(tripCard);
      });

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        let sortedEvents = [];

        switch (sortType) {
          case SortTypes.DEFAULT:
            sortedEvents = tripCards;
            break;
          case SortTypes.TIME:
            sortedEvents = tripCards.slice().sort((a, b) => b.duration - a.duration);
            break;
          case SortTypes.PRICE:
            sortedEvents = tripCards.slice().sort((a, b) => b.price - a.price);
            break;
        }

        document.querySelector(`.trip-days`).remove();
        if (sortType === SortTypes.TIME || sortType === SortTypes.PRICE) {
          render(siteTripEventsElement, new SortedEventsContainer().getElement(), RenderPosition.BEFOREEND);
          const tripEventsList = document.querySelector(`.trip-events__list`);
          sortedEvents.forEach((sortedEvent) => {
            const pointController = new PointController(tripEventsList);
            pointController.render(sortedEvent);
          });
          return;
        } else if (sortType === SortTypes.DEFAULT) {
          render(siteTripEventsElement, new TripDaysListComponent(tripDays).getElement(), RenderPosition.BEFOREEND);
          sortedEvents.forEach((tripCard) => {
            renderTripEvents(tripCard);
          });
        }
      });
    }
  }
}
