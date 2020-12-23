import * as commonmark from 'commonmark'

export function markdown_to_html(markdown) {
  const reader = new commonmark.Parser()
  const writer = new commonmark.HtmlRenderer()

  return writer.render(reader.parse(markdown))
}
