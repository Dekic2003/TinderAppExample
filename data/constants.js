import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const CARD = {
  WIDTH: width * 0.9,
  HEIGHT: height * 0.78,
  BORDER_RADIUS: 20,
  OUT_OF_SCRREN: width * 0.5 * width,
};
export const COLORS = {
  like: '#00eda6',
  nope: '#ff086f',
};
export const ACTIONS_OFFSET = 100;
