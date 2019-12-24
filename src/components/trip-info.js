import {MonthNames} from "../util.js";

export const createTripInfoTemplate = (tripDays) => {
  const tripEvents = tripDays.flat();

  const getTripInfoTitle = () => {
    let citiesList = [];
    tripEvents.forEach((tripEvent) => {
      citiesList.push(tripEvent.city);
    });
    return citiesList.join(` &mdash; `);
  };

  const getTripInfoDates = () => {
    const startDate = tripEvents[0].startDate;
    const endDate = tripEvents[tripEvents.length - 1].endDate;
    const startMonth = MonthNames[startDate.getMonth()];
    const startDay = startDate.getDate();
    const endMonth = MonthNames[endDate.getMonth()];
    const endDay = endDate.getDate();
    return `${startMonth} ${startDay}&nbsp;&mdash;&nbsp;${startMonth === endMonth ? `` : endMonth} ${endDay}`;
  };

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${getTripInfoTitle()}</h1>

      <p class="trip-info__dates">${getTripInfoDates()}</p>
    </div>`
  );
};
