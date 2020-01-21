import SiteMenuComponent from './components/site-menu.js';
import EventAddBtnComponent from './components/event-add-button.js';
import TripDaysListComponent from './components/days-list.js';
import StatisticsComponent from './components/statistics.js';
import TripController from './controllers/trip.js';
import FilterController from './controllers/filter.js';

import {tripCards} from './mocks/event.js';
import PointsModel from './models/points.js';
import {render, RenderPosition} from './utils/render.js';
import {MenuItem, menuItems} from './utils/constants.js';

const siteControlsElement = document.querySelector(`.trip-controls`);
const tripMainElement = document.querySelector(`.trip-main`);
const siteTripEventsElement = document.querySelector(`.trip-events`);
const siteMainElement = document.querySelector(`.page-main`);
const menuComponent = new SiteMenuComponent(menuItems);
const tripDaysComponent = new TripDaysListComponent();
const statisticsComponent = new StatisticsComponent();

const pointsModel = new PointsModel();
pointsModel.setPoints(tripCards);

const filterController = new FilterController(siteControlsElement, pointsModel);
render(siteControlsElement, menuComponent.getElement(), RenderPosition.BEFOREEND);
filterController.render();

const addNewEventButton = new EventAddBtnComponent();
render(tripMainElement, addNewEventButton.getElement(), RenderPosition.BEFOREEND);

render(siteTripEventsElement, tripDaysComponent.getElement(), RenderPosition.BEFOREEND);

const tripController = new TripController(tripDaysComponent, pointsModel);
tripController.render();
document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripController.createPoint();
});

render(siteMainElement, statisticsComponent.getElement(), RenderPosition.BEFOREEND);
statisticsComponent.generateChartsData(pointsModel.getPoints());
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

