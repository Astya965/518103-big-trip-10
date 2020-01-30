export const MAX_SHOWED_OFFERS_AMOUNT = 3;

export const AUTHORIZATION = `Basic er881jdzbdw`;
export const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip/`;

export const SHAKE_ANIMATION_TIMEOUT = 600;
export const SHAKE = `shake`;

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADD: `add`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export const SortType = {
  DEFAULT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

export const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`
};

export const menuItems = [
  {
    name: MenuItem.TABLE,
    active: true
  },
  {
    name: MenuItem.STATS,
    active: false
  }
];

export const LegendName = {
  MONEY: `MONEY`,
  TRANSPORT: `TRANSPORT`,
  TIME: `TIME`
};

export const LabelPrefix = {
  EURO: `€`,
  TIMES: `x`,
  HOURS: `H`
};

export const EmojiValue = {
  TAXI: `🚕`,
  BUS: `🚌`,
  TRAIN: `🚂`,
  SHIP: `🚢`,
  TRANSPORT: `🚊`,
  DRIVE: `🚗`,
  FLIGHT: `✈️`,
  CHECK: `🏨`,
  SIGHTSEEING: `🏛`,
  RESTAURANT: `🍴`
};

export const Method = {
  POST: `POST`,
  GET: `GET`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const transfers = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

export const activitys = [
  `check-in`,
  `sightseeing`,
  `restaurant`,
];

export const emptyPoint = {
  type: `taxi`,
  city: ``,
  startDate: Date.now(),
  endDate: Date.now(),
  offers: [],
  photos: [],
  description: ``,
  price: 0,
  isFavorite: false,
  id: `card-${Date.now() + Math.random()}`,
  isNew: true
};

export const defaultText = {
  deleteButton: ButtonText.DELETE,
  saveButton: ButtonText.SAVE
};

export const ButtonText = {
  SAVE: `Save`,
  DELETE: `Delete`,
  SAVING: `Saving...`,
  DELETING: `Deleting...`
};

export const NoEventMessage = {
  LOADING: `Loading...`,
  NO_POINTS: `Click New Event to create your first point`
};

export const Key = {
  ESCAPE: `Escape`,
  ESC: `Esc`
};
