import { config } from './tamagui.config'

export type AppConfig = typeof config

declare module 'tamagui' {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  type TamaguiCustomConfig = AppConfig
}

export default config
