import {createMenuTemplate} from './components/site-menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createTripSortTemplate} from './components/trip-sort.js';
import {createDaysListTemplate} from './components/days-list.js';
import {createDayTemplate} from './components/day.js';
import {createAddEventTemplate} from './components/event-add.js';
import {createEventsListTemplate} from './components/events-list.js';
import {createEventTemplate} from './components/event.js';
import {createEditEventTemplate} from './components/event-edit.js';
import {createTripInfoTemplate} from './components/trip-info.js';


import {generateEvent, generateTripDays, tripEvents} from './mocks/event.js';

const DAY_COUNT = 1;
const CARD_COUNT = 3;

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
render(siteTripEventsElement, createDaysListTemplate());
render(siteTripEventsElement, createTripSortTemplate(), `afterbegin`);

const siteTripDaysElement = document.querySelector(`.trip-days`);
for (let i = 0; i < DAY_COUNT; i++) {
  render(siteTripDaysElement, createDayTemplate());
}

const tripDayElement = siteTripEventsElement.querySelector(`.day`);
render(tripDayElement, createEventsListTemplate());

const eventsList = tripDayElement.querySelector(`.trip-events__list`);
for (let i = 0; i < CARD_COUNT; i++) {
  render(eventsList, createEventTemplate(generateEvent()));
}
const eventElement = eventsList.querySelector(`.trip-events__item`);
render(eventElement, createEditEventTemplate(cardEdit));
