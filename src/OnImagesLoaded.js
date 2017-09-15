import React, {Component} from 'react'

export default class OnImagesLoaded extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loaded: false,
			loadCounter: 0,
			imageCount: 0
		}
		this.onLoadEvent = this.onLoadEvent.bind(this)
	}

	componentWillMount() {
		this.props.onWillMount ? this.props.onWillMount() : null
		let [tempTimeout, tempDelay] = [this.props.timeout, this.props.delay]
		tempTimeout = (tempTimeout || tempTimeout== 0) ? tempTimeout: 7000
		this._delay = (tempDelay || tempDelay == 0) ? tempDelay : 0
		this._timeout = Math.max(tempTimeout, this._delay)
	}

	componentWillUnmount() {
		this._mounted = false
		this._imgs.length > 0 ? this.removeImageEventListeners() : null
	}

	componentDidMount() {
		this._mounted = true
		this._imgs = this.imageLoad.getElementsByTagName('img')
		if (this._imgs.length === 0) {
			this.props.onLoaded ? this.props.onLoaded() : this.props.onTimeout()
		} else {
			this.props.onDidMount ? this.props.onDidMount() : null
			this.addImageEventListeners()
			this.setOnTimeoutEvent()
		}
	}

	addImageEventListeners() {
		let totalValidImages = 0
		for (let i = 0; i < this._imgs.length; i++) {
			if (this._imgs[i].src) {
				this._imgs[i].addEventListener('load', this.onLoadEvent)
				totalValidImages += 1
			}
		}
		if (this._mounted) {
			this.setState({imageCount: totalValidImages})
		}
	}

	removeImageEventListeners() {
		for (let i = 0; i < this._imgs.length; i++) {
			if (this._imgs[i].src) {
				this._imgs[i].removeEventListener("load", this.onLoadEvent)
			}
		}
	}

	setOnTimeoutEvent() {
		setTimeout(() => {
			this._hasTimedOut() ? this._runOnTimeoutFunction() : null
		}, this._timeout)
	}

	_runOnTimeoutFunction() {
		if (this._mounted) {
			this.setState({loaded: true}, () => {
				if (this.props.onTimeout) {
					this.props.onTimeout()
				} else {
					this.props.onLoaded ? this.props.onLoaded() : null
				}
			})
		}
	}

	onLoadEvent() {
		if (this._mounted) {
			this.setState({ loadCounter: this.state.loadCounter + 1 }, () => {
				setTimeout(() => {
					this._hasBeenFullyAndProperlyLoaded() ? this._runOnLoadFunction() : null
				}, this._delay)
			})
		}
	}

	_hasBeenFullyAndProperlyLoaded() {
		return this._mounted && (this.state.loadCounter >= this.state.imageCount) && !this.state.loaded
	}

	_hasTimedOut() {
		return this._mounted && !this.state.loaded
	}

	_runOnLoadFunction() {
		if (this._mounted) {
			this.setState({loaded: true, timedOut: false}, () => {
				this.props.onLoaded ? this.props.onLoaded() : null
			})
		}
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
