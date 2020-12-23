import download from 'image-downloader'

export async function download_image(url, project_name, path) {
  await download.image({
    url,
    dest: `${__dirname}/../dist/${project_name}${path}`
  })
}
