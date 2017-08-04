/**
 * External dependencies
 */
import clickOutside from 'react-click-outside';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

class PopoverDetectOutside extends Component {
	handleClickOutside() {
		const { onClickOutside } = this.props;
		if ( onClickOutside ) {
			onClickOutside();
		}
	}

	render() {
		return this.props.children;
	}
}

export default clickOutside( PopoverDetectOutside );
