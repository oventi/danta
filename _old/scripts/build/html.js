/*
 * mustache render recursively
 * @TODO
 * - better error handling and display
 * - make recursion clearer
 * - allow params to specify entry folder
 * - ignore non mustache files
 */

import {readdirSync, lstatSync, readFileSync} from 'fs'
import {render} from 'mustache'

export async function build_html(
  data = {}, views_path = './client/views', entry_key = 'index', templates = {}
) {
  const load_templates = (dir_path) => readdirSync(dir_path).flatMap(file => {
    const file_path = `${dir_path}/${file}`

    if(lstatSync(file_path).isDirectory()) {
      return load_templates(file_path)
    }

    const key = file_path.replace(`${views_path}/`, '').replace('.mustache', '')
    templates[key] = readFileSync(file_path, 'utf-8')
  })
  load_templates(views_path)

  const {[entry_key]: index, ...partials} = templates

  return render(index, data, partials)
}
