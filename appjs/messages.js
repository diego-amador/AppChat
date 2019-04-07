angular.module('AppChat').controller('MessageCtrl', ['$stateParams', '$state', '$http', '$log', '$scope','$rootScope', '$location',
    function($stateParams, $state, $http, $log, $scope, $rootScope, $location) {
        var thisCtrl = this;

        this.messageList = [];
        this.counter  = 2;
        this.newText = "";
        $rootScope.prueba = "";
        this.loadMessages = function(){
            // Get the messages from the server through the rest api
          

            // First set up the url for the route
            var url = "http://127.0.0.1:5000/kheApp/messages/"+$stateParams.id;

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.messageList = response.data.Messages;
                    $rootScope.prueba = "Probando";
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

            
            $log.error("Message Loaded: ", JSON.stringify(thisCtrl.messageList));
        };

        this.postMsg = function(){
            var msg = thisCtrl.newText;
            // Need to figure out who I am
            var author = "Me";
            var nextId = thisCtrl.counter++;
            thisCtrl.messageList.unshift({"id": nextId, "text" : msg, "author" : author, "like" : 0, "nolike" : 0});
            thisCtrl.newText = "";
        };



        
        

        this.loadMessages();
}]);
