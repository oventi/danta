import dotenvJSON from 'dotenv-json'
import {name} from '../../package.json'

export {fetch_data} from './fetch_data'
export {build_html} from './html'

export const set_env = async (stage = 'dev') => {
  await dotenvJSON({
    path: `/var/local/${name}_${stage}.json`
  })
}
