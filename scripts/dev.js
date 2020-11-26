import dotenvJSON from 'dotenv-json'
import {
  existsSync as file_exists,
  writeFileSync as file_write,
  readFileSync as file_read
} from 'fs'
import {execSync as exec} from 'child_process'
import path from 'path'
import {set_env, fetch_data, build_html} from './build'

set_env('dev')

const get_nav = ({pages, extra_nav_links}) => {
  const nav_links = pages.map(({name, title}) => (
    {url: `/${name}.html`, label: title}
  ))

  return extra_nav_links ? [...nav_links, ...extra_nav_links] : nav_links
}

async function build_dev() {
  const data = await fetch_data('dev')
  const nav = get_nav(data)

  console.log(data)

  // building navigation
  console.log(nav)

  /*
  const html = await build_html(data)

  // TODO, support constants in webpack.config.js
  //exec('webpack')

  // TODO run scss
  exec('yarn sass ./client/scss/index.scss dist/index.css')

  const injected_html = html
    .replace('</head>', `
        <link rel="stylesheet" href="/index.css">
      </head>
    `)

  // TODO: minify html
  file_write('./dist/index.html', injected_html)
  */
}

/*
const StaticServer = require('static-server')
const server = new StaticServer({rootPath: './dist', port: 3000, cors: '*', followSymlink: true})

server.on('request',  async (req, res) => await build_dev())
server.start(() => console.log('danta app running on', server.port))
*/

//setInterval(async () => await build_dev(), 1000)

(async () => await build_dev())()