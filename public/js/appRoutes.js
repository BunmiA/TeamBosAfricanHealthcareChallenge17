angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

       // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HospitalController'
        })
        // home page
        .when('/hospital', {
            templateUrl: 'views/hospital.html',
            controller: 'HospitalController'
        });

    $locationProvider.html5Mode(true);

}]);