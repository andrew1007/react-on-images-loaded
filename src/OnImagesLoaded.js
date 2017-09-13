import React, {Component} from 'react'

export default class OnImagesLoaded extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loaded: false,
			loadCounter: 0,
			imageCount: 0,
			timedOut: true,
			className: ''
		}
		this.onLoadEvent = this.onLoadEvent.bind(this)
	}

	componentWillMount() {
		this.props.onWillMount ? this.props.onWillMount() : null
		const tempTimeout = this.props.timeout || this.props.timeout == 0 ? this.props.timeout : 7000
		this.delay = this.props.delay || this.props.delay == 0 ? this.props.delay : 500
		this.timeout = Math.max(tempTimeout, this.delay)
	}

	componentWillUnmount() {
		this._mounted = false
		this.removeImageEventListeners()
	}

	componentDidMount() {
		this._mounted = true
		this.imgs = this.imageLoad.getElementsByTagName('img')
		this.props.onDidMount ? this.props.onDidMount() : null
		this.addImageEventListeners()
		this.setOnTimeoutEvent()
	}

	addImageEventListeners() {
		this.setState({imageCount: this.imgs.length}, () => {
			for (let i = 0; i < this.imgs.length; i++) {
				this.imgs[i].addEventListener('load', this.onLoadEvent)
			}
		})
	}

	removeImageEventListeners() {
		for (let i = 0; i < this.imgs.length; i++) {
				this.imgs[i].removeEventListener("load", this.onLoadEvent)
		}
	}

	setOnTimeoutEvent() {
		setTimeout(() => {
			(this._mounted && !this.state.loaded) ? this._runOnTimeoutFunction() : null
		}, this.timeout)
	}

	_runOnTimeoutFunction() {
		this.setState({loaded: true}, () => {
			if (this.props.onTimeout) {
				this.props.onTimeout()
			} else {
				this.props.onLoaded ? this.props.onLoaded() : null
			}
		})
	}

	onLoadEvent() {
		this.setState({ loadCounter: this.state.loadCounter + 1 }, () => {
			setTimeout(() => {
				(this._mounted && this._imagesLoaded() && !this.state.loaded) ? this._runOnLoadFunction() : null
			}, this.delay)
		})
	}

	_imagesLoaded() {
		console.log(this.state);
		return this.state.loadCounter >= this.state.imageCount
	}

	_runOnLoadFunction() {
		this.setState({loaded: true, timedOut: false}, () => {
			this.props.onLoaded ? this.props.onLoaded() : null
		})
	}

	render() {
		let className
		if (this.props.classNameOnLoaded || this.props.classNameOnMount) {
			className = this.state.loaded ? this.props.classNameOnLoaded : this.props.classNameOnMount
		}
		return (
			<div>
				{this.state.loaded ? null : this.props.placeholder}
				<div ref={(ctx) => { this.imageLoad = ctx}} className={className ? className : null}>
					{this.props.children}
				</div>
			</div>
		)
	}
}
