# OnImagesLoaded

[![Build Status](https://travis-ci.org/andrew1007/react-on-images-loaded.svg?branch=master)](https://travis-ci.org/andrew1007/react-on-images-loaded)

[OnImagesLoaded](https://github.com/andrew1007/react-on-images-loaded) gives you the event listener you've always wanted: onLoad after all images are completely loaded. For html elements wrapped inside OnImagesLoaded.

## Demo

Live demo: [andrew1007.github.io/react-on-images-loaded](http://andrew1007.github.io/react-on-images-loaded/)

## Installation

The easiest way to use react-on-images-loaded is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-on-images-loaded.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-on-images-loaded --save
```


## Usage

Use `OnImagesLoaded` as a parent container to HTML elements. A function call is triggered after all images are fully loaded.

```jsx
var OnImagesLoaded = require('react-on-images-loaded');

<OnImagesLoaded
  onLoaded={this.runAfterImagesLoaded.bind(this)}
  onTimeout={this.runTimeoutFunction.bind(this)}
  timeout={7000}
>
  <div>
    child html elements and components with images
  </div>
</OnImagesLoaded>
```

### Properties

| Props | Information|
|---|---|
| onLoaded | Function to run after images are loaded. |
| onTimeout | Function if timeout is reached. default: onLoaded function. |
| timeout | Time (ms) to wait before resolving component before all images are loaded. default: 7000 |

### Redux users, please read
Rdux will load your default state if your action request is too slow. Your default state does not have your images. In one way or another, ensure all <code>img</code> elements are mounted when using <code>OnImagesLoaded</code>

### Notes
Big changes, going into v2.x.x. All you get (and all you need) is the <code>onLoaded</code> and <code>onTimeout</code> function. All depreciated props will never be removed.

v1.x.x was bloated. It gives too many options for such a basic concept. Every depreciated prop can be handled with <code>this.setState</code> or is complete uneccesary . The following are depreciated from v1.x.x:

| Depreciated props | Information|
|---|---|
| classNameOnMount | Initial className to use while images are still loading. default: none|
| classNameOnLoaded | className after images are loaded. default: none |
| onWillMount | Function to run on componentWillMount. default: null |
| onDidMount | Function to run on componentDidMount. default: null |
| placeholder | HTML element to render while images are loading. default: null |
| delay | Time (ms) to wait before className change and function call when all images are loaded. default: 0 |

From the demo, you can see that my main intention was to make a component to control className, for hidden -> visible, to prevent html elements pushing each other during image loading. But much more can be done than just that.

## License

MIT License

Copyright (c) 2017 Andrew Yueh.
