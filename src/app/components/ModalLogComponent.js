import {
	run,
	Component
} from "Ember";
import layout from "hbs!templates/components/ModalLogComponent";


var { scheduleOnce } = run;


export default Component.extend({
	layout: layout,

	tagName: "section",
	classNames: [ "modal-log" ],

	log: function() {
		return [];
	}.property(),

	_logObserver: function() {
		scheduleOnce( "afterRender", this, "scrollToBottom" );
	}.observes( "log.[]" ),

	scrollToBottom: function() {
		var elem = this.element;
		if ( !elem ) { return; }
		elem.scrollTop = Math.max( 0, elem.scrollHeight - elem.clientHeight );
	}.on( "didInsertElement" )
});
