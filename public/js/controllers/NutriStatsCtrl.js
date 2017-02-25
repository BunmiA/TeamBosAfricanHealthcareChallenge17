angular.module('NutriStatsCtrl', []).controller('NutriStatsController',function($scope,$http,$interval,NutriStatsService) {

$scope.getNutriStats =  function () {
 	console.log("searching for NutriStats for ",userId )
  NutriStatsService.getNutriStats($scope.userId).then(function(response) {
    	console.log(response);
        $scope.NutriStats = response.data;
        console.log($scope.NutriStats);
    });
};

$scope.getNutriStats =  function () {
 	console.log("getting NutriStats")
  NutriStatsService.getNutriStats().then(function(response) {
    	console.log(response.data);
        $scope.userObj = response.data;
        console.log($scope.userObj);
    });
};

$scope.getNutriStats();

 // $scope.userId =1;

 // $scope.userObj = {
 // 	Name:'Simi',
 // 	Number: '092083908e',
 // 	Age:'',
 // 	Aim:'',
 // 	Condition:'',
 // 	DailyMessage:'You need more fish for better hair',
 // 	labels: ['VitA','VitB','Iodine','Iron','Zinc'],
 // 	data: [10,89, 600,700,150]
 //  };

 $scope.chartOptions= {
 legend: {
            display: true,
            position:'right'
        }
};


});
