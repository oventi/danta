import {readFileSync as file_read} from 'fs'

export async function get_data(stage) {
  const json_data = await file_read(__dirname + '/data.json', 'utf-8')

  return JSON.parse(json_data)
}
