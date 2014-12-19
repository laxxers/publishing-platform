(function() {
	'use strict';

	App.Router = Backbone.Router.extend({

		routes: {
			'': 'home',
			'(@:username)/': 'profile',
			'(@:username)(/:slug)/': 'post',
			'(:tab)/': 'home'
		},


		home: function(tab) {
			App.currentView = new App.Views.Home({ el: '#main', tab: tab });
		},

		profile: function(username) {
		        var user = new App.Models.User();
		        user.urlRoot = App.paths.api + '/users/' + username;
		    	if(username) {
		    		user.username = username;
		    		user.fetch().then(function() {
		    			App.currentView = new App.Views.Profile({ el: '#main', model: user });
		    		});
		    	}
		},

		post: function(username, slug) {
			App.currentView = new App.Views.Post({ el: '#main' });
		}
	});
			
}());