import path from 'path'
import express from 'express'

import {is_empty_string} from '../lib/util'

const PORT = 2810

const get_components = base_dir => {
  delete require.cache[require.resolve(`${base_dir}/theme`)]
  const theme = require(`${base_dir}/theme`)

  delete require.cache[require.resolve(base_dir)]
  const project = require(base_dir)

  return {theme, project}
}

const get_base_url = (argv, params = {}) => {
  if(!is_empty_string(argv.base_url)) {
    return argv.base_url
  }

  if(!is_empty_string(params.base_url)) {
    return data.base_url
  }

  return '/'
}

export const start_dev_server = (argv, base_dir) => {
  const app = express()

  app.use(express.static(`${base_dir}/dist`))

  app.use(
    async (req, res, next) => {
      try {
        const {theme, project} = get_components(base_dir)

        // @TODO check theme and project

        // get specific data from the project
        const project_data = await project.get_data()

        // @TODO validate project data

        // send the request to the theme with the project data
        const {content, status} = await theme.request(req.path, {
          ...project_data, base_url: get_base_url(argv)
        })

        res.status(status || 200).send(content)
      }
      catch(error) { next(error) }
    },

    (error, req, res, next) => {
      console.error(error.message)

      res.status(500).send(`
        <h1>${error.message}</h1>
        <pre>${error.stack}</pre>
      `)
    }
  )

  app.listen(PORT, () => {
    console.log(`listening at localhost:${PORT}`)
  })
}
