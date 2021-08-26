# guide

this guide covers full use of danta.

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

## theme
a theme is a combination of files, sass, javascript and mustache tempates
to build static web projects. it has two special functions: request and build.

request is used for development mode
build is used for production mode
