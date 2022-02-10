import {is_empty_string} from '../lib/util'
import {get_components} from '../lib/components'
import {validate_data} from '../lib/validation'
import {errors} from '../errors'

const get_base_url = (argv, params = {}) => {
  if(!is_empty_string(argv.base_url)) {
    return argv.base_url
  }

  if(!is_empty_string(params.base_url)) {
    return data.base_url
  }

  return ''
}

export async function build_project(argv, base_dir) {
  process.stdout.write('- building static html files...')

  const {theme, project} = get_components(base_dir, argv.theme)

  const project_data = await project.get_data('build')

  validate_data(project_data, theme.get_schema())

  return theme.build({...project_data, base_url: get_base_url(argv)})
}
