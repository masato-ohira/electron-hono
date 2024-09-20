import { Hono } from 'hono'
import { streamText } from 'hono/streaming'

const app = new Hono()

const texts = `Honoのサーバーでサーバー送信イベント（SSE）を送信するとき、
データの形式は自由ですが、
EventSourceが期待するフォーマットに合わせて送信する必要があります。
EventSourceはSSEの仕様に従ってデータを解析するため、
テキストベースで送信する必要があります。
そのため、JSONデータを送信する場合でも、
EventSourceが適切に処理できる形式にする必要があります。`.split('\n')

app.get('/', (c) => {
  const arr: string[] = []
  return streamText(c, async (stream) => {
    for (const text of texts) {
      arr.push(text)
      await stream.write(arr.join('\n'))
      await stream.sleep(1000)
    }
  })
})

export default app
