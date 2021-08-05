import * as commonmark from 'commonmark'
import path from 'path'
import Downloader from 'nodejs-file-downloader'

export const is_empty_string = string => (
  typeof string === 'undefined' || string === null || string.trim() === ''
)

export const markdown_to_html = markdown => {
  if(is_empty_string(markdown)) return ''

  const reader = new commonmark.Parser()
  const writer = new commonmark.HtmlRenderer()

  return writer.render(reader.parse(markdown))
}

export const download = async (url, destination) => {
  const filepath = `${process.cwd()}/dist${destination}`
  const directory = path.dirname(filepath)
  const fileName = path.basename(filepath)

  const downloader = new Downloader({url, directory, fileName})

  return downloader.download()
}

export const is_object = (o) => Object.prototype.toString.call(o) === '[object Object]'
