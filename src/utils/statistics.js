import {EmojiValue} from './constants';

export const getLegendWithEmoji = (name) => {
  const emoji = EmojiValue[name.split(`-`)[0].toUpperCase()];
  return `${emoji} ${name.toUpperCase()}`;
};
