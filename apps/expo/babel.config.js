// Don't forget to specify your TAMAGUI_TARGET here or ideally in the command to run / .env files
process.env.TAMAGUI_TARGET = 'native'

module.exports = (api) => {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      require.resolve('expo-router/babel'),
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['../..'],
          alias: {
            // define aliases to shorten the import paths
            app: '../../packages/app',
            '@my/ui': '../../packages/ui',
          },
          extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js'],
        },
      ],
      // NOTE: this is only necessary if you are using reanimated for animations
      'react-native-reanimated/plugin',
      ...(process.env.EAS_BUILD_PLATFORM === 'android'
        ? []
        : [
            [
              '@tamagui/babel-plugin',
              {
                components: ['@my/ui', 'tamagui'],
                config: '../../packages/ui/src/tamagui.config.ts',
              },
            ],
          ]),
      'transform-inline-environment-variables',
    ],
  }
}
