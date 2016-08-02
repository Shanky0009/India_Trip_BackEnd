app.controller("signInController",function ($scope,$http) {
	
	$scope.signIn=function()
	{
		$http({
			method:"POST",
			url:"http://localhost:3000/api/login",
			data:{
			password:$scope.emailID,
			emailID:$scope.password
			}
		}).then(function(response)
		{
			$scope.response1=response.data;
		});
	}
	


})