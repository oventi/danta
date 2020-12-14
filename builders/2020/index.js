import {render} from 'mustache'
import {
  existsSync as file_exists,
  mkdirSync as make_dir,
  writeFileSync as file_write
} from 'fs'

export async function build(project_name, templates, data) {
  const dist = `./dist/${project_name}`
  const {pages, ...rest} = data

  if(!file_exists(dist)) {
    make_dir(dist)
  }

  const html = render(templates['index'], {global: data}, templates)
  file_write(`./dist/${project_name}/index.html`, html)

  for(const page of pages) {
    const {[page.template]: template, ...partials} = templates
    const html = render(template, {...page, global: rest}, partials)

    file_write(`./dist/${project_name}/${page.name}.html`, html)
  }
}
