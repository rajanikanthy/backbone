/**
 * @author DHEEMU
 */
App.Views.Directory = Backbone.View.extend({
	events : {
		'click .add' : 'addForm',
		'click .controls .save' : 'addSubmit'
	},
	initialize : function(){
		_.bindAll(this, 'render', 'addForm', 'addFormHide', 'addSubmit');
	},
	render : function(){
		var $container = this.$('.listing').empty();
		App.Contacts.each(function(contact){
			new App.Views.Contact({
				model : contact,
				$container : $container
			}).render();
		});
		return this;
	},
	addForm : function(){
		App.Browser.navigate('contacts/add');
		this.$('.controls form').show().find('input.firstName').focus();
	},
	addFormHide : function() {
		App.Browser.navigate('contacts');
		this.$('.controls form').hide();
	},
	addSubmit : function(event){
		event.preventDefault();
		var $form = this.$('.controls form');
		var oldContact = App.Contacts.findWhere({ 
			'firstName' : $('input.firstName', $form).val(),
			'lastName' :  $('input.lastName', $form).val()
		});
		if ( oldContact != null ) {
			App.Contacts.remove(oldContact);
		}
		var newContact = new App.Model.Contact({
			firstName : $('input.firstName', $form).val(),
			lastName : $('input.lastName', $form).val(),
			phoneNumber : $('input.phoneNumber', $form).val(),
			email : $('input.email', $form).val()
		});
		if ( newContact.isValid()) {
			newContact.save();
			$('input[type=text]', $form).val('');
			this.addFormHide();
		} else {
			alert(newContact.validationError);
		}
	}
});
