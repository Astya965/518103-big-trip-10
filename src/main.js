import SiteMenuComponent from './components/site-menu.js';
import EventAddBtnComponent from './components/event-add-button.js';
import TripDaysListComponent from './components/days-list.js';
import StatisticsComponent from './components/statistics.js';
import TripController from './controllers/trip.js';
import FilterController from './controllers/filter.js';

import PointsModel from './models/points.js';
import {render, RenderPosition} from './utils/render.js';
import {MenuItem, menuItems, END_POINT, AUTHORIZATION} from './utils/constants.js';
import API from "./api/api.js";

const siteControlsElement = document.querySelector(`.trip-controls`);
const tripMainElement = document.querySelector(`.trip-main`);
const siteTripEventsElement = document.querySelector(`.trip-events`);
const siteMainElement = document.querySelector(`.page-body__page-main`);
const menuComponent = new SiteMenuComponent(menuItems);
const tripDaysComponent = new TripDaysListComponent();

const api = new API(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel();

const statisticsComponent = new StatisticsComponent(pointsModel);

api.getPoints().then((points) => {
  console.log(points);
  pointsModel.setPoints(points);
  tripController.render(points);
});

const filterController = new FilterController(siteControlsElement, pointsModel);
render(siteControlsElement, menuComponent.getElement(), RenderPosition.BEFOREEND);
filterController.render();

const addNewEventButton = new EventAddBtnComponent();
render(tripMainElement, addNewEventButton.getElement(), RenderPosition.BEFOREEND);

render(siteTripEventsElement, tripDaysComponent.getElement(), RenderPosition.BEFOREEND);

const tripController = new TripController(tripDaysComponent, pointsModel);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripController.createPoint();
});

render(siteMainElement, statisticsComponent.getElement(), RenderPosition.BEFOREEND);
statisticsComponent.hide();

menuComponent.setChangeHandler((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      menuComponent.setActiveItem(MenuItem.TABLE);
      tripController.show();
      statisticsComponent.hide();
      break;
    case MenuItem.STATS:
      menuComponent.setActiveItem(MenuItem.STATS);
      statisticsComponent.show();
      tripController.hide();
      break;
  }
});

