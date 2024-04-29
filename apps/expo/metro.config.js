// Learn more https://docs.expo.dev/guides/monorepos
// Learn more https://docs.expo.io/guides/customizing-metro
/** @type {import('expo/metro-config').MetroConfig} */
const { getDefaultConfig } = require('expo/metro-config')
const path = require('node:path')

// Find the project and workspace directories
const projectRoot = __dirname
// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
})

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot]
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]

// Expo 49 issue: default metro config needs to include "mjs"
// https://github.com/expo/expo/issues/23180
config.resolver.sourceExts.push('mjs')

config.transformer = { ...config.transformer, unstable_allowRequireContext: true }
config.transformer.minifierPath = require.resolve('metro-minify-terser')

// add nice web support with optimizing compiler + CSS extraction
const { withTamagui } = require('@tamagui/metro-plugin')
module.exports = withTamagui(config, {
  components: ['tamagui'],
  config: '../../packages/ui/src/tamagui.config.ts',
  outputCSS: './tamagui-web.css',
})
