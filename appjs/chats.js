angular.module('AppChat').controller('ChatCtrl', ['$stateParams', '$state', '$http', '$log', '$scope','$rootScope', '$location',
    function($stateParams, $state, $http, $log, $scope, $rootScope, $location) {
        var thisCtrl = this;
        var cc = -1;

        var newChId = "";
        var msg = "";
        contactsInChatList = [];

        this.messageList = [];
        this.counter  = 2;
        this.newText = "";
        $rootScope.prueba = "";
        this.loadMessages = function(){
            // Get the messages from the server through the rest api
          

            // First set up the url for the route
            var url = "http://127.0.0.1:5000/kheApp/chats";

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.messageList = response.data.Chat;
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

            
            $log.error("Chats Loaded: ", JSON.stringify(thisCtrl.messageList));
        };

        // this.postMsg = function(){
        //     var msg = thisCtrl.newText;
        //     // Need to figure out who I am
        //     var author = "Me";
        //     var nextId = thisCtrl.counter++;
        //     thisCtrl.messageList.unshift({"id": nextId, "text" : msg, "author" : author, "like" : 0, "nolike" : 0});
        //     thisCtrl.newText = "";
        // };



        this.loadMessages();

        this.sccf = function(){
        //alert("entre")
        if (createChat == -1){
            createChat = 1
            alert(createChat)
            }else{
            createChat = -1
            alert(createChat)
            }

        }


        this.createChat = function(){
            msg = thisCtrl.newText; //not necessary
            //POST MESSAGE QUERY WITH (userID)

            //MSG ID MUST BE TAKEN FROM QUERY RESPONSE
            //var newMsgId="";


        var data = {};
        data.chatname = this.newText; //text in textbox

        // Now create the url with the route to talk with the rest API
        var reqURL = "http://127.0.0.1:5000/kheApp/chats";
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
                    newChId = response.data.Chat.chid
                    alert("ch id: " + newChId); //for debugging purposes
                    $location.url('/home/' + newChId);

                },function (response) {
                    var status = response.status;
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
            var nextId = thisCtrl.counter++;
            thisCtrl.messageList.unshift({"id": newChId, "chname" : msg});

            thisCtrl.newText = "";
        };


//        this.loadContactsInChat = function(){
//            // Get the messages from the server through the rest api
//
//
//            // First set up the url for the route
//            var url = "http://127.0.0.1:5000/kheApp/chats/" +$stateParams.id + "/members";
//
//            // Now set up the $http object
//            // It has two function call backs, one for success and one for error
//            $http.get(url).then(// success call back
//                function (response){
//                // The is the sucess function!
//                // Copy the list of parts in the data variable
//                // into the list of parts in the controller.
//
//                    console.log("response: " + JSON.stringify(response));
//
//                    contactsInChatList = response.data.members;
//                    alert(contactsInChatList)
//                    $rootScope.prueba = "Probando";
//            }, // error callback
//            function (response){
//                // This is the error function
//                // If we get here, some error occurred.
//                // Verify which was the cause and show an alert.
//                console.log("Err response: " + JSON.stringify(response));
//
//                var status = response.status;
//                if (status == 0){
//                    alert("No hay conexion a Internet");
//                }
//                else if (status == 401){
//                    alert("Su sesion expiro. Conectese de nuevo.");
//                }
//                else if (status == 403){
//                    alert("No esta autorizado a usar el sistema.");
//                }
//                else if (status == 404){
//                    alert("No se encontro la informacion solicitada.");
//                }
//                else {
//                    alert("Error interno del sistema.");
//                }
//            });
//
//
//            $log.error("Contacts Loaded: ", JSON.stringify(contactsInChatList));
//        };



}]);
