angular.module('NutriStatsService', []).factory('NutriStatsService', ['$http', function($http) {

    return {
        getNutriStats : function(id) {
            return $http.get('/getNutriStats/' + id );
        }
    } ; 
   
}]);