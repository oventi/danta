import path from 'path'
import express from 'express'

import {get_base_url} from '../lib/util'

const get_components = base_dir => {
  delete require.cache[require.resolve(`${base_dir}/theme`)]
  const theme = require(`${base_dir}/theme`)

  delete require.cache[require.resolve(base_dir)]
  const project = require(base_dir)

  return {theme, project}
}

export const start_dev_server = (argv, base_dir) => {
  const port = argv.port || 2810
  const base_url = `http://localhost:${port}`
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
          ...project_data, base_url: get_base_url(argv, {base_url})
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

  app.listen(port, () => {
    console.log(`listening at ${base_url}`)
  })
}
