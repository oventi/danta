import Strapi from 'strapi-sdk-javascript'
import {
  readFileSync as file_read,
  existsSync as file_exists,
  mkdirSync as make_dir
} from 'fs'
import {download_image} from '../../lib/assets'

export function get_config() {
  return {}
}

async function expand_pages(page) {
  const strapi = new Strapi('http://localhost:1337')
  page.has_children = page.pages && page.pages.length > 0
  page.content += '\n\n' + (page.raw_content || '')

  for(const [index, page_id] of page.pages.entries()) {
    const full_page = await strapi.getEntry('pages', page_id)
    page.pages[index] = await expand_pages(full_page)
  }

  return page
}

export async function get_data(stage) {
  const strapi = new Strapi('http://localhost:1337')

  // download files for reference
  const uploads_path = `${__dirname}/../../dist/migrantsaotearoa/uploads`
  if(!file_exists(uploads_path)) {
    make_dir(uploads_path)
  }

  for(const file of await strapi.getFiles()) {
    await download_image(
      `http://localhost:1337${file.url}`, 'migrantsaotearoa', file.url
    )
  }

  const data = await strapi.getEntries('ma-main')
  // TODO
  // traverse page tree, combine all markdown content and raw_content
  // into single html content
  for(let page of data.pages) {
    page = await expand_pages(page)
  }

  let str_data = JSON.stringify(data)
  str_data = str_data.replace(/"alternativeText"/g, '"alt"')

  return JSON.parse(str_data)
}
