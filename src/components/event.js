import {checkDate} from '../mocks/event.js';

export const createEventTemplate = (newEvent) => {
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img
            class="event__type-icon"
            width="42"
            height="42"
            src="img/icons/${newEvent.type.toLowerCase()}.png"
            alt="Event type icon">
        </div>
        <h3 class="event__title">${newEvent.type} to airport</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${newEvent.startDate}">
              ${checkDate(newEvent.startDate.getHours())}:${checkDate(newEvent.startDate.getMinutes())}
            </time>
            &mdash;
            <time class="event__end-time" datetime="${newEvent.endDate}">
              ${checkDate(newEvent.endDate.getHours())}:${checkDate(newEvent.endDate.getMinutes())}
            </time>
          </p>
          <p class="event__duration">${newEvent.duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${newEvent.price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${newEvent.offers
            .map((offer) => {
              return `
                <li class="event__offer">
                  <span class="event__offer-title">${offer.name}</span>
                  &plus; &euro;&nbsp;
                  <span class="event__offer-price">${offer.price}</span>
                </li>
              `;
            })
            .join(``)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
