import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit';

import {render, replace, RenderPosition} from '../utils/render.js';

export default class EventsList {
  constructor(container, tripCard) {
    this._tripCard = tripCard;
    this._container = container;
    this._event = new EventComponent(tripCard);
    this._editEvent = new EventEditComponent(tripCard);
  }

  replaceCardToEdit() {
    replace(this._event, this._editEvent);
  }

  replaceCardToEdit() {
    replace(this._editEvent, this._event);
  }

  render() {
    const tripEventsList = document.querySelectorAll(`.trip-events__list`);
    tripEventsList.forEach((eventListtItem) => {
      if (eventListtItem.dataset.date === `${this._tripCard.startDate.getDate()}/${this._tripCard.startDate.getMonth()}`) {
        render(this._container, this._tripCard, RenderPosition.BEFOREEND);
      }
    });
  }

  openCardButtonHandler() {
    this._event.setRollupButtonOpenHandler(() => {
      this.replaceCardToEdit();
    });
  }
}
