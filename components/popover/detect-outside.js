/**
 * External dependencies
 */
import clickOutside from 'react-click-outside';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

class PopoverDetectOutside extends Component {
	handleClickOutside( event ) {
		this.props.onClickOutside( event );
	}

	render() {
		return this.props.children;
	}
}

export default clickOutside( PopoverDetectOutside );
