angular.module('AppChat').controller('LoginCtrl', ['$stateParams', '$state', '$http', '$log', '$scope','$rootScope', '$location','$localStorage',
    

function($stateParams, $state, $http, $log, $scope, $rootScope, $location,$localStorage) {
        var thisCtrl = this

        var email = "";

        var password = "";

        var id = "";

        var user_name = "";




        var loggedIn = "FALSE";
          
        

        this.login = function(){
        var data = {};
        data.email = this.email;
        data.password = this.password;

        // Now create the url with the route to talk with the rest API
        var reqURL = "http://localhost:5000/kheApp/login";
        console.log("reqURL: " + reqURL);

        var config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8;'
                    //'Content-Type': 'application/x-www-form-urlencoded;'

                }
        }

        $http.post(reqURL, data, config).then(
                // Success function
                function (response) {
                    console.log(JSON.stringify(response.data));
                    // tira un mensaje en un alert
                    this.id = response.data.id
                    this.user_name = response.data.user_name
                    this.loggedIn = "TRUE"
                   
                   //LOCAL STORAGE SAVING
                    $localStorage.id=this.id = response.data.id
                   $localStorage.user_name= response.data.user_name

                    alert("Logged in as: " + this.user_name);
                    $location.url('/home/-1');
                },function (response) {
                    // This is the error function
                    // If we get here, some error occurred.
                    // Verify which was the cause and show an alert.
                    var status = response.status;
                    //console.log("Error: " + reqURL);
                    //alert("Cristo");
                    if (status == 0) {
                        alert("No hay conexion a Internet");
                    }
                    else if (status == 401) {
                        alert("Su sesion expiro. Conectese de nuevo.");
                    }
                    else if (status == 403) {
                        alert("No esta autorizado a usar el sistema.");
                    }
                    else if (status == 404) {
                        alert("No se encontro la informacion solicitada.");
                    }
                    else {
                        alert("Error interno del sistema.");
                    }
                }
            );

//                var obj = {
//                            'email': this.email, 'password': this.password
//                        };
//                        $http({
//                                method: 'POST',
//                                url: 'http://localhost:5000/kheApp/login',
//                                data: JSON.stringify(obj),
//                                xhrFields: { withCredentials: true },
//                                headers: { 'Content-Type': 'application/json;charset=utf-8' }
//                            })
//                            .success(function(data, status, headers, config) {
//
////                                authService.setCookieData(data);
////                                $location.path('/profile');
////                                $scope.isAuthenticated =true;
//                    }
        };

}]);