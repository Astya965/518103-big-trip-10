import NoEventsComponent from '../components/no-events.js';
import TripSortComponent from '../components/sort.js';
import TripInfoComponent from '../components/trip-info.js';
import TripDayItemComponent from '../components/day.js';

import PointController from './point.js';
import {Modes, SortTypes} from '../utils/constants.js';
import {getDurationSeconds} from '../utils/util.js';
import {render, RenderPosition} from '../utils/render.js';
import {EmptyPoint} from '../mocks/event.js';

const tripEvents = document.querySelector(`.trip-events`);
const tripInfo = document.querySelector(`.trip-main__trip-info`);

/**
 * Класс основной панели взаимодействия (инфрмация, сортировка, карточки
 * либо приветственное собщение при остутствии карточек)
 */
export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._sortComponent = new TripSortComponent();
    this._pointsModel = pointsModel;
    this._tripCards = this._pointsModel.getPoints();
    this._showedPointControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
    this._creatingPoint = null;
    this._isDefaultSorting = true;
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    this._creatingPoint = new PointController(
        this._container.getElement(),
        this._onDataChange,
        this._onViewChange
    );

    this._creatingPoint.render(EmptyPoint, Modes.ADD);
    this._onViewChange();
  }

  render() {
    if (this._pointsModel.getPoints().length === 0) {
      render(tripEvents, new NoEventsComponent().getElement(), RenderPosition.BEFOREEND);
    } else {
      render(tripInfo, new TripInfoComponent(this._pointsModel.getPoints()).getElement(), RenderPosition.AFTERBEGIN);
      render(tripEvents, this._sortComponent.getElement(), RenderPosition.AFTERBEGIN);
      this._getFullPrice();

      this._showedPointControllers = this.renderTripEvents(this._tripCards, this._container.getElement(), this._onDataChange, this._onViewChange);

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        let sortedEvents = [];
        this._isDefaultSorting = false;

        switch (sortType) {
          case SortTypes.DEFAULT:
            sortedEvents = this._pointsModel.getPoints().slice().sort((a, b) => a.startDate - b.startDate);
            this._isDefaultSorting = true;
            break;
          case SortTypes.TIME:
            sortedEvents = this._tripCards.slice().sort((a, b) => getDurationSeconds(b.startDate, b.endDate) - getDurationSeconds(a.startDate, a.endDate));
            break;
          case SortTypes.PRICE:
            sortedEvents = this._tripCards.slice().sort((a, b) => b.price - a.price);
            break;
        }

        this._removePoints();
        this._showedPointControllers = this.renderTripEvents(sortedEvents, this._container.getElement(), this._onDataChange, this._onViewChange, this._isDefaultSorting);
      });
    }
  }

  /**
  * Получение полной стоимости маршрута, включая offersЫ
  */
  _getFullPrice() {
    const fullPrice = this._tripCards.reduce((acc, item) => {
      return (
        acc +
        Number(item.price) +
        item.offers.reduce((_acc, _item) => _acc + Number(_item.price), 0)
      );
    }, 0);

    document.querySelector(`.trip-info__cost-value`).textContent = fullPrice;
  }

  /**
  * Изменение точки маршрута на основе новых данных
  * @param {Class} pointController
  * @param {Function} oldData - Старая точка маршрута
  * @param {Function} newData - Новая точка маршрута
  */
  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._pointsModel.addPoint(newData);

        this._showedPointControllers = [
          pointController,
          ...this._showedPointControllers
        ];

        this._removePoints();

        this._showedPointControllers = this.renderTripEvents(
            this._pointsModel.getPoints(),
            this._container.getElement(),
            this._onDataChange,
            this._onViewChange,
            this._isDefaultSorting
        );
      }
    } else if (newData === null) {
      this._pointsModel.removePoint(oldData.id);
      this._updatePoints();
    } else {
      const isUpdate = this._pointsModel.updatePoint(oldData.id, newData);
      if (isUpdate) {
        pointController.render(newData, Modes.DEFAULT);
      }
    }
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updatePoints();
  }

  _removePoints() {
    this._container.getElement().innerHTML = ``;
    this._showedPointControllers.forEach((pointController) =>
      pointController.destroy()
    );
    this._showedPointControllers = [];
  }

  _updatePoints() {
    this._removePoints();

    this._showedPointControllers = this.renderTripEvents(
        this._pointsModel.getPoints(),
        this._container.getElement(),
        this._onDataChange,
        this._onViewChange
    );
  }

  renderTripEvents(cards, container, onDataChange, onViewChange, isDefaultSorting = true) {
    const pointControllers = [];
    const dates = isDefaultSorting
      ? [...new Set(cards.map((item) => new Date(item.startDate).toDateString()))]
      : [true];

    // Сортировка по дням
    dates.forEach((date, dateIndex) => {
      const day = isDefaultSorting
        ? new TripDayItemComponent(new Date(date), dateIndex + 1)
        : new TripDayItemComponent();

      // Отбор карточек для каждого дня, если это дефолтная сортировка, а далее генарация самих карточек
      cards.filter((_card) => {
        return isDefaultSorting
          ? new Date(_card.startDate).toDateString() === date
          : _card;
      })
      .forEach((_card) => {
        const pointController = new PointController(
            day.getElement().querySelector(`.trip-events__list`),
            onDataChange,
            onViewChange
        );
        pointController.render(_card, Modes.DEFAULT);
        pointControllers.push(pointController);
      });

      render(container, day.getElement(), RenderPosition.BEFOREEND);
    });

    return pointControllers;
  }
}
