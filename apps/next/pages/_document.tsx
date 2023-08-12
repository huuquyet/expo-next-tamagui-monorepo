import { Children } from 'react'
import { AppRegistry } from 'react-native'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

import Tamagui from '../tamagui.config'

export async function getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
  AppRegistry.registerComponent('Main', () => Main)
  // @ts-ignore
  const { getStyleElement } = AppRegistry.getApplication('Main')
  const page = await ctx.renderPage()

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

class MyDocument extends Document {
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

MyDocument.getInitialProps = getInitialProps

export default MyDocument
