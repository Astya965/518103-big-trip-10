import {createEventTemplate} from "../components/event";
import {MonthNames} from "../util.js";

export const createDaysListTemplate = (tripDays) => {
  return (
    `<ul class="trip-days">
        ${tripDays.map((day, i) => {
      const getTripDay = () => {
        const dayDate = day[0].startDate;
        return `${MonthNames[dayDate.getMonth()]} ${dayDate.getDate()}`;
      };

      return (
        `<li class="trip-days__item  day">
          <div class="day__info">
            <span class="day__counter">${i + 1}</span>
            <time class="day__date" datetime="${day[0].startDate}">${getTripDay()}</time>
          </div>
          <ul class="trip-events__list">
          ${day.map((tripCard) => createEventTemplate(tripCard)).join(`\n`)}
          </ul>
        </li>`
      );
    })}
    </ul>`
  );
};
