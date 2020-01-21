import {FilterTypes} from '../utils/constants.js';
import {getPointsByFilter} from '../utils/filter.js';

export default class Point {
  constructor() {
    this._points = [];
    this._activeFilterType = FilterTypes.EVERYTHING;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getPoints() {
    return getPointsByFilter(this._points, this._activeFilterType);
  }

  setPoints(points) {
    this._points = Array.from(points);
  }

  updatePoint(id, point) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [...this._points.slice(0, index), point, ...this._points.slice(index + 1)];

    this._dataChangeHandlers.forEach((handler) => handler());
    return true;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  addPoint(point) {
    this._points = [point, ...this._points];
    this._callHandlers(this._dataChangeHandlers);
  }

  removePoint(id) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

