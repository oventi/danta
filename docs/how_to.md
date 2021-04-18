# danta's how-to

## First steps
- Run `yarn` to install dependencies
- Go to `./lib`
- Run `yarn` to install lib dependencies, then run `yarn link`
- Add builders and projects in their respective folders (read further down)
- Run `yarn link danta` in each builder and project

## For builders
- Must go in the `builders` folder (symlink recommended)
- Must have an `index.js` that exports `async function build(project_name, templates, data)`
- Must have a `templates` folder with at least one mustache file
- Must have a `schema.json` file to validate data from the project
- Can have a folder `scss` for css, but if it does, it must have `scss/index.scss` as entry point

## For projects
- Config values on must go on `/var/local/[project_name]_[stage].json` and will be available via `process.env`
- Must go in the `projects` folder (symlink recommended)
- Must have an `index.js` that exports `async function get_data(stage)`
- Can have a folder `scss` for custom css, but if it does, it must have `scss/index.scss` as entry point

## To run
- For **dev** mode, run `yarn dev [project_name] [builder_name]`
- For **build** mode (production) run `yarn build [project_name] [builder_name]`
