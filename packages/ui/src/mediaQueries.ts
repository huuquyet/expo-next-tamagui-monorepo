import {createMedia} from '@tamagui/react-native-media-driver';

export const media = createMedia({
    // for site
    xxs: {maxWidth: 390},
    xs: {maxWidth: 660},
    sm: {maxWidth: 800},
    md: {maxWidth: 1020},
    lg: {maxWidth: 1280},
    xl: {maxWidth: 1420},
    xxl: {maxWidth: 1600},
    gtXs: {minWidth: 660 + 1},
    gtSm: {minWidth: 800 + 1},
    gtMd: {minWidth: 1020 + 1},
    gtLg: {minWidth: 1280 + 1},
    gtXl: {minWidth: 1600 + 1},
    short: {maxHeight: 820},
    tall: {minHeight: 820},
    hoverNone: {hover: 'none'},
    pointerCoarse: {pointer: 'coarse'},
  });
  
  // note all the non "gt" ones should be true to start to match mobile-first
  // were aiming for "xs" to be the default to "gtXs" true too
  export const mediaQueryDefaultActive = {
    xl: true,
    lg: true,
    md: true,
    sm: true,
    xs: true,
    // false
    xxs: false,
  };
