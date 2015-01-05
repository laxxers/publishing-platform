var knex 	 = require('../models/base').knex,
	User 	 = require('../models/user').User,
	Follower = require('../models/follower').Follower,
	Post = require('../models/post').Post,
	Collection = require('../models/collection').Collection,
	CollectionPost= require('../models/collection-post').CollectionPost,
	Bookmark = require('../models/bookmark').Bookmark,

	user_1,
	user_2,
	follow,
	init;


user_1 = {
	"name": "Chong Zhi Rui",
	"username": "laxxers",
	"password": "abc123laxx",
	"email": "laxxers@gmail.com",
	"image": "profile.jpg"
}

user_2 = {
	"name": "Kevin Choi",
	"username": "kevin",
	"password": "abc123laxx",
	"email": "kevin@gmail.com"
}

user_3 = {
	"name": "David Yap",
	"username": "david",
	"password": "abc123laxx",
	"email": "david@gmail.com"
}


post_1 = {
	"title":            "POST 1",
	"markdown":         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at orci dolor. Morbi lacinia lectus quis justo scelerisque semper. Aliquam ultrices porttitor urna vitae vulputate. Morbi sollicitudin at orci quis congue. Duis et condimentum massa. Sed posuere est ut neque bibendum sagittis. Curabitur dictum libero at urna dapibus, vel consequat sem fringilla. Suspendisse luctus est quis risus vehicula molestie. Ut nec dapibus metus. Fusce feugiat nisl ut mauris aliquam, eu laoreet velit porta. Vestibulum consequat ac nunc ut sollicitudin. Integer lacinia arcu dolor, ut volutpat ipsum molestie ut. Donec condimentum magna sit amet risus pharetra pellentesque. Nam et lacus volutpat, posuere augue et, sollicitudin leo. Phasellus eget convallis nisi. Donec mi massa, tempor nec risus id, molestie molestie magna. Etiam id nisl ac nunc varius laoreet. Suspendisse sodales eros a congue molestie. Donec dapibus ante nunc. Nam molestie, erat interdum ultricies hendrerit, enim leo fringilla magna, non interdum elit libero non dui. Sed lacinia lorem libero, at vehicula elit condimentum vitae. Nulla faucibus volutpat laoreet. Cras bibendum consectetur nibh, vitae cursus tortor tempus in. Praesent mauris dolor, volutpat eu sodales in, molestie ac leo. Duis nisl elit, venenatis in laoreet sit amet, faucibus scelerisque arcu. Mauris ultrices molestie tempus. Nam facilisis, lacus eget facilisis vulputate, neque purus cursus dolor, at sodales purus erat ac velit. Nunc elementum elit et ante porttitor, a elementum erat suscipit. Nam adipiscing nibh a lacinia elementum. Cras et accumsan magna. Vivamus vitae dictum lectus. Vivamus in eleifend augue. Vestibulum convallis neque neque, sed condimentum ante aliquet sit amet. Suspendisse elementum vel est eget mollis. Mauris ut ipsum gravida, sollicitudin quam vitae, pulvinar purus. Proin auctor, tortor sit amet tristique viverra, turpis nulla laoreet urna, eget venenatis elit augue sit amet metus. Nam non tellus vel dolor lacinia aliquam sit amet fermentum ipsum. In malesuada sem sem, vel convallis mauris ullamcorper id. Praesent ut faucibus ligula.",
	"image":            null,
	"status":           "published",
	"author_id": 1
}

post_2 = {
	"title": "POST 2",
	"markdown": "This is post 2",
	"image": null,
	"status":           "published",
	"author_id": 2
}

post_3 = {
	"title": "POST 3",
	"markdown": "This is post 3",
	"image": null,
	"status":           "published",
	"author_id": 3
}

collection_1 = {
	"title": "My Collection",
	"description": "Just my test collection",
	"editor_id" : 1
}

