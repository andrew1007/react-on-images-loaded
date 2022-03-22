# OnImagesLoaded

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
import OnImagesLoaded from 'react-on-images-loaded';

<OnImagesLoaded
  onLoaded={this.runAfterImagesLoaded}
  onTimeout={this.runTimeoutFunction}
  timeout={7000}
>
  {'child HTML elements and components with images'}
</OnImagesLoaded>
```

### Controlling images in a ternary (important!)
OnImagesLoaded uses `getElementsByTagName`. It can't find images that are not loaded in the DOM. Make sure the images exist when `OnImagesLoaded` mounts.

```jsx
import OnImagesLoaded from 'react-on-images-loaded'
class Parent extends React.Component {
  render() {
    return (
      <div>
        {this.props.images.length > 0 ? <ImageElements images={this.props.images} /> : <LoadingState />}
      </div>
    )
  }
}

class ImageElements extends React.Component {
  constructor() {
    super()
    this.state = {
      showImages: false
    }
  }
  render() {
    return (
      <OnImagesLoaded
        onLoaded={() => this.setState({ showImages: true })}
        onTimeout={() => this.setState({ showImages: true })}
        timeout={7000}
      >
        <div style={{ opacity: this.state.showImages ? 1 : 0 }}>
          {this.props.images.map(imgUrl => <img src={imgUrl} />)}
        </div>
      </OnImagesLoaded>
    )
  }
}
```

### Properties
| Props | Information|
|---|---|
| onLoaded | Function to run after images are loaded. |
| onTimeout | Function if timeout is reached. default: onLoaded function. |
| timeout | Time (ms) to wait before resolving component before all images are loaded. default: 7000 |


### Notes

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
