import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'
import { createTamagui } from 'tamagui'

import { animations } from './animations'
import fonts from './fonts'
import { media } from './mediaQueries'

export const config = createTamagui({
  defaultFont: 'body',
  defaultTheme: 'dark',
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: false,
  shorthands,
  fonts,
  themes,
  tokens,
  media,
})
