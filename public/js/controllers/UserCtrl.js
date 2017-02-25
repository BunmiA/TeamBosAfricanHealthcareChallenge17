angular.module('UserCtrl', []).controller('UserController',function($scope,$http,$interval,$location,UserService) {


$scope.submituserInfo = function() {
	console.log($scope.userObj);
	UserService.saveUser($scope.userObj).then(function(response){
		$scope.status = 'Updated User';
		$scope.userObj = response.data;
		console.log('response is',response);
		console.log('response is currently', $scope.UserObj);
		refresh();
		// window.location = "regSucess.html";
		$location.url('/regSucess')
	},function(error) {
              // promise rejected, could log the error with: console.log('error', error);
              $scope.status = 'Unable to add Guest BYO: ' + error.message;
            });

	console.log($scope.status);
};

 $scope.conditions = [
     {id:1, name:'Diabetes'},
     {id:2, name:'Anaemia'}, 
     {id:3, name:'Heart Issues'},
     {id:4, name:'High Blood Pressure'},
     {id:5, name:'Mental Health Issues'},
     {id:6, name:'N/A'}
    ];

 $scope.aims = [
     {id:1, name:'Weight Loss'},
     {id:2, name:'Clearer Skin'},
     {id:3, name:'Longer/Thicker Hair'},
     {id:4, name:'Increased Energy Levels'}
    ];

var refresh =  function () {
 $scope.userObj = {
 	Name:'',
 	Number: '',
 	Age:'',
 	Aim:'',
 	Condition:''
  };
};

refresh();



});
