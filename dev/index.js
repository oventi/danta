import {readFileSync} from 'fs'
import path from 'path'
import express from 'express'
import mustache from 'mustache'
import nocache from 'nocache'
import {watch} from '../lib/parcel'
import {divider, get_base_url} from '../lib/util'
import {get_components} from '../lib/components'
import {validate_data} from '../lib/validation'
import {errors} from '../errors'

const parcel_errors = []
const stack = []
const error_template = readFileSync(
  `${__dirname}/../errors/template.mustache`,
  'utf-8'
)

export const start_dev_server = async (argv, base_dir) => {
  if(!argv.theme) {
    throw errors.THEME
  }

  const port = argv.port || 2810
  const base_url = `http://localhost:${port}`
  const app = express()

  app.use(nocache())

  app.use(express.static(`${base_dir}/dist`, {cacheControl: false}))

  app.use(
    async (req, res, next) => {
      stack.length = 0

      try {
        console.log([divider, `Request ${req.path}`].join('\n'))
        if(parcel_errors.length > 0) {
          const new_error = new Error(parcel_errors.join('\n'))
          new_error.name = errors.PARCEL

          throw new_error
        }

        const {theme, project} = get_components(base_dir, argv.theme)

        // @TODO check theme and project

        // get specific data from the project
        stack.push('project.get_data')
        const project_data = await project.get_data('dev')

        validate_data(project_data, theme.get_schema())

        // send the request to the theme with the project data
        stack.push('theme.request')
        const {content, status} = await theme.request(req.path, {
          ...project_data,
          base_url: get_base_url(argv, {base_url})
        })

        console.log([`Response ${status || 200}`, divider].join('\n'))
        res.status(status || 200).send(content)
      } catch(error) {
        next(error)
      }
    },

    (error, req, res, next) => {
      const {name, message} = error
      console.log([`${name}: ${message}`, divider].join('\n'))

      res
        .status(500)
        .send(mustache.render(error_template, {name, message, stack}))
    }
  )

  watch((error) => {
    if(error === null) {
      return (parcel_errors.length = 0)
    }
    parcel_errors.push(error.toString())
  })

  await app.listen(port)
  console.log(`- dev server started at ${base_url}`)
}
