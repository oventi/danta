import express from 'express'
import {existsSync as file_exists} from 'fs'

import {make_dir} from './'
import {build} from './builder/build'

const [,, project_name, builder_name, ...params] = process.argv

const project = require(`../projects/${project_name}`)
project.name = project_name
project.path = `./projects/${project_name}`

const builder = require(`../builders/${builder_name}`)
builder.name = builder_name
builder.path = `./builders/${builder_name}`

const DEV_PORT = 2810
const DEV_BASE_URL = `http://localhost:${DEV_PORT}`
const DIST_PATH = `./dist/${project_name}`

let last_request_ts = 0

;(async () => {
  const app = express()

  make_dir(DIST_PATH)

  app.use(
    async (req, res, next) => {
      const request_ts = Date.now()
      const ts_diff = request_ts - last_request_ts
      last_request_ts = request_ts

      if(ts_diff > 1000) {
        console.log('building...')
        await build(project, builder)
      }

      if(file_exists(`./dist/${project_name}${req.url}.html`)) {
        req.url = `${req.url}.html`
      }

      next()
    },

    express.static(`./dist/${project_name}`, {
      dotfiles: 'ignore',
      etag: false,
      extensions: ['htm', 'html'],
      maxAge: '1d',
      redirect: false
    })
  )

  app.listen(DEV_PORT, () => {
    console.log(`${project_name} listening at http://localhost:${DEV_PORT}`)
  })
})()
