// don't import from here, that's handled already
// instead this is just setting types for this folder

import { config } from '@my/config'

export type AppConfig = typeof config

declare module '@my/ui' {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig {}
}
