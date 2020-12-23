import {render} from 'mustache'
import {markdown_to_html} from '../../lib/markdown'
import {get_file_builder} from '../../lib/builder/files'

export async function build(project_name, templates, raw_data) {
  const {build_file} = get_file_builder(project_name, templates)

  if(!raw_data.pages || raw_data.pages.length === 0) {
    throw new Error('Pages are required')
  }

  const data = {
    ...raw_data, pages: raw_data.pages.map(page => ({
      ...page, content: markdown_to_html(page.content)
    }))
  }
  const {pages, ...rest} = data

  // build home
  build_file('index', 'page', {...pages[0], global: data})

  // build rest of the pages
  for(const page of pages) {
    build_file(page.name, 'page', {...page, global: rest})
  }

  /*
  build_file('index', 'index', {global: data})

  //const html = render(templates['index'], {global: data}, templates)
  //file_write(`./dist/${project_name}/index.html`, html)

  for(const page of pages) {
    //const {[page.template]: template, ...partials} = templates
    //const html = render(template, {...page, global: rest}, partials)
    //file_write(`./dist/${project_name}/${page.name}.html`, html)

    const {name, template} = page
    build_file(name, template, {...page, global: rest})
  }
  */
}
