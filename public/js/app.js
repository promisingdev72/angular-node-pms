angular.module("parkmeApp", ['ngRoute', 'ui.bootstrap'])
.config(function($routeProvider) {
    $routeProvider
	.when("/map", {
	    templateUrl: "map.html",
	    controller: "MapController"
	})
	.when("/", {
		templateUrl: "main_page.html",
		controller: "MainPageController"
	})
	.when("/login", {
		
		templateUrl: "login.html",
		controller: "LoginController"
	})
	.when("/signup", {
		
		templateUrl: "signup.html",
		controller: "SignupController"
	})
	.when("/search", {
		
		templateUrl: "search.html",
		controller: "SearchController"
	})
	.when("/settings", {
		
		templateUrl: "settings.html",
		controller: "CheckSettingsController"
	
	})
	.when("/about", {

		templateUrl: "about.html",
		controller: "AboutController"
	})
	.when("/testing", {
		templateUrl: "testing.html",
		controller: "ContactController"
	})
	.when("/sds", {
		templateUrl: "sds.html",
		controller: "ContactController"
	})
	.when("/contact", {
		templateUrl: "contact.html",
		controller: "ContactController"
	}).when("/cms", {
		templateUrl: "cms.html",
		controller: "ColorMatchSystemController"
	}).when("/colourResult", {
		templateUrl: "cmsResult.html",
		controller: "ColorResultController"
	}).when("/addColorComponent", {
		templateUrl: "addPms.html",
		controller: "AddPmsController"
	}).when("/viewPmsEntries", {
		templateUrl: "viewAllPms.html",
		controller: "AllPmsController"
	}).when("/editPmsEntry/:pmsIden/:series", {
		templateUrl: "editPms.html",
		controller: "EditPmsController"
	}).when("/testing_canada", {
		templateUrl: "testing_canada.html",
		controller: "ContactController"
	}).when("/testing_usa", {
		templateUrl: "testing_usa.html",
		controller: "ContactController"
	})

});
angular.module("parkmeApp")
	.factory('MyService', function(){
		return {
			pmsResult: {
				description: '',
				userRequestQuantity: '',
				components: [],
				quantities: []
			}
			// Other methods or objects can go here
		};
	});