// Don't forget to specify your TAMAGUI_TARGET here or ideally in the command to run / .env files
process.env.TAMAGUI_TARGET = 'native'

module.exports = function (api) {
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
      '@babel/plugin-proposal-export-namespace-from',
      // NOTE: this is only necessary if you are using reanimated for animations
      'react-native-reanimated/plugin',
      ...(process.env.EAS_BUILD_PLATFORM === 'android'
        ? []
        : [
            [
              '@tamagui/babel-plugin',
              {
                components: ['@my/ui', 'tamagui'],
                config: './tamagui.config.ts',
                logTimings: true,
                exclude: /node_modules/,
              },
            ],
          ]),
      // NOTE: this is required to pass the right environment
      [
        'transform-inline-environment-variables',
        // NOTE: include is optional, you can leave this part out
        {
          include: ['TAMAGUI_TARGET', 'EXPO_ROUTER_APP_ROOT'],
        },
      ],
    ],
  }
}
