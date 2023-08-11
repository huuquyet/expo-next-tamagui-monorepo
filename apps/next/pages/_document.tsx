import { Children } from 'react'
import { AppRegistry } from 'react-native'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

import Tamagui from '../tamagui.config'

export async function getInitialProps({ renderPage }: any ) {
  AppRegistry.registerComponent('Main', () => Main)
  // @ts-ignore
  const { getStyleElement } = AppRegistry.getApplication('Main')
  const page = await renderPage()

  /**
   * Note: be sure to keep tamagui styles after react-native-web styles like it is here!
   * So Tamagui styles can override the react-native-web styles.
   */
  const styles = [
    getStyleElement(),
    <style
      key="tamagui-css"
      dangerouslySetInnerHTML={{
        __html: Tamagui.getCSS({
          exclude: process.env.NODE_ENV === 'development' ? null : 'design-system',
        }),
      }}
    />,
  ]

  return { ...page, styles: Children.toArray(styles) }
}

export class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

Document.getInitialProps = getInitialProps

export default Document
