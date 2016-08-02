app.controller("searchHotelController",function ($scope,$http,$location) {
	
	$scope.placeHotel=function(){
		$http({method:"POST",
			url:"http://localhost:3000/api/hotels/search",
			data: {
				place:$scope.place
			}
			}).then(function(response) {
				if(response.data.length==0) {
					$scope.responseH="Not Found";
				}
				else
					$scope.responseH=response;
		});
	}		

	$scope.book=function(d){	
		$scope.bookHotel($scope.responseH.data[d]);
		
	}

	$scope.bookHotel=function(c){

		$scope.bookHotelData=c;
		console.log($scope.bookHotelData.place);
		$location.path('/bookHotel');

		// $http({method:"POST",
		// 	url:"",
		// 	data:{
		// 		hotelName:c.Hotel_name,
		// 		hotelemail:c.Email_ID;
		// 		hotelPhone:c.Phone_no;
		// 	    hotelPrice:c.Room_price;
		// 	    hotelType:c.Type_of_hotel;
		// 	    startDate:startDate;
		// 	    endDate:endDate;
		// 	    typeOfRoom:typeOfRoom;
		// 	    noOfRoom:noOfRoom;
		// 	    status:status;
		// 	    payment:payment;
		// 	}})
	}

})