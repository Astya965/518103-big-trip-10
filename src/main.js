import SiteMenuComponent from './components/site-menu.js';
import FilterComponent from './components/filter.js';
import EventAddBtnComponent from './components/event-add-button.js';
import EventAddComponent from './components/event-add.js';
import TripController from './controllers/board.js';

import {tripCards} from './mocks/event.js';
import {render, remove, RenderPosition} from './utils/render.js';

const siteControlsElement = document.querySelector(`.trip-controls`);
const tripMain = document.querySelector(`.trip-main`);
const siteTripEventsElement = document.querySelector(`.trip-events`);

render(siteControlsElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(siteControlsElement, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

const addNewEventButton = new EventAddBtnComponent();
render(tripMain, addNewEventButton.getElement(), RenderPosition.BEFOREEND);
const newEventButton = document.querySelector(`.trip-main__event-add-btn`);

const tripController = new TripController(tripMain);
tripController.render(tripCards);

const newEventAdd = new EventAddComponent();
/**
* События клика на кнопку добавление новой точки маршрута
*/
addNewEventButton.setClickHandler(() => {
  newEventButton.setAttribute(`disabled`, ``);
  render(siteTripEventsElement, newEventAdd.getElement(), RenderPosition.AFTERBEGIN);
});
/**
* События клика на кнопку сброса в форме добавления новой точки маршрута
*/
newEventAdd.setEventResetButtonHandler(() => {
  remove(newEventAdd);
  newEventButton.removeAttribute(`disabled`, ``);
});
/**
* События клика на кнопку отправки в форме добавления новой точки маршрута
*/
newEventAdd.setEventSubmitButtonHandler((evt) => {
  evt.preventDefault();
  remove(newEventAdd);
});
