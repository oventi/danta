import {writeFileSync as file_write} from 'fs'
import {render} from 'mustache'
import {get_templates} from './templates'

const [,, builder_name, ...params] = process.argv
const builder = require(`../builders/${builder_name}`)

// TODO: support scss

;(async () => {
  // get all templates, one per content type in the data
  const templates = get_templates(`./builders/${builder_name}/templates`)

  // get data from the cms
  const data = await builder.get_data()

  // get file related data
  const file_data = await builder.get_file_data(data)

  // build html
  for(const {name, template_name, data: template_data} of file_data) {
    const {[template_name]: template, ...partials} = templates
    const html = render(template, {...template_data, common: data}, partials)

    // TODO: minify html
    file_write(`./dist/${name}.html`, html)
  }

  const StaticServer = require('static-server')
  const server = new StaticServer({rootPath: './dist', port: 3000, cors: '*', followSymlink: true})
  //server.on('request',  async (req, res) => await build_dev())
  server.start(() => console.log('danta app running on', server.port))
})()
