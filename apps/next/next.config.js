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
    // experiment - reduced bundle size react-native-web
    useReactNativeWebLite: true,
    shouldExtract: (path) => {
      if (path.includes(join('packages', 'app'))) {
        return true
      }
    },

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
      transform: `@tamagui/lucide-icons/dist/esm/icons/{{kebabCase member}}`,
      skipDefaultConversion: true,
    },
  },
  transpilePackages: [
    'expo-constants',
    'expo-linking',
    'expo-modules-core',
    'react-native-web',
    'solito',
  ],
  experimental: {
    // optimizeCss: true,
    scrollRestoration: true,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push(
      {
        test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|wav)$/i,
        type: 'asset/source',
      },
      {
        test: /\.(otf|ttf|eot|woff|woff2)$/i,
        type: 'asset/resource',
      }
    )

    if (process.env.DEBUG) {
      console.debug(`Webpack rules for ${isServer ? 'server' : 'client'}:`, config.module.rules)
    }

    return config
  },
}

for (const plugin of plugins) {
  nextConfig = {
    ...nextConfig,
    ...plugin(nextConfig),
  }
}

module.exports = withExpo(nextConfig)
