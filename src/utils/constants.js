export const Modes = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADD: `add`
};

export const FilterTypes = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export const SortTypes = {
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
