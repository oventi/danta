import {existsSync, mkdirSync, writeFileSync} from 'fs'
import * as commonmark from 'commonmark'
import download from 'image-downloader'
import {render} from 'mustache'
import * as path from 'path'
import Strapi from 'strapi-sdk-javascript'

async function get_strapi(url, username, password) {
  const strapi = new Strapi(url)
  // TODO: make the login work
  //await strapi.login(username, password)

  return strapi
}

function markdown_to_html(markdown) {
  const reader = new commonmark.Parser()
  const writer = new commonmark.HtmlRenderer()

  return writer.render(reader.parse(markdown))
}

function build_file(file_path, templates, template_name, data) {
  const content = render(templates[template_name], data, templates)

  make_dir(path.dirname(file_path))
  writeFileSync(file_path, content)
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
    cms: {get_strapi},
    util: {
      download_image: async (url, path) => await download.image({
        url, dest: `${DIST}${path}`
      }),
      markdown_to_html,
      make_dist_dir: path => make_dir(`${DIST}${path}`)
    }
  }
}
