import express from 'express'
import {existsSync as file_exists} from 'fs'
import config from '../default_config'
import {build} from '../build'

const app = express()

// calculate time between requests
let last_request_ts = 0
const get_ts_diff = () => {
  const request_ts = Date.now()
  const ts_diff = request_ts - last_request_ts
  last_request_ts = request_ts

  return ts_diff
}

export function start_server(project, builder) {
  const BASE_URL = process.env.BASE_URL || config.BASE_URL
  const [protocol, host, port] = BASE_URL.split(':')
  const PORT = parseInt(port, 10) || 2810

  app.use(
    async (req, res, next) => {
      // only build if at least 1 second has passed between requests
      if(get_ts_diff() >= 1000) {
        await build(project, builder)
      }

      // map pretty urls to their corresponding static files
      if(file_exists(`./dist/${project.name}${req.url}.html`)) {
        req.url = `${req.url}.html`
      }

      next()
    },

    express.static(`./dist/${project.name}`, {
      dotfiles: 'ignore',
      etag: false,
      extensions: ['htm', 'html'],
      maxAge: '1h',
      redirect: false
    })
  )

  app.listen(PORT, () => {
    console.log(`${project.name} listening at ${protocol}:${host}:${PORT}`)
  })
}
