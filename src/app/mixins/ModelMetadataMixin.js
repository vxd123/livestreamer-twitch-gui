import {
	get,
	set,
	merge,
	inject,
	Mixin
} from "Ember";


var { service } = inject;


export default Mixin.create({
	store: service(),

	modelName: null,

	actions: {
		didTransition: function() {
			var modelName = get( this, "modelName" );
			if ( !modelName ) { return; }

			var store      = get( this, "store" );
			var controller = get( this, "controller" );
			var metadata   = store._metadataFor( modelName );

			set( controller, "metadata", merge( {}, metadata ) );
		}
	}
});
