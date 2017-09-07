import React, {Component} from 'react'

export default class OnImagesLoaded extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loaded: false,
			loadCounter: 0,
			imageCount: 0,
			timedOut: true
		}
		this.onLoadEvent = this.onLoadEvent.bind(this)
	}

	componentWillMount() {
		this.props.onWillMount ? this.props.onWillMount() : null
	}

	componentWillUnmount() {
		this.setState({loaded: true})
		const imgs = this.imageLoad.getElementsByTagName('img')
		for (let i = 0; i < imgs.length; i++) {
			imgs[i].removeEventListener("load", this.onLoadEvent)
		}
	}

	componentDidMount() {
		this.props.onDidMount ? this.props.onDidMount() : null
		const imgs = this.imageLoad.getElementsByTagName('img')
		this.setState({imageCount: imgs.length}, () => {
			for (let i = 0; i < imgs.length; i++) {
				imgs[i].addEventListener("load", this.onLoadEvent)
			}
		})
		this.onTimeoutEvent()
	}

	onTimeoutEvent() {
		let timeout = this.props.timeout || this.props.timeout == 0 ? this.props.timeout : 7000
		let delay = this.props.delay || this.props.delay == 0 ? this.props.delay : 500
		timeout = Math.max(timeout, delay)
		setTimeout(() => {
			if (this.state.timedOut && this.state.loaded === false) {
				this.setState({loaded: true}, () => {
					if (this.props.onTimeout) {
						this.props.onTimeout()
					} else {
						this.props.onLoaded ? this.props.onLoaded() : null
					}
				})
			}
		}, timeout)
	}

	onLoadEvent() {
		let delay = this.props.delay || this.props.delay == 0 ? this.props.delay : 500
		this.setState({
			loadCounter: this.state.loadCounter + 1
		}, () => {
			setTimeout(() => {
				if (this.state.loaded === false) {
					if (this.state.loadCounter >= this.state.imageCount) {
						this.setState({loaded: true, timedOut: false}, () => {
							this.props.onLoaded ? this.props.onLoaded() : null
						})
					}
				}
			}, delay)
		})
	}

	render() {
		let currentClassName
		if (this.state.loaded) {
			currentClassName = this.props.classNameOnLoaded
		} else {
			currentClassName = this.props.classNameOnMount
		}
		return (
			<div>
				{this.state.loaded ? null : this.props.placeholder}
				<div ref={(ctx) => { this.imageLoad = ctx}} className={currentClassName}>
					{this.props.children}
				</div>
			</div>
		)
	}
}
