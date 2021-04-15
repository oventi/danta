import express from 'express'
import {existsSync as file_exists} from 'fs'
import {build} from '../build'

const DEV_PORT = 2810
const DEV_BASE_URL = `http://localhost:${DEV_PORT}`

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

  app.listen(DEV_PORT, () => {
    console.log(`${project.name} listening at http://localhost:${DEV_PORT}`)
  })
}
