import * as path from 'path'
import {render} from 'mustache'
import {writeFileSync as file_write} from 'fs'
import {make_dir} from '../'

export const get_file_builder = (project_name, templates, extension = 'html') => ({
  build_file: (file_name, template_name, data) => {
    const file_path = `./dist/${project_name}/${file_name}.${extension}`
    const content = render(templates[template_name], data, templates)

    make_dir(path.dirname(file_path))
    file_write(file_path, content)
  }
})
