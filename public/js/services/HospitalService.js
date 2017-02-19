angular.module('HospitalService', []).factory('HospitalService', ['$http', function($http) {

    return {
        getHospital : function(id) {
            return $http.get('/getHospital/' + id );
        },
        savePatient: function(patientObj) {
                return $http.post('/savePatient', patientObj);
            },
    } ; 
   
}]);