const { withExpo } = require('@expo/next-adapter')
const { withTamagui } = require('@tamagui/next-plugin')
const { join } = require('path')

const boolVals = {
  true: true,
  false: false,
}

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development'

const plugins = [
  withTamagui({
    config: './tamagui.config.ts',
    components: ['tamagui', '@my/ui'],
    importsWhitelist: ['constants.js', 'colors.js'],
    outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
    logTimings: true,
    disableExtraction,
    shouldExtract: (path) => {
      if (path.includes(join('packages', 'app'))) {
        return true
      }
    },
    excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker', 'CheckBox', 'Touchable'],
    // adds mini-css-extract and css-minimizer-plugin, can fix issues with unique configurations
    enableCSSOptimizations: false,
    // disable tamagui config to make fonts easier to import
    disableFontSupport: false,
    // set to false if you never call addTheme or updateTheme
    // when combined with outputCSS this saves you 1Kb more bundle size
    doesMutateThemes: false, // default true
  }),
]

/** @type {import('next').NextConfig} */
let nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  modularizeImports: {
    '@tamagui/lucide-icons': {
      transform: '@tamagui/lucide-icons/dist/esm/icons/{{kebabCase member}}',
      skipDefaultConversion: true,
    },
  },
  transpilePackages: ['expo-constants', 'expo-modules-core', 'react-native-web', 'solito'],
  experimental: {
    // optimizeCss: true,
    scrollRestoration: true,
  },
}

for (const plugin of plugins) {
  nextConfig = {
    ...nextConfig,
    ...plugin(nextConfig),
  }
}

module.exports = withExpo(nextConfig)
