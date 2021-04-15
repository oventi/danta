# danta's how-to

- run `yarn link` in `./lib`
- add symblinks in builders and projects
- run `yarn link danta` in each builder and project

### builders
- Must go in the `builders` folder (symlink recommended)
- Must have an `index.js` that exports `async function build(project_name, templates, data)`
- Must have a `templates` folder with at least one mustache file
- Must have a `schema.json` file to validate data from the project
- Can have a folder `scss` for css, but if it does, it must have `scss/index.scss` as entry point

### projects
- Must go in the `projects` folder (symlink recommended)
- Must have an `index.js` that exports `async function get_data(stage)`
- Can have a folder `scss` for custom css, but if it does, it must have `scss/index.scss` as entry point
