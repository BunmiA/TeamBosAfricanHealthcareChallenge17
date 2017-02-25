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
        })
        .when('/registration', {
            templateUrl: 'views/registration.html',
            controller: 'UserController'
        });

    $locationProvider.html5Mode(true);

}]);