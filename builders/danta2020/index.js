import {markdown_to_html} from '../../lib/markdown'
import {get_file_builder} from '../../lib/builder/files'

export async function build(project_name, templates, raw_data) {
  const {build_file} = get_file_builder(project_name, templates)
  const build_page = (page, global) => {
    build_file(page.name, 'page', {...page, global})

    if(page.pages && page.pages.length > 0) {
      for(const child_page of page.pages) {
        build_page(child_page, global)
      }
    }
  }

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
  for(const page of pages.slice(1)) {
    build_page(page, rest)
  }
}
