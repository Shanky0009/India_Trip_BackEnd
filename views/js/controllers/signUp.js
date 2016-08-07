app.controller("signUpController",function ($scope,$http) {
	
	$scope.signUp=function()
	{
		$http({
			method:"POST",
			url:"http://localhost:3000/api/users",
			data:{
				username:$scope.username,	
				emailID:$scope.emailID,
				password:$scope.password,
				answer:$scope.answer
			}
		}).then(function(response)
		{
			$scope.response1=response.data;
		});
	}
})