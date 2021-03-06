define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/contact-template.html'
], function($, _, Backbone, contactTemplate) {
	var ContactView = Backbone.View.extend({
		el: $("#template"),
		initialize: function() {
			console.log("RENDER \t contact");
			this.render();
		},
		render: function() {
			var template = _.template(contactTemplate, {});
			this.$el.html(template);			
		}
	});
	return ContactView;
});