collection_2 = {
	"title": "Techno Geek",
	"description": "All about techs.",
	"editor_id" : 1
}

bookmark_1 = {
	"owner_id": 1,
	"post_id": 1
}
function PopulateUsers(user) {
	return User.add(user).then(function(user) {
		console.log("userdone");
	});
}

function PopulatePost(post) {
	return Post.add(post).then(function() {
		console.log("postdone");
	});
}

function PopulateCollection(collection) {
	return Collection.add(collection).then(function() {
		console.log("collectiondone");
	})
}

function PopulateBookmark(bookmark) {
	return Bookmark.add(bookmark).then(function() {
		console.log("bookmarkdone");
	})	
}

init = function() {

	knex.schema.hasTable('users').then(function(exists) {
		if(!exists) {
			return knex.schema.createTable('users', function(t) {
				t.increments('id').primary();
				t.string('uuid', 36);
				t.string('name', 150).unique();
				t.string('username', 150).unique();
				t.string('password', 1000);
				t.string('email', 254).unique();
				t.text('image', 2000).nullable();
				t.text('cover', 2000).nullable();
				t.string('bio', 250).nullable();
				t.string('status').defaultTo('active');
				t.dateTime('last_login').nullable();
				t.timestamps();
			}).then(function() {
				return PopulateUsers(user_1);
			}).then(function() {
				return PopulateUsers(user_2);
			}).then(function() {
				return PopulateUsers(user_3);
			})
		}
	});

	knex.schema.hasTable('posts').then(function(exists) {
		if (!exists) {
			return knex.schema.createTable('posts', function(t) {
				t.increments('id').primary();
				t.string('uuid', 36);
				t.string('title', 150);
				t.string('slug', 150);
				t.text('markdown', 16777215);
				t.text('html', 16777215);
				t.string('time', 150);
				t.text('image', 2000).nullable();
				t.string('status', 150);
				t.integer('author_id');
				t.timestamps(); 
			}).then(function() {
				return PopulatePost(post_1);
			}).then(function() {
				return PopulatePost(post_2);
			}).then(function() {
				return PopulatePost(post_3);
			})
		}
	});

	knex.schema.hasTable('users_users').then(function(exists) {
		if(!exists) {
			return knex.schema.createTable('users_users', function(t) {
				t.increments('id').primary();
				t.string('uuid', 36);
				t.integer('follower_id').notNullable().references('id').inTable('users');
				t.integer('following_id').notNullable().references('id').inTable('users');
				t.timestamps();
			}).then(function() {
				console.log("user_user done")
			});
		}
	});

	knex.schema.hasTable('collections').then(function(exists) {
		if(!exists) {
			return knex.schema.createTable('collections', function(t) {
				t.increments('id').primary();
				t.string('uuid', 36);
				t.string('title', 150);
				t.string('slug', 150);
				t.string('description', 150);
				t.string('cover', 150);
				t.integer('editor_id');
				t.timestamps(); 
			}).then(function() {
				return PopulateCollection(collection_1);
			}).then(function() {
				return PopulateCollection(collection_2);
			})
		}
	});

	knex.schema.hasTable('collections_posts').then(function(exists) {
		if(!exists) {
			return knex.schema.createTable('collections_posts', function(t) {
				t.increments('id').primary();
				t.string('uuid', 36);
				t.integer('collection_id').notNullable().references('id').inTable('collections');
				t.integer('post_id').notNullable().references('id').inTable('posts');
				t.timestamps();
			}).then(function() {
				console.log("collections_posts done");
			})
		}
	});

	knex.schema.hasTable('bookmarks').then(function(exists) {
		if(!exists) {
			return knex.schema.createTable('bookmarks', function(t) {
				t.increments('id').primary();
				t.string('uuid', 36);
				t.integer('owner_id');
				t.integer('post_id');
				t.timestamps();
			}).then(function() {
				return PopulateBookmark(bookmark_1);
			})
		}
	});
};

module.exports = {
	init: init
}