import {get_contentful_da} from './lib/data_access/contentful'
import {get_strapi_da} from './lib/data_access/strapi'
import {get_templates} from './lib/templates'
import mustache from 'mustache'
import * as util from './lib/util'

export default {
  get_contentful_da,
  get_strapi_da,

  get_templates,

  render: (template_name, data) => {
    const templates = get_templates()
    const template = templates[template_name]

    return mustache.render(template, data, templates)
  },

  util
}
