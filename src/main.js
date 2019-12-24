import {createMenuTemplate} from './components/site-menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createTripSortTemplate} from './components/trip-sort.js';
import {createDaysListTemplate} from './components/days-list.js';
import {createAddEventTemplate} from './components/event-add.js';
import {createEditEventTemplate} from './components/event-edit.js';
import {createTripInfoTemplate} from './components/trip-info.js';


import {generateEvent, generateTripDays, tripCards, getTripCost} from './mocks/event.js';

const cardEdit = generateEvent();
const tripDays = generateTripDays(tripCards);

const siteTripInfoElement = document.querySelector(`.trip-info`);
const siteControlsElement = document.querySelector(`.trip-controls`);
const siteTripEventsElement = document.querySelector(`.trip-events`);
const newEventButton = document.querySelector(`.trip-main__event-add-btn`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteTripInfoElement, createTripInfoTemplate(tripDays), `afterbegin`);

const siteTripInfoCostElement = document.querySelector(`.trip-info__cost-value`);
siteTripInfoCostElement.textContent = getTripCost(tripDays);

render(siteControlsElement, createMenuTemplate());
render(siteControlsElement, createFilterTemplate());


render(siteTripEventsElement, createTripSortTemplate());
render(siteTripEventsElement, createDaysListTemplate(tripDays));

const siteTripEventsItemElement = document.querySelector(`.trip-events__item`);
render(siteTripEventsItemElement, createEditEventTemplate(cardEdit, tripDays), `afterbegin`);

/**
 * @description Событие открытия формы добавления Эвента
 */
newEventButton.addEventListener(`click`, () => {
  let newEventForm = document.querySelector(`form.trip-events__item`);
  if (!siteTripEventsElement.contains(newEventForm)) {
    render(siteTripEventsElement, createAddEventTemplate(), `afterbegin`);
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

