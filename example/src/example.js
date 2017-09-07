import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import OnImagesLoaded from 'react-on-images-loaded'
import RegularImageLoading from './loaders/regular_image_loading'
import ImagesWithComponent from './loaders/images_with_component'
import LoadingSpinner from './loading_spinner'
import ImagesWithComponentAndFuncs from './loaders/images_with_component_and_funcs'
import ShowCss from './show_css'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			regular: false,
			withComponent: false,
			withFunc: false,
			showError: false
		}
		this.samples = ['regular', 'withComponent', 'withFunc', 'css', 'showError']
		this.toggleComponent = this.toggleComponent.bind(this)
		this.showError = this.showError.bind(this)
	}

	toggleComponent(name) {
		let prevState = this.state[name]
		for (let i of this.samples) {
			this.setState({[i]: false})
		}
		if (name === 'withFunc') {
			setTimeout(() => {
				this.setState({[name]: prevState ? false : true})
			}, 400)
		} else {
			this.setState({[name]: prevState ? false : true})
		}
	}

	showError() {
		this.setState({showError: true})
	}

	error() {
		return (
			<p className='error'>
				Oh no! OnImagesLoaded hit its default timeout cap (7000ms)
				and is mounting normally now. Is your internet connection slow?
			</p>
		)
	}

	render () {
		return (
			<div className='container'>
				<div className='subcontainer'>
					<div className='button-container'>
						<button onClick={() => this.toggleComponent('regular')}>
							normal rendering
						</button>
						<button onClick={() => this.toggleComponent('withComponent')}>
							using OnImagesLoaded
						</button>
						<button onClick={() => this.toggleComponent('withFunc')}>
							OnImagesLoaded with lifecycle methods & onLoaded function call
						</button>
						<button onClick={() => this.toggleComponent('css')}>
							show css
						</button>
					</div>
					<div>
						{this.state.showError ? this.error() : null}
					</div>
					{ this.state.regular ? <RegularImageLoading/> : null}
					{ this.state.withComponent ? <ImagesWithComponent showError={this.showError}/> : null}
					{ this.state.withFunc ? <ImagesWithComponentAndFuncs showError={this.showError}/> : null}
					{ this.state.css ? <ShowCss/> : null}
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
