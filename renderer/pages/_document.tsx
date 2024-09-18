import Document, {
  type DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

import { GoogleFonts } from '@c/layouts/GoogleFonts'
import { Header } from '@c/layouts/Header'
import { SideNav } from '@c/layouts/side/SideNav'

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
          scrollbar-thumb-primary
          scrollbar-track-gray-200
          scrollbar-thin
        `}
      >
        <Head>
          <GoogleFonts />
        </Head>
        <body>
          <div
            className={`
              relative
              pl-64
            `}
          >
            <SideNav />
            <div className={'flex-1 pt-14'}>
              <Header />
              <main
                className={`
                  p-8
                `}
              >
                <Main />
              </main>
            </div>
          </div>
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default MyDocument
