import {
	get,
	inject,
	Mixin
} from "Ember";


var { service } = inject;


export default Mixin.create({
	settings: service(),

	/**
	 * @returns {(string[]|undefined)}
	 */
	broadcaster_language: function() {
		if ( !get( this, "settings.gui_filterstreams" ) ) { return; }

		var filters = get( this, "settings.gui_langfilter" );
		if ( !filters ) { return; }

		var keys     = Object.keys( filters );
		var filtered = keys.filter(function( lang ) {
			return filters[ lang ];
		}, filters );

		// ignore everything (un)checked
		if ( filtered.length > 0 && filtered.length !== keys.length ) {
			return filtered;
		}
	}.property( "settings.gui_filterstreams", "settings.gui_langfilter" )
});
