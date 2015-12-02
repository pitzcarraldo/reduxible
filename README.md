# Reduxible

[![Build Status](https://travis-ci.org/Pitzcarraldo/reduxible.svg)](https://travis-ci.org/Pitzcarraldo/reduxible)
[![npm version](https://img.shields.io/npm/v/reduxible.svg?style=flat-square)](https://www.npmjs.com/package/reduxible)
[![npm downloads](https://img.shields.io/npm/dm/reduxible.svg?style=flat-square)](https://www.npmjs.com/package/reduxible)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/Pitzcarraldo/reduxible)

Universal (Isomorphic) Hot-Loadable and Pluggable Framework for [React](https://facebook.github.io/react/) and [Redux](http://rackt.github.io/redux) applications.
Reduxible can make it easy to get started to build React and Redux based Web Application and make it able to focus to business code.
Reduxible is based on [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example) and inspired by [Fluxible](https://github.com/yahoo/fluxible).

### Why Reduxible?

React, Redux and other related things are already good enough to use directly. But some people (like me) only want to focus to application codes and don't want to spend time for make and sustain project base. So I wrapped base elements for React + Redux Application. If you use Reduxible, you only have to make and set Router, Middleware, Reducers and React Components to Reduxible. When then, you can run React + Redux App immediately. Also, it can be Universal App or Single Page App by config.

### Installation

```bash
$ npm install --save reduxible
```

### Dependencies

Reduxible has peer dependencies like below. So you can use Reduxible with these modules with these versions or after. And Reduxible only support [express](https://github.com/strongloop/express/) for server-side for now.

```json
  "peerDependencies": {
      "history": "^1.13.1",
      "react": "^0.14.3",
      "react-dom": "^0.14.3",
      "react-redux": "^4.0.0",
      "react-router": "^1.0.0",
      "redux": "^3.0.4",
      "redux-devtools": "^3.0.0-beta-3",
      "redux-devtools-dock-monitor": "^1.0.0-beta-3",
      "redux-devtools-log-monitor": "^1.0.0-beta-3",
      "redux-simple-router": "0.0.8"
    }
```

### Usage

  * You can see the example to know how to use Reduxible in [here](https://github.com/Pitzcarraldo/reduxible-example).

### Browser Compatibility

![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) |
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 8+ ✔ |

### License

This software is free to use under the Minkyu Cho. MIT license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/Pitzcarraldo/reduxible/blob/master/LICENSE

### Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request :D
