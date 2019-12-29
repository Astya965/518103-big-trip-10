import NoEventsComponent from '../components/no-events.js';
import TripSortComponent from '../components/trip-sort.js';
import TripInfoComponent from '../components/trip-info.js';
import TripDaysListComponent from '../components/days-list.js';

import {generateTripDays, getTripCost, tripCards} from '../mocks/event.js';
import {render, RenderPosition} from '../util.js';

export default class BoardController {
  constructor(container) {
    this._container = container;
  }

  render() {
    const siteTripEventsElement = document.querySelector(`.trip-events`);
    render(siteTripEventsElement, new TripSortComponent().getElement(), RenderPosition.BEFOREEND);

    if (tripCards.length === 0) {
      render(siteTripEventsElement, new NoEventsComponent().getElement(), RenderPosition.BEFOREEND);
    } else {
      const tripDays = generateTripDays(tripCards);
      const siteTripInfoElement = document.querySelector(`.trip-info`);

      render(siteTripInfoElement, new TripInfoComponent(tripDays).getElement(), RenderPosition.AFTERBEGIN);
      const siteTripInfoCostElement = document.querySelector(`.trip-info__cost-value`);
      siteTripInfoCostElement.textContent = getTripCost(tripDays);

      render(siteTripEventsElement, new TripDaysListComponent(tripDays).getElement(), RenderPosition.BEFOREEND);
    }
  }
}
