# guide

a danta project is essentially a node.js project with specific functions
and configuration so it can build static web assets (websites, web apps, etc).

## file structure

```
.
├── assets                  # images and other files, overrides theme/assets
├── css                     # sass files
│   └── index.scss          # default sass file, should use theme/css/index
├── env.json                # optional env file
├── index.js                # main file, imports danta, has function get_data
├── js                      # browser js files
│   └── index.js            # default browser js file
├── package.json            # package file
├── README.md               # optional readme file
├── theme                   # theme's root folder
│   ├── assets              # theme's images and other files
│   │   └── favicon.png     # default favicon
│   ├── css                 # theme's sass files
│   │   └── index.scss      # default theme's sass file
│   ├── index.js            # theme's main file, imports danta, has functions request and build
│   ├── js                  # theme's js files
│   │   └── index.js        # theme's default browser js file
│   ├── schema.json         # theme's json schema to validate data
│   └── templates           # theme's mustache files
└── yarn.lock               # yarn lockfile
```

## modes

two modes are supported: dev and build. dev uses an express js simple server to
serve routes. build uses other functions to create html files.

### dev
when starting to work on a danta project, run `yarn dev`, then load the project at `http://localhost:2810`. `parcel watch` is started in the background, and everytime a page is requested:

- `get_data('dev')` @ `./index.js` is called
 - the function can use any way to fetch or load data
 - the function must return a js object
- `request` @ `./theme/index.js` is called
  - the requested path and data from `get_data` is sent
  - content is built and sent with an http status
- the content is rendered in the browser

- build is used for production mode

### build
TBD

__for naming__
https://animalcorner.org/animals/tapir/
