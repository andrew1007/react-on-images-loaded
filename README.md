# OnImagesLoaded

[OnImagesLoaded](https://github.com/andrew1007/react-on-images-loaded) controls how child components and HTML elements render based on images being fully loaded.

## Demo

Live demo: [andrew1007.github.io/react-on-images-loaded](http://andrew1007.github.io/react-on-images-loaded/)

## Installation

The easiest way to use react-on-images-loaded is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-on-images-loaded.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-on-images-loaded --save
```


## Usage

Use `OnImagesLoaded` as a parent container to HTML elements. This package controls rendering based on whether or not all images have been fully loaded.

```jsx
var OnImagesLoaded = require('react-on-images-loaded');

<OnImagesLoaded
  classNameOnMount='hidden-true'
  classNameOnLoaded='hidden-false'
  placeholder={<div>something to render during loading</div>}
  onWillMount={this.runOnComponentWillMount.bind(this)}
  onDidMount={this.runOnComponentDidMount.bind(this)}
  onLoaded={this.runAfterImagesLoaded.bind(this)}
  onTimeout={this.runTimeoutFunction.bind(this)}
  timeout={7000}
  delay={0}
>
  <div>
    child html elements and components with images
  </div>
</OnImagesLoaded>
```

### Properties

| Props | Information|
|---|---|
| classNameOnMount | Initial className to use while images are still loading. default: none|
| classNameOnLoaded | className after images are loaded. default: none |
| onWillMount | Function to run on componentWillMount. default: null |
| onDidMount | Function to run on componentDidMount. default: null |
| onLoaded | Function to run after images are loaded. default: null |
| onTimeout | Function if timeout is reached. default: onLoaded function (if it exists)|
| placeholder | HTML element to render while images are loading. default: null |
| timeout | Time (ms) to wait before resolving component before all images are loaded. default: 7000 |
| delay | Time (ms) to wait before className change and function call when all images are loaded. default: 0 |

### Notes

From the demo, you can see that my main intention was to make a component to control className, for hidden -> visible, to prevent html elements pushing each other during image loading. But much more can be done than just that.

## License

MIT License

Copyright (c) 2017 Andrew Yueh.
