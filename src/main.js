import {createMenuTemplate} from './components/site-menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createTripSortTemplate} from './components/trip-sort.js';
import {createDaysListTemplate} from './components/days-list.js';
import {createAddEventTemplate} from './components/event-add.js';
import {createEditEventTemplate} from './components/event-edit.js';
import {createTripInfoTemplate} from './components/trip-info.js';


import {generateEvent, generateTripDays, tripEvents} from './mocks/event.js';

const cardEdit = generateEvent();
const tripDays = generateTripDays(tripEvents);

const siteTripInfoElement = document.querySelector(`.trip-info`);
const siteControlsElement = document.querySelector(`.trip-controls`);
const siteTripEventsElement = document.querySelector(`.trip-events`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteTripInfoElement, createTripInfoTemplate(), `afterbegin`);
render(siteControlsElement, createMenuTemplate());
render(siteControlsElement, createFilterTemplate());
render(siteTripEventsElement, createAddEventTemplate());
render(siteTripEventsElement, createDaysListTemplate(tripDays));
render(siteTripEventsElement, createTripSortTemplate(), `afterbegin`);

render(siteTripEventsElement, createEditEventTemplate(cardEdit));
