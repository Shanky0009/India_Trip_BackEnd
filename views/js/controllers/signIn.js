app.controller("signInController",function ($scope,$http) {

	$scope.$watch(
		function($scope){ return $scope.emailID},
		function(newValue,oldValue){
			if(/.com/i.exec(newValue)){
				$http({
					method:"POST",
					url:"http://localhost:3000/api/beforeLogin",
					data:{
						emailID:newValue
					}
				}).then(function(response)
				{
					$scope.signIn(response.data);
				});
			} 	
		});


	$scope.signIn=function(len)
	{
		$scope.$watch(
		function(scope){ return scope.password},
		function(newValue,oldValue){
		 	if(newValue !== oldValue){
				if(newValue.length==len) {
					$http({
						method:"POST",
						url:"http://localhost:3000/api/login",
						data:{
							emailID:$scope.emailID,
							password:$scope.password
						}
					}).then(function(response)
					{
						if(response.data.username){
							$scope.response1=response.data;
							$scope.response2="";
						}
						else{
							$scope.response2=response.data;
							$scope.response1="";
						}
					});
				}
			}
		});	
	}

})