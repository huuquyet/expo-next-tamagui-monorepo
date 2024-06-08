import { resolve } from 'node:path'
// Learn more https://docs.expo.dev/guides/monorepos
// Learn more https://docs.expo.io/guides/customizing-metro
/** @type {import('expo/metro-config').MetroConfig} */
import { getDefaultConfig } from 'expo/metro-config'

// Find the project and workspace directories
const projectRoot = __dirname
// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
})

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot]
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  resolve(projectRoot, 'node_modules'),
  resolve(workspaceRoot, 'node_modules'),
]
// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true

// Expo 49 issue: default metro config needs to include "mjs"
// https://github.com/expo/expo/issues/23180
config.resolver.sourceExts.push('mjs')

config.transformer = { ...config.transformer, unstable_allowRequireContext: true }
config.transformer.minifierPath = require.resolve('metro-minify-terser')

// add nice web support with optimizing compiler + CSS extraction
import { withTamagui } from '@tamagui/metro-plugin'
export default withTamagui(config, {
  components: ['tamagui'],
  config: '../../packages/ui/src/tamagui.config.ts',
  outputCSS: './tamagui-web.css',
})
