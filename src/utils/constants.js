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

export const Transfers = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

export const Activitys = [
  `check-in`,
  `sightseeing`,
  `restaurant`,
];

export const AUTHORIZATION = `Basic er883jdzbdw`;
export const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip/`;

export const EmptyPoint = {
  type: `taxi`,
  destination: ``,
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

export const ButtonText = {
  deleteButton: `Delete`,
  saveButton: `Save`
};
