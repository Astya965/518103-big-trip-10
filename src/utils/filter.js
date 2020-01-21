import {FilterTypes} from './constants.js';

export const getFuturePoints = (points) => {
  return points.filter((point) => point.startDate > Date.now());
};

export const getPastPoints = (points) => {
  return points.filter((point) => point.endDate < Date.now());
};

export const getPointsByFilter = (points, filterType) => {
  switch (filterType) {
    case FilterTypes.EVERYTHING:
      return points;
    case FilterTypes.FUTURE:
      return getFuturePoints(points);
    case FilterTypes.PAST:
      return getPastPoints(points);
  }

  return points;
};
