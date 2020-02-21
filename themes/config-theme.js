import { StyleSheet, Dimensions } from 'react-native';
import { build } from '@agiletechvn/react-theme';

import colors from './colors';
import magicFunctions from './magicFunctions';
import { light, night } from './modes';
import { statusBar } from './statusBar';


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const fontRem = 20;

const fonts = {
  // lora: 'Lora-Regular',
  // loraI: 'Lora-Italic',
  // loraB: 'Lora-Bold',
  // loraBI: 'Lora-BoldItalic',
  sf: 'SFProText-Light',
  sfLI: 'SFProText-LightItalic',
  sfB: 'SFProText-Bold',
  sfBI: 'SFProText-BoldItalic',
  sfM: 'SFProText-Medium',
  sfMI: 'SFProText-MediumItalic',
  sfR: 'SFProText-Regular',
  sfRI: 'SFProText-RegularItalic',
  sfSb: 'SFProText-Semibold',
  sfSbI: 'SFProText-SemiboldItalic'
};

export const buildTheme = (isNightMode = false) => build(
  {
    fonts,
    colors: isNightMode ? { ...colors, ...night } : { ...colors, ...light },
    fontRem,
    ...magicFunctions
  },
  StyleSheet
);

export {
  DEVICE_HEIGHT,
  DEVICE_WIDTH
};
