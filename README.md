# OnImagesLoaded

[![Build Status](https://travis-ci.org/andrew1007/react-on-images-loaded.svg?branch=master)](https://travis-ci.org/andrew1007/react-on-images-loaded)

[OnImagesLoaded](https://github.com/andrew1007/react-on-images-loaded) Control an action after every image is fully loaded, for HTML elements wrapped inside <code>OnImagesLoaded</code>.

## Demo

Live demo: [andrew1007.github.io/react-on-images-loaded](http://andrew1007.github.io/react-on-images-loaded/)

## Installation

```
npm install react-on-images-loaded --save
```

## Usage

Use `OnImagesLoaded` as a parent container to HTML elements. The function call is triggered after all images are fully loaded.

```jsx
var OnImagesLoaded = require('react-on-images-loaded');

<OnImagesLoaded
  onLoaded={this.runAfterImagesLoaded.bind(this)}
  onTimeout={this.runTimeoutFunction.bind(this)}
  timeout={7000}
>
  {'child HTML elements and components with images'}
</OnImagesLoaded>
```

### Controlling images in a ternary (important!)
OnImagesLoaded uses `getElementsByTagName`. It can't find images that are not loaded in the DOM. Controlling it with a ternary will not work for components that are completely unmounted! Use inline styles or `className` CSS to toggle visual hiding instead.
```jsx
var OnImagesLoaded = require('react-on-images-loaded');
// bad
render() {
  return (
    <div>
      <OnImagesLoaded
        onLoaded={() => this.setState({showImages: true})}
        onTimeout={() => this.setState({showImages: true})}
        timeout={7000}
      >
        {this.state.showImages ? <ComponentWithImages/> : <Loading/>}
      </OnImagesLoaded>
    </div>
  )
}
```

```jsx
var OnImagesLoaded = require('react-on-images-loaded');
// good
render() {
  var hiddenStyle = {height: 0, overflow: 'hidden'};
  var visibleStyle = {};
  return (
    <div>
      <div style={this.state.showImages ? hiddenStyle : visibleStyle}>
        <OnImagesLoaded
          onLoaded={() => this.setState({showImages: true})}
          onTimeout={() => this.setState({showImages: true})}
          timeout={7000}
        >
          <ComponentWithImages/>
        </OnImagesLoaded>
      </div>
      <div style={this.state.showImages ? visibleStyle : hiddenStyle}>
        <Loading/>
      </div>
    </div>
  )
}
```

### Properties
| Props | Information|
|---|---|
| onLoaded | Function to run after images are loaded. |
| onTimeout | Function if timeout is reached. default: onLoaded function. |
| timeout | Time (ms) to wait before resolving component before all images are loaded. default: 7000 |


### Redux users, please read
Redux will initially load your default state if you let your component asynchronously load. Your default state does not have your images. In one way or another, ensure all <code>img</code> elements are in your store and ready to be rendered before <code>OnImagesLoaded</code> mounts.

### Notes
Big changes, going into v2.x.x. All you get (and all you need) is the <code>onLoaded</code> and <code>onTimeout</code> function.

v1.x.x was bloated. It gives too many options for such a basic concept. Every depreciated prop can be handled with <code>this.setState</code> or is completely unnecessary. All depreciated props will never be removed. The following are depreciated from v1.x.x:

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
