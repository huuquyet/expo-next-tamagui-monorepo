import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import { StyleSheet } from 'react-native'

import Tamagui from '../tamagui.config'

export default class Document extends NextDocument {
  static async getInitialProps({ renderPage }: any) {
    const page = await renderPage()

    // @ts-ignore RN doesn't have this type
    const rnwStyle = StyleSheet.getSheet()

    return {
      ...page,
      styles: (
        <>
          <style id={rnwStyle.id} dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }} />
          <style
            dangerouslySetInnerHTML={{
              __html: Tamagui.getCSS({
                // if you are using "outputCSS" option, you should use this "exclude"
                // if not, then you can leave the option out
                exclude: process.env.NODE_ENV === 'production' ? 'design-system' : null,
              }),
            }}
          />
        </>
      ),
    }
  }

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
