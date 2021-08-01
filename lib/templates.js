import {readFileSync} from 'fs'
import traverse from 'traverse-folders'

let templates = null
const [path, suffix] = [`${process.cwd()}/theme/templates`, '.mustache']

const get_name = file => file.replace(new RegExp(`${path}/|${suffix}`, 'gi'), '')

export const get_templates = () => {
  if(!templates) {
    templates = {}

    traverse(
      path,
      file => templates[get_name(file)] = readFileSync(file, 'utf-8'),
      {suffix}
    )
  }

  return templates
}
