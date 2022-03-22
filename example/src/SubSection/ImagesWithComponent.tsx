import React, { Component } from 'react';
import images from './images';
import OnImagesLoaded from 'react-on-images-loaded';
import LoadingSpinner from './LoadingSpinner';
import PropTypes from 'prop-types'

type Props = {
  showError: () => void
}

type State = {
  loaded: boolean
}

export default class ImagesWithComponent extends Component<Props, State> {
  static propTypes = {
    showError: PropTypes.bool
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  images() {
    const imgs = images.map((url, idx) => (
      <div key={idx} className='image'>
        <img src={url + '?' + new Date().getTime()} className='image' />
      </div>
    ));
    return (
      <div className={this.state.loaded ? 'hidden-false' : 'hidden-true'}>
        {imgs}
      </div>
    );
  }

  onLoadedHandler = () => {
    this.setState({ loaded: true });
  }

  handleTimeout = () => {
    this.props.showError();
    alert('hit timeout. this is the onTimeout function being run and is mounting normally now');
    this.setState({ loaded: true });
  }

  render() {
    return (
      <OnImagesLoaded
        onLoaded={this.onLoadedHandler}
        onTimeout={this.handleTimeout}
        timeout={70000}
      >
        {!this.state.loaded && <LoadingSpinner />}
        {this.images()}
      </OnImagesLoaded>
    );
  }
}
