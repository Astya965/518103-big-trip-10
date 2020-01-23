import {Method} from '../utils/constants.js';
import Point from '../models/point.js';
import Store from "./store.js";

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(this._checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  getPoints() {
    return this._load({url: `points`})
      .then((response) => response.json())
      .then(Point.parsePoints);
  }

  createPoint() {}

  updatePoint() {}

  deletePoint() {}

  getDestinations() {
    return this._load({url: `destinations`})
      .then((response) => response.json())
      .then(Store.setDestinations);
  }

  getOffers() {
    return this._load({url: `offers`})
      .then((response) => response.json())
      .then(Store.setOffers);
  }
}
