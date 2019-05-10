angular.module('AppChat').controller('MessageCtrl', ['$stateParams', '$state', '$http', '$log', '$scope','$rootScope', '$location','$localStorage', 
    function($stateParams, $state, $http, $log, $scope, $rootScope, $location,$localStorage) {
        var thisCtrl = this;
       
       //User Parameters loaded from local storage
        var userID=$localStorage.id;
        var author =$localStorage.user_name;

        this.isMember = "";
        this.messageList = [];
        this.counter  = 2;
        this.newText = "";
        this.chatId = $stateParams.id;
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
                    thisCtrl.isMember = 1;
                    thisCtrl.chatId = $stateParams.id;
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
                    thisCtrl.isMember = -1;
                    alert("No esta autorizado al chat." + this.isMember);
                }
                else if (status == 404){
                    //alert("No se encontro la informacion solicitada."); //esta tecatiao pero sirve
                }
                else {
                    alert("Error interno del sistema.");
                }
            });

            
            $log.error("Message Loaded: ", JSON.stringify(thisCtrl.messageList));
        };
        //Function for getting hashtags from message sent
        this.getHashTags = function (inputText) {  
            var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
            var matches = [];
            var match;
        
            while ((match = regex.exec(inputText))) {
                matches.push(match[1]);
            }
        
            return matches;
        }
        this.postMsg = function(){
            var msg = thisCtrl.newText;
            //POST MESSAGE QUERY WITH (userID)
            //MSG ID MUST BE TAKEN FROM QUERY RESPONCE 
            var newMsgId=0 ;

            var nextId = thisCtrl.counter++;
            thisCtrl.messageList.unshift({"id": nextId, "text" : msg, "author" : author, "like" : 0, "nolike" : 0});
            

            //Check Message for Hashtags
          var  hashtagList =[]
          hashtagList=this.getHashTags(msg);

          if(hashtagList.length>0)
          
          for( tag in hashtagList)

          {
              //REPLACE WITH QUERY TO HANLE HASHTAG POSTING
                console.log("Send to DB : " + hashtagList[tag]+ " in message: " + newMsgId);
          }
          
        

          //Clear text box  To complete service//
          thisCtrl.newText = "";
        };



            //Controller Function to add a dislike to a message
            this.dislike = function(id){


        
                console.log(id + " is the DB ID of the message DISLIKED by : "+userID)
             };
              //Controller Function to add a like to a message
         this.like = function(id){
               
                
            console.log(id + " is the DB ID of the message LIKED by : "+userID)
                 };


        
        

        this.loadMessages();
}]);
