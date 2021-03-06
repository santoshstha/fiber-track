

var location = angular.module('locations',[]);



location.config(function configure($routeProvider) {

	$routeProvider
				.when('/locations', 
		         	      { 
		         	      	controller: 'locationController', 
		         	      	templateUrl: './packages/partial/locations/location.html' 
		         	      }
		         	  )
				  
				.when('/locations/add', 
					  { 
						controller: 'locationController', 
						templateUrl: './packages/partial/locations/location_add.html' 
					  }
				  )
				  
				.when('/locations/:id', 
					  { 
						controller: 'locationEditController', 
						templateUrl: './packages/partial/locations/location_edit.html' 
					  }
				  )
				  
				.when('/location_detail/:id', 
					  { 
						controller: 'locationDetailController', 
						templateUrl: './packages/partial/locations/location_detail.html' 
					  }
				  )
				
				
});


location.factory('locationdata', function($http) {

	return {
			getLocations: function() { 

		   	                 return  $http.get("http://devtest.websurfer.com.np/sharad/fiber-track2/public/api/locations"); 
							 
		   	             },
			getLocation: function(id) { 
						console.log(id);
		   	                 return $http({
									method: 'GET',
									url: 'http://devtest.websurfer.com.np/sharad/fiber-track2/public/api/location/'+id+'/edit',									
									
								});
		   	             },
			
			addLocation: function addLocation(data) { 
						console.log(data);													
							
							return	$http.post('http://devtest.websurfer.com.np/sharad/fiber-track2/public/api/location',data); 
								
		   	             },
			editLocation: function editLocation(data) { 
						console.log(data);														
							return	$http({
									method: 'PUT',
									url: "http://devtest.websurfer.com.np/sharad/fiber-track2/public/api/location/"+data.id+"/edit",
									data: data,
									headers: {
									//'x-access-token':$cookieStore.get('token'),
									'Content-Type': 'application/x-www-form-urlencoded;'
									}
								});
						
		   	             },
			removeLocation: function(id) { 

							 return $http.delete('http://devtest.websurfer.com.np/sharad/fiber-track2/public/api/location/'+id); 
		   	             },
		
       }



});


location.controller('locationController', function ($scope,$rootScope,$location,locationdata) {


				locationdata.getlocations().success(function(data) {									
									
									$scope.locations = data;
									$rootScope.locations=$scope.locations;									
									
									console.log($scope.locations);
									
									$scope.sort = function(keyname){
										$scope.sortKey = keyname;   //set the sortKey to the param passed
										$scope.reverse = !$scope.reverse; //if true make it false and vice versa
									};
									
									$scope.currentPage = 1; //current page
									$scope.maxSize =2; //pagination max size
									$scope.entryLimit = 5; //max rows for data table
									
									$scope.noOfPages = Math.ceil($scope.locations.length/$scope.entryLimit);
									$scope.setPage = function(pageNo) {
										$scope.currentPage = pageNo;
									};
									
									
									$scope.filter = function() {
										$timeout(function() { //wait for 'filtered' to be changed
											$scope.noOfPages = Math.ceil($scope.filtered.length/$scope.entryLimit);
										}, 10);
									};
									
						});
						
						
						
					$scope.newlocation = {};
					 
					$scope.addlocation = function () {
					
						
						 var dataObject = $scope.newlocation;
						
						locationdata.addlocation(dataObject).success(locationAddSuccess).error(locationAddError);
						
					
					};
								
					
					function locationAddSuccess(data) {
					console.log(data);
					$scope.error = null;
					$scope.locations.push(data);					
					console.log($scope.locations);
					$scope.newlocation = {};
					 $location.path('/locations');

					}
				 
					function locationAddError(data) {
					
					$scope.error = "Unable to add location";
						
					}
					
					
					 $scope.removelocation = function(id) {
   
								if (confirm('Do you really want to remove this user?')) {
										
										locationdata.removelocation(id).success(function (data) {
																		
																		 for (i in $scope.locations) {
																				if ($scope.locations[i].id == id) {
																					$scope.locations.splice(i, 1);
																				}
																			}
																			
																	  });
								
								}
							}
    
});


location.controller('locationEditController', function ($scope,$filter,$rootScope,$routeParams,$location,locationdata) {

		console.log($rootScope.locations);

			var location_id=$routeParams.id;
			 console.log(location_id);
			$scope.locationdata = $filter('getById')($rootScope.locations,location_id);
			
					 console.log($scope.locationdata);
					$scope.updatelocation = function () {
					
						console.log($scope.locationdata);
						
						var dataObject = {id :$routeParams.id,name: $scope.locationdata.name,hexcode: $scope.locationdata.hexcode};
						
						locationdata.editlocation(dataObject).success(locationEditSuccess).error(locationEditError);
						
					};
					
					
					function locationEditSuccess(data) {
					
					console.log(data);

					}
				 
					function locationEditError(data) {
					console.log(data);
					
					$scope.error = "Unable to edit User";
						
					}
					
				
});


location.controller('locationDetailController', function ($scope,$routeParams,locationdata) {
			
			var location_id=$routeParams.id;
			
					locationdata.getlocation(location_id).success(locationDetailSuccess).error(locationDetailError);
					
					function locationDetailSuccess(data) {
					$scope.viewlocation = data;
					}
				 
					function locationDetailError(data) {
					
					$scope.error = "Unable to show user details.";
						
					}
					
				
});











