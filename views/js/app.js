var app=angular.module('app',['ngRoute']);

// $http.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

app.config(['$routeProvider',function ($routeProvider) {
	$routeProvider.
	when('/indiaTrip',{
		templateUrl:'view/indiaTrip.html',
		// controller:'indiaTripController'
	}).
	when('/destination',{
		templateUrl:'view/destination.html',
		controller:'destinationController'
	}).
	when('/searchHotel',{
		templateUrl:'view/searchHotel.html',
		controller:'searchHotelController'
	}).
	when('/signIn',{
		templateUrl:'view/signIn.html',
		controller:'signInController'
	}).
	when('/signUp',{
		templateUrl:'view/signUp.html',
		controller:'signUpController'
	}).
	when('/aboutUs',{
		templateUrl:'view/aboutUs.html',
		controller:'aboutUsController'
	}).
	when('/bookHotel',{
		templateUrl:'view/bookHotel.html',
		controller:'searchHotelController'
	}).
	otherwise({
		redirectTo:'/indiaTrip'
	});
}]);
