// @ts-check
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// travis demands that test be
// "test": "echo 'no tests yet'",
// instead of test: jest

const truthy = (el) => ![false, undefined, null].includes(el)

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
		const { onWillMount, delay, timeout } = this.props
		onWillMount ? onWillMount() : null
		let [tempTimeout, tempDelay] = [timeout, delay]
		tempTimeout = truthy(tempTimeout) ? tempTimeout : 7000
		this._delay = truthy(tempDelay) ? tempDelay : 0
		this._timeout = Math.max(tempTimeout, this._delay)
	}

	componentWillUnmount() {
		this.mounted = false
		this._imgs.length > 0 ? this._removeImageEventListeners() : null
	}

	componentDidMount() {
		const { onLoaded, onTimeout, onDidMount } = this.props
		this.timingSetup()
		this.mounted = true
		this._imgs = this.imageLoad.getElementsByTagName('img')
		if (this._imgs.length === 0) {
			if (onLoaded) {
				onLoaded()
			} else if (onTimeout) {
				onTimeout()
			}
		} else {
			onDidMount ? onDidMount() : null
			this._addImageEventListeners()
			this._setOnTimeoutEvent()
		}
	}

	_addImageEventListeners() {
		this.setState({ imageCount: this._imgs.length }, () => {
			for (let i = 0; i < this._imgs.length; i++) {
				this._imgs[i].addEventListener('load', this._onLoadEvent)
			}
		})
	}

	_removeImageEventListeners() {
		for (let i = 0; i < this._imgs.length; i++) {
			this._imgs[i].removeEventListener('load', this._onLoadEvent)
		}
	}

	_setOnTimeoutEvent() {
		setTimeout(() => {
			this._hasTimedOut ? this._runOnTimeoutFunction() : null
		}, this._timeout)
	}

	_runOnTimeoutFunction() {
		if (this.mounted) {
			const { onTimeout, onLoaded } = this.props
			this.setState({ loaded: true }, () => {
				if (onTimeout) {
					onTimeout()
				} else if (onLoaded) {
					onLoaded()
				}
			})
		}
	}

	_onLoadEvent() {
		if (this.mounted) {
			this.setState({ loadCounter: this.state.loadCounter + 1 }, () => {
				setTimeout(() => {
					this._hasBeenFullyAndProperlyLoaded ? this._runOnLoadFunction() : null
				}, this._delay)
			})
		}
	}

	get _hasBeenFullyAndProperlyLoaded() {
		const { loadCounter, imageCount, loaded } = this.state
		return this.mounted && (loadCounter >= imageCount) && !loaded
	}

	get _hasTimedOut() {
		return this.mounted && !this.state.loaded
	}

	get _hasDefinedClassName() {
		const { classNameOnLoaded, classNameOnMount, className } = this.props
		return !!(classNameOnLoaded || classNameOnMount || className)
	}

	_runOnLoadFunction() {
		if (this.mounted) {
			const { onLoaded } = this.props
			this.setState({ loaded: true, timedOut: false }, () => {
				onLoaded ? onLoaded() : null
			})
		}
	}

	_depreciatedClassNameHandler() {
		const { className, classNameOnLoaded, classNameOnMount } = this.props
		if (className) {
			return className
		} else if (!this.state.loaded) {
			return classNameOnMount
		} else {
			return classNameOnLoaded
		}
	}

	render() {
		if (this.imageLoad && this._hasDefinedClassName) {
			this.imageLoad.className = this._depreciatedClassNameHandler()
		}
		return (
			<div>
				{this.state.loaded ? null : this.props.placeholder}
				<div ref={(ctx) => { this.imageLoad = ctx }}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

OnImagesLoaded.propTypes = {
	onTimeout: PropTypes.func,
	onLoaded: PropTypes.func.isRequired,
	delay: PropTypes.number,
	// depreciated 
	onDidMount: PropTypes.func,
	onWillMount: PropTypes.func,
	classNameOnLoaded: PropTypes.string,
	classNameOnMount: PropTypes.string,
	className: PropTypes.string,
}
