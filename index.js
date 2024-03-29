import {get_contentful_da} from './lib/data_access/contentful'
import {get_strapi_da} from './lib/data_access/strapi'
import {get_templates} from './lib/templates'
import mustache from 'mustache'
import {outputFileSync} from 'fs-extra'
import * as util from './lib/util'
import got from 'got'
import path from 'path'

const dist = `${process.cwd()}/dist`
let theme_name = null

function render(template_name, data) {
  const templates = get_templates(theme_name)
  const template = templates[template_name]

  return mustache.render(template, data, templates)
}

export default {
  get_contentful_da,
  get_strapi_da,
  get_http_da: () => got,

  set_theme: (name) => (theme_name = name),

  get_templates,

  render,

  build: (filepath, template_name, data) => {
    const content = render(template_name, data)
    outputFileSync(path.join(dist, filepath), content)
  },

  util
}
