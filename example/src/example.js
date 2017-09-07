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
			withFunc: false
		}
		this.samples = ['regular', 'withComponent', 'withFunc', 'css']
		this.toggleComponent = this.toggleComponent.bind(this)
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
					{ this.state.regular ? <RegularImageLoading/> : null}
					{ this.state.withComponent ? <ImagesWithComponent/> : null}
					{ this.state.withFunc ? <ImagesWithComponentAndFuncs/> : null}
					{ this.state.css ? <ShowCss/> : null}
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
