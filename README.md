# Dawn

Dawn is a starting point for web projects.

*Taken inspiration from [Apertif](https://github.com/florianbouvot/aperitif)*

* Sass support
* Compile Pug templates
* Minify and concatenate CSS, JS and images
* Server with live-reloading and cross-device synchronization

Relies on [inuitcss](https://github.com/inuitcss/inuitcss)

## Getting Started

*Prerequisites : [Node.js](https://nodejs.org/) and [Gulp](http://gulpjs.com/)*

### 1. Download or clone this repository

### 2. Install dependencies

```
$ npm install
```

### 3. Run gulp

Serve, watch for changes and automatically refresh across devices.

```
$ gulp dev
```

Build current project, ready for test or deployment.

```
$ gulp build
```

#### Others commands

* `gulp css`: Sass, Autoprefixer, CSSnano
* `gulp js`: Concat and Uglify
* `gulp html`: Compile Pug templates
* `gulp images`: Compression with imagemin
* `gulp fonts`: Copy fonts files
* `gulp clean`: Delete `dist` folder
* `gulp serve`: BrowserSync server
* `gulp watch`: Watch source files

## License

MIT © [Jamie Lovelace](https://github.com/jamielovelace)
