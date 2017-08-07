/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component } from 'element';

class ImageSize extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			width: undefined,
			height: undefined,
		};
		this.bindContainer = this.bindContainer.bind( this );
		this.calculateSize = this.calculateSize.bind( this );
	}

	bindContainer( ref ) {
		this.container = ref;
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.src !== prevProps.src ) {
			this.setState( {
				width: undefined,
				height: undefined,
			} );
			this.fetchImageSize();
		}

		if ( this.props.dirtynessTrigger !== prevProps.dirtynessTrigger ) {
			this.calculateSize();
		}
	}

	componentDidMount() {
		this.fetchImageSize();
	}

	componentWillUnmount() {
		if ( this.image ) {
			this.image.onload = noop;
		}
	}

	fetchImageSize() {
		this.image = new window.Image();
		this.image.onload = this.calculateSize;
		this.image.src = this.props.src;
	}

	calculateSize() {
		const maxWidth = this.container.clientWidth;
		const exceedMaxWidth = this.image.width > maxWidth;
		const ratio = this.image.height / this.image.width;
		const width = exceedMaxWidth ? maxWidth : this.image.width;
		const height = exceedMaxWidth ? maxWidth * ratio : this.image.height;
		this.setState( { width, height } );
	}

	render() {
		return (
			<div ref={ this.bindContainer }>
				{ this.props.children( this.state.width, this.state.height ) }
			</div>
		);
	}
}

export default ImageSize;
