import {readFileSync} from 'fs'
import traverse from 'traverse-folders'

let templates = null
const suffix = '.mustache'

const get_name = (file, path) => file.replace(new RegExp(`${path}/|${suffix}`, 'gi'), '')

export const get_templates = (theme_name) => {
  const path = `${process.cwd()}/node_modules/${theme_name}/templates`

  if(!templates) {
    templates = {}

    traverse(
      path,
      file => templates[get_name(file, path)] = readFileSync(file, 'utf-8'),
      {suffix}
    )
  }

  return templates
}
