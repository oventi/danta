import {existsSync, mkdirSync, writeFileSync} from 'fs'
import * as commonmark from 'commonmark'
import download from 'image-downloader'
import {render} from 'mustache'
import * as path from 'path'
import {get_strapi_da, get_contentful_da} from './data_accessors'
import _ from 'lodash'

const DIST = `${process.cwd()}/dist`

function build_file(file_path, templates, template_name, data) {
  const content = render(templates[template_name], data, templates)

  make_dir(path.dirname(file_path))
  writeFileSync(file_path, content)
}

const markdown_to_html = markdown => {
  if(is_empty_string(markdown)) return ''

  const reader = new commonmark.Parser()
  const writer = new commonmark.HtmlRenderer()

  return writer.render(reader.parse(markdown))
}

////////////////////////////////////////////////////////////////////////////////

export function make_dir(path) {
  if(existsSync(path)) {
    return false
  }

  mkdirSync(path, {recursive: true})
}

export async function get_toolkit(project_name, templates = []) {
  const DIST = `${__dirname}/../dist/${project_name}`

  return {
    build_file: (file_name, template_name, data) => build_file(
      `${DIST}${file_name}.html`, templates, template_name, data
    ),
    cms: {},
    util: {
      download_image: async (url, path) => await download.image({
        url, dest: `${DIST}${path}`
      }),
      markdown_to_html,
      make_dist_dir: path => make_dir(`${DIST}${path}`)
    }
  }
}

export const builder = {
  templates: [],
  build_file: (file_name, template_name, data) => build_file(
    `${DIST}${file_name}.html`, builder.templates, template_name, data
  )
}

export const da = {
  get_strapi_da,
  get_contentful_da
}

export const util = {
  _,
  download_image: async (url, path) => await download.image({
    url, dest: `${DIST}${path}`
  }),
  make_dir: path => make_dir(`${DIST}${path}`),
  markdown_to_html,
}
