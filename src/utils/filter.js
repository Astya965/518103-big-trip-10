import {FilterType} from './constants.js';

export const getFuturePoints = (points) => {
  return points.filter((point) => point.startDate > Date.now());
};

export const getPastPoints = (points) => {
  return points.filter((point) => point.endDate < Date.now());
};

export const getPointsByFilter = (points, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.FUTURE:
      return getFuturePoints(points);
    case FilterType.PAST:
      return getPastPoints(points);
  }

  return points;
};
