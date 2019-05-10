angular.module('AppChat').controller('RegCtrl', ['$stateParams', '$state', '$http', '$log', '$scope','$rootScope', '$location',
    function($stateParams, $state, $http, $log, $scope, $rootScope, $location) {
        var thisCtrl = this

        var firstname = "";

        var lastname = "";

        var username = "";

        var email = "";

        var phonenumber = "";

        var password = "";

        //var id = "";


        this.reg = function(){
        var data = {};
        data.firstname = this.firstname;
        data.lastname = this.lastname;
        data.username = this.username;
        data.email = this.email;
        data.phonenumber = this.phonenumber;
        data.password = this.password;

        // Now create the url with the route to talk with the rest API
        var reqURL = "http://localhost:5000/kheApp/register";
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
                    //this.id = response.data.id
                    //this.user_name = response.data.user_name
                    alert("Registration successful! Please log in now.");
                    $location.url('/login');
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
                        alert("Email o numero de telefono ya existe.");
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