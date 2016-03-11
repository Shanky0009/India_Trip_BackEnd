// var app=angular.module('myLog',['ngCookies']);
//  app.controller('myCntr',function($scope,$http,$location, $window, $cookieStore)
//  {

//  		$http.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

// 				$scope.logout=function()
// 				{
// 					$http({method:"GET",
// 							url:"http://localhost:3000/api/logout",
// 							}).then(function()
// 							{
// 								$window.location=("/Angular.html");
// 							});
// 				};

// 				$scope.postbody=function()
// 				{
// 					$http({method:"POST",
// 							url:"http://localhost:3000/api/post",
// 							data:{
// 								postBody:$scope.postBody
// 							}
// 							}).then(function(response)
// 							{
								
// 								$scope.posts.push(response.data);
// 							});
// 				};

				
// 				$http.get("http://localhost:3000/api/showpost").then(function(response)
// 							{
								
// 								$scope.posts=response.data;
// 							});

// 				$scope.removePost = function (x) 
// 				{

// 					$http({method:"POST",
// 							url:"http://localhost:3000/deletepost",
// 							data:{
// 								id:$scope.x._id
// 							}
// 							}).then(function(response)
// 							{
								
// 								$scope.posts.splice(x,1);
// 								cookieStore.remove("Postdata");
// 							});
        						
//     			} 

//    } 			