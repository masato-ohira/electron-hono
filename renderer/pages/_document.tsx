import Document, {
  type DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

import { GoogleFonts } from '@c/layouts/GoogleFonts'

// class Document extends NextDocument {
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html
        lang={'ja'}
        className={`
          overflow-hidden
        `}
      >
        <Head>
          <GoogleFonts />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default MyDocument
