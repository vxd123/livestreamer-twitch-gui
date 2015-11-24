import {
	get,
	computed,
	inject,
	Controller
} from "Ember";
import nwWindow from "nwjs/nwWindow";


var { readOnly } = computed;
var { controller, service } = inject;


export default Controller.extend({
	auth        : service(),
	notification: service(),
	settings    : service(),
	livestreamer: controller(),

	dev: DEBUG,

	streamsLength: readOnly( "livestreamer.model.length" ),

	notif_enabled: readOnly( "notification.enabled" ),
	notif_running: readOnly( "notification.running" ),
	notif_error  : readOnly( "notification.error" ),

	loginSuccess: readOnly( "auth.session.isLoggedIn" ),
	loginPending: readOnly( "auth.session.isPending" ),
	loginTitle  : function() {
		if ( !get( this, "loginSuccess" ) ) {
			return "You're not logged in";
		}

		return "Logged in as " + get( this, "auth.session.user_name" )
			+ ( get( this, "notif_running" )
				? "\nDesktop notifications enabled"
				: get( this, "notif_error" )
					? "\nDesktop notifications error"
					: ""
			);
	}.property( "loginSuccess", "notif_running", "notif_error" ),


	actions: {
		"winRefresh": function() {
			nwWindow.reloadIgnoringCache();
		},

		"winDevTools": function() {
			nwWindow.showDevTools();
		},

		"winMin": function() {
			var integration    = get( this, "settings.gui_integration" ),
			    minimizetotray = get( this, "settings.gui_minimizetotray" );

			// tray only or both with min2tray: just hide the window
			if ( integration === 2 || integration === 3 && minimizetotray ) {
				nwWindow.toggleVisibility( false );
			} else {
				nwWindow.toggleMinimize( false );
			}
		},

		"winMax": function() {
			nwWindow.toggleMaximize();
		},

		"winClose": function() {
			if ( get( this, "streamsLength" ) ) {
				this.send( "openModal", "quit", this );
			} else {
				this.send( "quit" );
			}
		},

		"quit": function() {
			nwWindow.close( true );
		},

		"shutdown": function() {
			get( this, "livestreamer" ).killAll();
			this.send( "quit" );
		}
	}
});
