angular.module('AppChat').controller('LogoutCtrl', ['$http', '$log', '$scope','$rootScope', '$location','$localStorage',
    function($http, $log, $scope, $rootScope, $location,$localStorage) {
        var thisCtrl = this;

        //this.messageList = [];
        //this.counter  = 2;
        this.login = "TRUE";
        $rootScope.prueba = "";
        this.logout = function(){
            // Get the messages from the server through the rest api


            // First set up the url for the route
            var url = "http://127.0.0.1:5000/kheApp/logout";

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.post(url).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));
          //DELETE LOCAL STORAGE INFORMATION
        $localStorage.$reset();
                    this.login = "FALSE";
                    alert("Logged out");
                    $location.url('/login');
            }, // error callback
            function (response){
                // This is the error function
                // If we get here, some error occurred.
                // Verify which was the cause and show an alert.
                console.log("Err response: " + JSON.stringify(response));

                var status = response.status;
                if (status == 0){
                    alert("No hay conexion a Internet");
                }
                else if (status == 401){
                    alert("Su sesion expiro. Conectese de nuevo.");
                }
                else if (status == 403){
                    alert("No esta autorizado a usar el sistema.");
                }
                else if (status == 404){
                    alert("No se encontro la informacion solicitada.");
                }
                else {
                    alert("Error interno del sistema.");
                }
            });
        };

}]);
