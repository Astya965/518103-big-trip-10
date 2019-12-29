import SiteMenuComponent from './components/site-menu.js';
import FilterComponent from './components/filter.js';
import TripSortComponent from './components/trip-sort.js';
import TripDaysListComponent from './components/days-list.js';
import EventAddComponent from './components/event-add.js';
import TripInfoComponent from './components/trip-info.js';
import EventComponent from './components/event.js';
import EventEditComponent from './components/event-edit.js';

import {replace, render, RenderPosition} from './util.js';

import {generateTripDays, tripCards, getTripCost} from './mocks/event.js';

const tripDays = generateTripDays(tripCards);

const siteTripInfoElement = document.querySelector(`.trip-info`);
const siteControlsElement = document.querySelector(`.trip-controls`);
const siteTripEventsElement = document.querySelector(`.trip-events`);
const newEventButton = document.querySelector(`.trip-main__event-add-btn`);

render(siteTripInfoElement, new TripInfoComponent(tripDays).getElement(), RenderPosition.AFTERBEGIN);

const siteTripInfoCostElement = document.querySelector(`.trip-info__cost-value`);
siteTripInfoCostElement.textContent = getTripCost(tripDays);

render(siteControlsElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(siteControlsElement, new FilterComponent().getElement(), RenderPosition.BEFOREEND);


render(siteTripEventsElement, new TripSortComponent().getElement(), RenderPosition.BEFOREEND);
render(siteTripEventsElement, new TripDaysListComponent(tripDays).getElement(), RenderPosition.BEFOREEND);

/**
 * @description Событие открытия формы добавления Эвента
 */
newEventButton.addEventListener(`click`, () => {
  let newEventForm = document.querySelector(`form.trip-events__item`);
  if (!siteTripEventsElement.contains(newEventForm)) {
    render(siteTripEventsElement, new EventAddComponent().getElement(), RenderPosition.AFTERBEGIN);
  }
});

/**
 * @description Закрытие формы добавления Эвента
 */
const closeForm = function () {
  const editForm = document.querySelector(`.event--edit`);
  if (editForm) {
    siteTripEventsElement.removeChild(editForm);
  }
};

/**
 * @description Событие закрытие формы добавления Эвента
 */
document.addEventListener(`click`, function (evt) {
  if (evt.target.matches(`.event__reset-btn`)) {
    closeForm();
  }
});
