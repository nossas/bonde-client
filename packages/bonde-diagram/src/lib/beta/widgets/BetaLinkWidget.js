import React from 'react'
import { BaseWidget } from 'storm-react-diagrams'

class BetaLinkWidget extends BaseWidget {
	constructor(props) {
		super('srd-link', props)
	}

	shouldComponentUpdate() {
    console.log(this.props.link)
		return this.props.diagramEngine.canEntityRepaint(this.props.link)
	}

	render() {
    console.log(this.props)
		return this.props.children
	}
}

export default BetaLinkWidget
