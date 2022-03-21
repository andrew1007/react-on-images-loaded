import React, { Component } from 'react'
import PropTypes from 'prop-types'

export type Props = {
	onLoaded: () => void;
	onTimeout?: () => void;
	onUpdate?: () => void;
	timeout?: number;
	delay?: number;
	children: React.ReactElement | React.ReactElement[]
	// deprecated
	placeholder?: React.ReactElement;
	onWillMount?: () => void;
	onDidMount?: () => void;
	classNameOnLoaded?: string;
	classNameOnMount?: string;
	className?: string;
};

type state = {
	loaded: boolean;
	loadCounter: number;
	imageCount: number;
	timedOut: boolean;
};

const noop = () => null

export default class OnImagesLoaded extends Component<Props, state> {
	static propTypes = {
		onTimeout: PropTypes.func,
		onLoaded: PropTypes.func.isRequired,
		delay: PropTypes.number,
		onUpdate: PropTypes.func,
		// depreciated
		placeholder: PropTypes.element,
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
	observer: MutationObserver

	constructor(props: Props) {
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
		this.observer = new MutationObserver(noop)
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

	observe() {
		const config = { attributes: true, childList: true, subtree: true };
		this.observer = new MutationObserver((mutationsList) => {
			for (const mutation of mutationsList) {
				if (mutation.type === 'childList') {
					mutation.removedNodes.forEach(node => {
						node.removeEventListener('load', this._onLoad)
					})
					mutation.addedNodes.forEach(node => {
						node.addEventListener('load', this._onLoad)
					})
				}
			}
		})
		if (this.imageLoad) {
			this.observer.observe(this.imageLoad, config)
		}
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
			this.observe()
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
