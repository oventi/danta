import {get_contentful_da} from './lib/data_access/contentful'
import {get_strapi_da} from './lib/data_access/strapi'
import {get_templates} from './lib/templates'
import mustache from 'mustache'
import {outputFileSync} from 'fs-extra'
import * as util from './lib/util'

const dist = `${process.cwd()}/dist`

function render(template_name, data) {
  const templates = get_templates()
  const template = templates[template_name]

  return mustache.render(template, data, templates)
}

export default {
  get_contentful_da,
  get_strapi_da,

  get_templates,

  render,

  build: (path, template_name, data) => {
    const content = render(template_name, data)
    outputFileSync(`${dist}${path}`, content)
  },

  util
}
