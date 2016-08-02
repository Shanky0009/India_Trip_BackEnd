app.controller("destinationController",function ($rootScope,$http) {

	// $rootScope.destinationInfo="";
	$http({method:"GET",
		url:"http://localhost:3000/api/destination/number"
		}).then(function(response){
		$rootScope.destinationData=response;
	});

	$rootScope.destinationInfo=function(index){	

		// angular.copy(item, $scope.CurrentTaskForce);

		$rootScope.destinationPlace=$rootScope.destinationData.data[index].Place;
		$rootScope.destinationDesc=$rootScope.destinationData.data[index].Description;
		$rootScope.destinationTemp=$rootScope.destinationData.data[index].Temperature;
		$rootScope.destinationState=$rootScope.destinationData.data[index].State;
		modal.style.display="block";

	};

	$rootScope.closeModal=function(event){
		if(event.target==modal){
			modal.style.display="none";
		} else if(event.target==closeMod) {
			modal.style.display="none";
		}	
	}

})