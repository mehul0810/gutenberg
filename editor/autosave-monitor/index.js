/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { debounce } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { autosave } from '../actions';
import { isEditedPostDirty } from '../selectors';

class AutosaveMonitor extends Component {
	constructor() {
		super( ...arguments );

		this.debouncedAutosave = debounce( () => {
			this.props.autosave();
		}, 10000 );
	}

	componentDidUpdate( prevProps ) {
		const { isDirty } = this.props;
		if ( prevProps.isDirty === isDirty ) {
			return;
		}

		if ( isDirty ) {
			this.debouncedAutosave();
		} else {
			this.debouncedAutosave.cancel();
		}
	}

	render() {
		return null;
	}
}

export default connect(
	( state ) => {
		return {
			isDirty: isEditedPostDirty( state ),
		};
	},
	{ autosave }
)( AutosaveMonitor );
