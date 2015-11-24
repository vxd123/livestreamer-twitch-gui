module.exports = {
	options: {
		baseUrl       : "src/app",
		mainConfigFile: "src/app/config.js",

		name: "",
		out : "build/tmp/app/main.js",

		include: [ "main" ],
		exclude: [ "EmberHtmlbars", "EmberHtmlbarsWrapper" ],

		findNestedDependencies: true,
		generateSourceMaps    : false,
		optimize              : "none",

		skipModuleInsertion: false,
		wrap               : false,

		skipSemiColonInsertion : true,
		useStrict              : true,
		preserveLicenseComments: true,

		map: {
			"json": {
				"json": "../requirejs/plugins/json/json.optimizer"
			},
			"hbs": {
				"hbs": "../requirejs/plugins/hbs/hbs.optimizer"
			},
			"es6": {
				"es6": "../requirejs/plugins/es6/es6.optimizer"
			}
		}
	},

	dev: {
		options: {
			generateSourceMaps: true,

			paths: {
				"json": "../requirejs/plugins/json/json.prod",
				"hbs" : "../requirejs/plugins/hbs/hbs.prod",
				"es6" : "../requirejs/plugins/es6/es6.prod"
			}
		}
	},

	release: {
		options: {
			paths: {
				"json": "../requirejs/plugins/json/json.prod",
				"hbs" : "../requirejs/plugins/hbs/hbs.prod",
				"es6" : "../requirejs/plugins/es6/es6.prod",

				"Ember"    : "../vendor/ember/ember.prod",
				"EmberData": "../vendor/ember-data/ember-data.prod"
			}
		}
	}
};
