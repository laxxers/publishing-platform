(function() {
	'use strict';

	App.View = Backbone.View.extend({

		template: function (data) {
            return JST[this.templateName](data);
        },

        templateData: function () {
            if (this.model) {
                return this.model.toJSON();
            }

            if (this.collection) {
                console.log(this.collection.toJSON());
                return this.collection.toJSON();
            }

            return {};
        },

        render: function () {
            this.$el.html(this.template(this.templateData()));
            return this;
        }
	});

} ());