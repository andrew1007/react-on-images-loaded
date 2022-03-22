import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RegularImageLoading from './SubSection/RegularImageLoading';
import ImagesWithComponent from './SubSection/ImagesWithComponent';
import ShowCss from './SubSection/ShowCss';

interface State {
	showError: boolean
	regular: boolean
	withComponent: boolean
	css: boolean
}

type Props = Record<string, never>

class App extends Component<Props, State> {
	samples: string[]

	constructor(props: Props) {
		super(props);
		this.state = this.initialState;
		this.samples = ['regular', 'withComponent', 'css', 'showError'];
	}

	initialState = {
		regular: false,
		withComponent: false,
		showError: false,
		css: false,
	} as const

	toggleComponent(name: keyof State) {
		const next: State = {
			...this.initialState,
			[name]: true
		}
		this.setState(next);
	}

	showError = () => {
		this.setState({ showError: true });
	}

	error() {
		return (
			<p className='error'>
				{`Oh no! OnImagesLoaded hit its default timeout cap (7000ms) `}
				{`and is rendering normally now. Is your internet connection slow?`}
			</p>
		);
	}

	render() {
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
						<button onClick={() => this.toggleComponent('css')}>
							show css
						</button>
					</div>
					<div>
						{this.state.showError ? this.error() : null}
					</div>
					{this.state.regular && <RegularImageLoading />}
					{this.state.withComponent && <ImagesWithComponent showError={this.showError} />}
					{this.state.css && <ShowCss />}
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
