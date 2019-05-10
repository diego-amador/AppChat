angular.module('AppChat').controller('ChatSettingCtrl', ['$stateParams', '$state', '$http', '$log', '$scope','$rootScope', '$location',
    function($stateParams, $state, $http, $log, $scope, $rootScope, $location) {
        var thisCtrl = this;
        var cc = -1;

        var newChId = "";
        var msg = "";
        var contactsInChatList = [];

        this.contactsList = [];
        this.chId = "";
        this.messageList = [];
        this.counter  = 2;
        this.newText = "";
        $rootScope.prueba = "";


        this.loadContactsInChat = function(){
            // Get the messages from the server through the rest api


            // First set up the url for the route
            var url = "http://127.0.0.1:5000/kheApp/chats/" +$stateParams.id + "/members";

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.messageList = response.data.members;
                    thisCtrl.chId = $stateParams.id
                    //alert(thisCtrl.messageList)
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
                else if (status == 400){
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


            $log.error("Contacts Loaded: ", JSON.stringify(thisCtrl.messageList));
        };


        this.removeUser = function(cid){
            //msg = thisCtrl.newText; //not necessary
            //POST MESSAGE QUERY WITH (userID)

            //MSG ID MUST BE TAKEN FROM QUERY RESPONSE
            //var newMsgId="";


        var data = {};
        data.cid = cid; //contact id

        alert("cid: " +data.cid)

        // Now create the url with the route to talk with the rest API
        var reqURL = "http://127.0.0.1:5000/kheApp/chats/" +$stateParams.id + "/members/" + cid;
        console.log("reqURL: " + reqURL);



        $http.delete(reqURL, data).then(
                // Success function
                function (response) {
                    console.log(JSON.stringify(response.data));
                    //newChId = response.data.Chat.chid
                    alert("deleted member"); //for debugging purposes
                    $location.url('/home/' +$stateParams.id);

                },function (response) {
                    var status = response.status;
                    if (status == 0) {
                        alert("No hay conexion a Internet");
                    }
                    else if (status == 400) {
                    alert("No puede remover usuarios si no eres admin.");
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

            thisCtrl.newText = "";
        };



        this.loadContacts = function(){
            // Get the messages from the server through the rest api


            // First set up the url for the route
            var url = "http://127.0.0.1:5000/kheApp/contacts";

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.contactsList = response.data.Contact;
                    //thisCtrl.chId = $stateParams.id
                    //alert(thisCtrl.messageList)
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
                else if (status == 400){
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


            $log.error("Contacts Loaded: ", JSON.stringify(thisCtrl.messageList));
        };


        this.addUser = function(cid){
            //msg = thisCtrl.newText; //not necessary
            //POST MESSAGE QUERY WITH (userID)

            //MSG ID MUST BE TAKEN FROM QUERY RESPONSE
            //var newMsgId="";


        var data = {};
        data.cid = cid; //contact id

        alert("cid: " +data.cid)


            var config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8;'
                    //'Content-Type': 'application/x-www-form-urlencoded;'

                }
            }

        // Now create the url with the route to talk with the rest API
        var reqURL = "http://127.0.0.1:5000/kheApp/chats/" +$stateParams.id + "/members";
        console.log("reqURL: " + reqURL);



        $http.post(reqURL, data, config).then(
                // Success function
                function (response) {
                    console.log(JSON.stringify(response.data));
                    //newChId = response.data.Chat.chid
                    alert("added member"); //for debugging purposes
                    $location.url('/chat/' +$stateParams.id);

                },function (response) {
                    var status = response.status;
                    if (status == 0) {
                        alert("No hay conexion a Internet");
                    }
                    else if (status == 400) {
                    alert("No puede remover usuarios si no eres admin.");
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

            thisCtrl.newText = "";
        };



        this.removeChat = function(){
            //msg = thisCtrl.newText; //not necessary
            //POST MESSAGE QUERY WITH (userID)

            //MSG ID MUST BE TAKEN FROM QUERY RESPONSE
            //var newMsgId="";


        //var data = {};
        //data.cid = cid; //contact id

        //alert("cid: " +data.cid)

        // Now create the url with the route to talk with the rest API
        var reqURL = "http://127.0.0.1:5000/kheApp/chats/" +$stateParams.id ;
        console.log("reqURL: " + reqURL);



        $http.delete(reqURL).then(
                // Success function
                function (response) {
                    console.log(JSON.stringify(response.data));
                    //newChId = response.data.Chat.chid
                    alert("Chat deleted"); //for debugging purposes
                    $location.url('/home/-1');

                },function (response) {
                    var status = response.status;
                    if (status == 0) {
                        alert("No hay conexion a Internet");
                    }
                    else if (status == 400) {
                    alert("No puede remover usuarios si no eres admin.");
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

            thisCtrl.newText = "";
        };

        this.loadContactsInChat();
        this.loadContacts();



}]);
