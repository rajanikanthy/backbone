var App = {
	Model : {},
	Collections : {},
	Views : {},
	Contacts : null,
	Directory : null,
	Routers: {},
	Browser: null
}

$(function() {
	App.Contacts = new App.Collections.Contact();

	App.Contacts.fetch();

	App.Directory = new App.Views.Directory({
		el : $('#display')
	});
	
	App.Directory.render();
	
	App.Contacts.on('add remove', function(){
		App.Directory.render();
	});
	App.Browser = new App.Routers.Contact();
	Backbone.history.start();
});

