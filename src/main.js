import SiteMenuComponent from './components/site-menu.js';
import EventAddBtnComponent from './components/event-add-button.js';
import TripDaysListComponent from './components/days-list.js';
import TripController from './controllers/trip.js';
import FilterController from './controllers/filter.js';

import {tripCards} from './mocks/event.js';
import PointsModel from './models/points.js';
import {render, RenderPosition} from './utils/render.js';
import {menuItems} from './utils/constants.js';

const siteControlsElement = document.querySelector(`.trip-controls`);
const tripMain = document.querySelector(`.trip-main`);
const siteTripEventsElement = document.querySelector(`.trip-events`);
const tripDaysComponent = new TripDaysListComponent().getElement();

const pointsModel = new PointsModel();
pointsModel.setPoints(tripCards);

const filterController = new FilterController(siteControlsElement, pointsModel);
render(siteControlsElement, new SiteMenuComponent(menuItems).getElement(), RenderPosition.BEFOREEND);
filterController.render();

const addNewEventButton = new EventAddBtnComponent();
render(tripMain, addNewEventButton.getElement(), RenderPosition.BEFOREEND);

render(siteTripEventsElement, tripDaysComponent, RenderPosition.BEFOREEND);

const tripController = new TripController(tripDaysComponent, pointsModel);
tripController.render();
document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripController.createPoint();
});
