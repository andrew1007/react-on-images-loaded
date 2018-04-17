import React, {Component} from 'react'
// travis demands that test be
// "test": "echo 'no tests yet'",
// instead of test: jest

export default class OnImagesLoaded extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loaded: false,
			loadCounter: 0,
			imageCount: 0
		}
		this._onLoadEvent = this._onLoadEvent.bind(this)
	}

	timingSetup() {
		this._isInProps('onWillMount') ? this.props.onWillMount() : null
		let [tempTimeout, tempDelay] = [this.props.timeout, this.props.delay]
		tempTimeout = (tempTimeout || tempTimeout== 0) ? tempTimeout: 7000
		this._delay = (tempDelay || tempDelay == 0) ? tempDelay : 0
		this._timeout = Math.max(tempTimeout, this._delay)
	}

	componentWillUnmount() {
		this.mounted = false
		this._imgs.length > 0 ? this._removeImageEventListeners() : null
	}

	componentDidMount() {
		this.timingSetup()
		this.mounted = true
		this._imgs = this.imageLoad.getElementsByTagName('img')
		if (this._imgs.length === 0) {
			if (this._isInProps('onLoaded')) {
				this.props.onLoaded()
			} else if (this._isInProps('onTimeout')){
				this.props.onTimeout()
			}
		} else {
			this._isInProps('onDidMount') ? this.props.onDidMount() : null
			this._addImageEventListeners()
			this._setOnTimeoutEvent()
		}
	}

	_addImageEventListeners() {
		this.setState({imageCount: this._imgs.length}, () => {
			for (let i = 0; i < this._imgs.length; i++) {
				this._imgs[i].addEventListener('load', this._onLoadEvent)
			}
		})
	}

	_removeImageEventListeners() {
		for (let i = 0; i < this._imgs.length; i++) {
			this._imgs[i].removeEventListener("load", this._onLoadEvent)
		}
	}

	_setOnTimeoutEvent() {
		setTimeout(() => {
			this._hasTimedOut() ? this._runOnTimeoutFunction() : null
		}, this._timeout)
	}

	_isInProps(prop) {
		return prop in this.props
	}

	_runOnTimeoutFunction() {
		if (this.mounted) {
			this.setState({loaded: true}, () => {
				if (this._isInProps('onTimeout')) {
					this.props.onTimeout()
				} else if (this._isInProps('onLoaded')){
					this.props.onLoaded()
				}
			})
		}
	}

	_onLoadEvent() {
		if (this.mounted) {
			this.setState({ loadCounter: this.state.loadCounter + 1 }, () => {
				setTimeout(() => {
					this._hasBeenFullyAndProperlyLoaded() ? this._runOnLoadFunction() : null
				}, this._delay)
			})
		}
	}

	_hasBeenFullyAndProperlyLoaded() {
		return this.mounted && (this.state.loadCounter >= this.state.imageCount) && !this.state.loaded
	}

	_hasTimedOut() {
		return this.mounted && !this.state.loaded
	}

	_runOnLoadFunction() {
		if (this.mounted) {
			this.setState({loaded: true, timedOut: false}, () => {
				this._isInProps('onLoaded') ? this.props.onLoaded() : null
			})
		}
	}

	_depreciatedClassNameHandler() {
		const { className, classNameOnLoaded, classNameOnMount } = this.props
		const classNames = { className, classNameOnLoaded, classNameOnMount	}
		if (className) {
			return className
		} else if (!this.state.loaded){
			return classNameOnMount
		} else {
			return classNameOnLoaded
		}
	}

	render() {
		const hasDefinedClassName = this._isInProps('classNameOnLoaded') || this._isInProps('classNameOnMount') || this._isInProps('className')
		if (this.imageLoad && hasDefinedClassName) {
			this.imageLoad.className = this._depreciatedClassNameHandler()
		}
		return (
			<div>
				{this.state.loaded ? null : this.props.placeholder}
				<div ref={(ctx) => { this.imageLoad = ctx}}>
					{this.props.children}
				</div>
			</div>
		)
	}
}
