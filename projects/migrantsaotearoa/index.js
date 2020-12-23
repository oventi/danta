import Strapi from 'strapi-sdk-javascript'
import {
  readFileSync as file_read,
  existsSync as file_exists,
  mkdirSync as make_dir
} from 'fs'
import {download_image} from '../../lib/assets'

export function get_config() {
  return {
    builder: '2020'
  }
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
  for(const page of data.pages) {
    if(page.pages.length > 0) {
      page.has_children = true
      for(const [index, page_id] of page.pages.entries()) {
        page.pages[index] = await strapi.getEntry('pages', page_id)
      }
    }
  }

  return data
}
