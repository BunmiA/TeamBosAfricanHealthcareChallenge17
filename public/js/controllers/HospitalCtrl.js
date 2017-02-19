angular.module('HospitalCtrl', []).controller('HospitalController',function($scope,$http,$interval,HospitalService) {

$scope.getHospital =  function () {
 	console.log("searching for hospital")
  HospitalService.getHospital($scope.hospitalId).then(function(response) {
    	console.log(response);
        $scope.hospital = response.data;
        console.log($scope.hospital);

    });
};

$scope.hospitalId =1;

});
