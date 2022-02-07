export const get_components = (base_dir, theme_name) => {
  const theme_path = `${base_dir}/node_modules/${theme_name}`

  delete require.cache[require.resolve(theme_path)]
  const theme = require(theme_path)

  delete require.cache[require.resolve(base_dir)]
  const project = require(base_dir)

  return {theme, project}
}
