import {existsSync, mkdirSync} from 'fs'

export function make_dir(path) {
  if(existsSync(path)) {
    return false
  }

  mkdirSync(path, {recursive: true})
}
