import express from 'express'
import {existsSync as file_exists} from 'fs'

export async function start_server(project_name, port) {
  const app = express()

  app.use(
    (req, res, next) => {
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

  app.listen(port, () => {
    console.log(`${project_name} listening at http://localhost:${port}`)
  })
}
