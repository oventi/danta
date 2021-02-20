import {readdirSync, lstatSync, readFileSync} from 'fs'

const templates = {}
const load_templates = (dir_path, templates_path) => readdirSync(dir_path).flatMap(file => {
  const file_path = `${dir_path}/${file}`

  if(lstatSync(file_path).isDirectory()) {
    return load_templates(file_path, templates_path)
  }

  const key = file_path.replace(`${templates_path}/`, '').replace('.mustache', '')
  templates[key] = readFileSync(file_path, 'utf-8')
})

export const get_templates = (templates_path) => {
  load_templates(templates_path, templates_path)

  return templates
}
