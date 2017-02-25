angular.module('UserService', []).factory('UserService', ['$http', function($http) {

    return {
        // getHospital : function(id) {
        //     return $http.get('/getPlan/' + id );
        // },
        saveUser: function(userObj) {
                return $http.post('/submit', userObj);
            }
    } ; 
   
}]);