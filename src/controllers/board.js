import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';
import NoEventsComponent from '../components/no-events.js';
import TripSortComponent from '../components/trip-sort.js';
import TripInfoComponent from '../components/trip-info.js';
import TripDaysListComponent from '../components/days-list.js';

import {generateTripDays, getTripCost, tripCards} from '../mocks/event.js';
import {render, replace, RenderPosition} from '../util.js';

const renderTripEvent = (container, eventCard) => {
  const eventComponent = new EventComponent(eventCard);
  const eventEditComponent = new EventEditComponent(eventCard);

  const replaceCardToEdit = () => {
    replace(eventComponent, eventEditComponent);
  };

  const replaceEditToCard = () => {
    replace(eventEditComponent, eventComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      replaceEditToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setArrowBtnOpenHandler(() => {
    replaceCardToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setArrowBtnCloseHandler(replaceEditToCard);

  render(container, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderTripEvents = (tripCard) => {
  const tripEventsList = document.querySelectorAll(`.trip-events__list`);
  tripEventsList.forEach((tripDay) => {
    if (tripDay.dataset.date === `${tripCard.startDate.getDate()}/${tripCard.startDate.getMonth()}`) {
      renderTripEvent(tripDay, tripCard);
    }
  });
};

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

      tripCards.forEach((tripCard) => {
        renderTripEvents(tripCard);
      });
    }
  }
}
