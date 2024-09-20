export const streamDecode = (value: Uint8Array) => {
  const decoder = new TextDecoder()
  const lines = decoder.decode(value)
  const chunks = lines
    .split('data: ') // 各行は data: というキーワードで始まる
    .map((line) => line.trim())
    .filter((s) => s) // 余計な空行を取り除く

  return chunks
}
