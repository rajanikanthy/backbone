/**
 * DHEEMU
 */
App.Views.Contact = Backbone.View.extend({
	template : _.template($('#template-contact').html()),
	$container : null,
	events : {
		'click .delete' : 'remove',
		'click .edit' : 'edit'
	},
	initialize : function(options) {
		_.bindAll(this, 'render', 'insert', 'remove', 'edit');
		this.$container = options.$container;
		this.listenTo(this.model, 'change', this.render);	
	},
	render : function(){
		this.$el.html(this.template(this.model.attributes));
		this.$container.append(this.$el);
		return this;
	},
	insert : function(){
		this.$container.append(this.$el);
	},
	remove : function(){
		App.Browser.navigate('contacts/remove/' + this.model.get('id'));
		this.model.destroy();
	},
	edit : function(event){
		event.preventDefault();
		var $form = $('.controls form');
		$form.show().find('input.firstName').focus();
		$('input.firstName', $form).val(this.model.get('firstName'));
		$('input.lastName', $form).val(this.model.get('lastName'));
		$('input.email', $form).val(this.model.get('email'));
		$('input.phoneNumber', $form).val(this.model.get('phoneNumber'));
	}
});
