import AbstractComponent from './abstract-component.js';

export const SortTypes = {
  DEFAULT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

/**
 * Класс формы сортировки точек маршрута
 */
export default class FormTripSort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortTypes.DEFAULT;
  }
  /**
  * Генерация иконок для пунктов меню сортировки точек маршрута
  * @return {String} Разметка иконок для пунктов меню сортировки точек маршрута
  */
  createDirectionIcon() {
    return `
    <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
      <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
    </svg>
  `;
  }

  /**
  * Генерация разметки сортировки точек маршрута
  * @param {String} sortType - Тип пункта меню
  * @param {Boolean} isChecked - Выбран ли данный пункт
  * @return {String} Разметка сортировки точек маршрута
  */
  createSortFitlerTemplate(sortType, isChecked) {
    const directionIcon = (sortType === SortTypes.TIME || sortType === SortTypes.PRICE) ? this.createDirectionIcon() : ``;

    return `
    <div class="trip-sort__item  trip-sort__item--${sortType}">
      <input
        id="sort-${sortType}"
        data-sort-type="${sortType}"
        class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
        value="sort-${sortType}"
        ${isChecked ? `checked` : ``}
      >
      <label class="trip-sort__btn" for="sort-${sortType}">
        ${sortType} ${directionIcon}
      </label>
    </div>`;
  }

  /**
  * Генерация разметки сортировки точек маршрута
  * @return {String} Разметка сортировки точек маршрута
  */
  getTemplate() {
    const sortFitlersTemplate = Object.values(SortTypes).map((sortType, i) => this.createSortFitlerTemplate(sortType, i === 0)).join(`\n`);

    return (
      `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day">Day</span>
        ${sortFitlersTemplate}
        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form>`
    );
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const sortType = evt.target.dataset.sortType;

      if (sortType && sortType !== this._currentSortType) {
        this._currentSortType = sortType;
        handler(sortType);
      }
    });
  }
}
