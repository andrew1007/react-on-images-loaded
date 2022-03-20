import React, { Component } from 'react'
import PropTypes from 'prop-types'
// travis demands that test be
// "test": "echo 'no tests yet'",
// instead of test: jest

type props = {
	onLoaded: () => void;
	onTimeout?: () => void;
	timeout?: number;
	delay?: number;
	onWillMount?: () => void;
	onDidMount?: () => void;
	classNameOnLoaded?: string;
	classNameOnMount?: string;
	className?: string;
	placeholder: React.ReactElement;
};

type state = {
	loaded: boolean;
	loadCounter: number;
	imageCount: number;
	timedOut: boolean;
};

export default class OnImagesLoaded extends Component<props, state> {
	static propTypes = {
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

	_delay: number
	_timeout: number
	mounted: boolean
	_imgs: any[]
	imageLoad: HTMLDivElement | null

	constructor(props: props) {
		super(props)
		this.state = {
			loaded: false,
			loadCounter: 0,
			imageCount: 0,
			timedOut: false
		}
		this._onLoad = this._onLoad.bind(this)
		this._delay = 0
		this._timeout = 0
		this.mounted = false
		this._imgs = []
		this.imageLoad = null
	}

	timingSetup() {
		const { onWillMount, delay, timeout } = this.props
		onWillMount?.()
		this._delay = delay ?? 0
		this._timeout = Math.max(timeout ?? 0, this._delay)
	}

	componentWillUnmount() {
		this.mounted = false
		this._imgs.length > 0 ? this._removeImageListeners() : null
	}

	componentDidMount() {
		const { onLoaded, onTimeout, onDidMount } = this.props
		this.timingSetup()
		this.mounted = true
		this._imgs = Array.from(this.imageLoad?.getElementsByTagName('img') ?? [])
		if (this._imgs.length === 0) {
			if (onLoaded) {
				onLoaded()
			} else if (onTimeout) {
				onTimeout()
			}
		} else {
			onDidMount?.()
			this._addImageListeners()
			this._setOnTimeoutEvent()
		}
	}

	_addImageListeners() {
		this.setState({ imageCount: this._imgs.length }, () => {
			for (let i = 0; i < this._imgs.length; i++) {
				this._imgs[i].addEventListener('load', this._onLoad)
			}
		})
	}

	_removeImageListeners() {
		for (let i = 0; i < this._imgs.length; i++) {
			this._imgs[i].removeEventListener('load', this._onLoad)
		}
	}

	_setOnTimeoutEvent() {
		setTimeout(() => {
			this._timedOut ? this._runTimeout() : null
		}, this._timeout)
	}

	_runTimeout() {
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

	_onLoad() {
		if (this.mounted) {
			this.setState({ loadCounter: this.state.loadCounter + 1 }, () => {
				setTimeout(() => {
					this._fullyLoaded ? this._runOnLoadFunction() : null
				}, this._delay)
			})
		}
	}

	get _fullyLoaded() {
		const { loadCounter, imageCount, loaded } = this.state
		return this.mounted && (loadCounter >= imageCount) && !loaded
	}

	get _timedOut() {
		return this.mounted && !this.state.loaded
	}

	get _definedClassName() {
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
		} else if (!this.state.loaded && classNameOnMount) {
			return classNameOnMount
		} else if (classNameOnLoaded) {
			return classNameOnLoaded
		}
		return ''
	}

	render() {
		if (this.imageLoad && this._definedClassName) {
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
