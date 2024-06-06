/** @type {import('next').NextConfig} */
const { withTamagui } = require('@tamagui/next-plugin')
const { withExpo } = require('@expo/next-adapter')
const { join } = require('node:path')
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

const boolVals = {
  true: true,
  false: false,
}

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development'

const plugins = [
  withTamagui({
    config: '../../packages/ui/src/tamagui.config.ts',
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
  }),
  withPWA,
  withExpo,
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
  reactStrictMode: true,
}

for (const plugin of plugins) {
  nextConfig = {
    ...nextConfig,
    ...plugin(nextConfig),
  }
}

module.exports = nextConfig
