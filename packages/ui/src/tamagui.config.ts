import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes/v3'
import { createTamagui } from 'tamagui'
import { animations } from './animations'
import { fonts } from './fonts'
import { media } from './mediaQueries'

export const config = createTamagui({
  defaultFont: 'body',
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  onlyAllowShorthands: true,
  shorthands,
  fonts,
  themes,
  tokens,
  media,
  settings: {
    allowedStyleValues: 'somewhat-strict',
  },
})

// for the compiler to find it
export default config
