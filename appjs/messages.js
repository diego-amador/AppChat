angular.module('AppChat').controller('MessageCtrl', ['$stateParams', '$state', '$http', '$log', '$scope','$rootScope', '$location','$localStorage', 
    function($stateParams, $state, $http, $log, $scope, $rootScope, $location,$localStorage) {
        var thisCtrl = this;
       
       //User Parameters loaded from local storage
        var userID=$localStorage.id;
        var author =$localStorage.user_name;

        var newMsgId="";
        var msg = ""; //not necessary

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
            msg = thisCtrl.newText; //not necessary
            //POST MESSAGE QUERY WITH (userID)

            //MSG ID MUST BE TAKEN FROM QUERY RESPONSE
            //var newMsgId="";


        var data = {};
        data.message = this.newText; //text in textbox

        // Now create the url with the route to talk with the rest API
        var reqURL = "http://127.0.0.1:5000/kheApp/messages/"+this.chatId;
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
                    newMsgId = response.data.id
                    //this.user_name = response.data.user_name
                    //this.loggedIn = "TRUE"

                   //LOCAL STORAGE SAVING
                   //$localStorage.id=this.id = response.data.id
                   //$localStorage.user_name= response.data.user_name

                    alert("msg id: " + newMsgId); //for debugging purposes
                    thisCtrl.cycleHashtags();
                    //$location.url('/home/-1');
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



            var nextId = thisCtrl.counter++;
            thisCtrl.messageList.unshift({"id": nextId, "text" : msg, "author" : author, "like" : 0, "nolike" : 0});

                  //Clear text box  To complete service//
                  thisCtrl.newText = "";
                };

        this.cycleHashtags = function(){
          //Check Message for Hashtags
          var  hashtagList =[]
          hashtagList=thisCtrl.getHashTags(msg);
          //alert("hellloooooooo " +msg)

          if(hashtagList.length>0)
              for( tag in hashtagList)

              {
                  //alert("hashtag:" + hashtagList[tag] + " messageid:" + newMsgId)
                    thisCtrl.postHashtags(hashtagList[tag]);
              }
        }


        this.postHashtags = function(tag){
        var data = {};
                  data.hashtag = tag; //text in textbox
                  data.id = newMsgId;

                  // Now create the url with the route to talk with the rest API
                  var reqHASHURL = "http://127.0.0.1:5000/kheApp/hashtag"
                  console.log("reqURL: " + reqHASHURL);

                  var config = {
                          headers : {
                              'Content-Type': 'application/json;charset=utf-8;'
                              //'Content-Type': 'application/x-www-form-urlencoded;'

                          }
                  }

                  $http.post(reqHASHURL, data, config).then(
                          // Success function
                          function (response) {
                              console.log(JSON.stringify(response.data));
                              // tira un mensaje en un alert
                              //newMsgId = response.data.id
                              //this.user_name = response.data.user_name
                              //this.loggedIn = "TRUE"

                             //LOCAL STORAGE SAVING
                             //$localStorage.id=this.id = response.data.id
                             //$localStorage.user_name= response.data.user_name

                              alert("hashtag: " +data.hashtag + " " + "id: " + data.id); //for debugging purposes
                              //$location.url('/home/-1');
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
        }



        //Controller Function to add a dislike to a message
        this.dislike = function(id){

                console.log(id + " is the DB ID of the message DISLIKED by : "+userID)
             };

        //Controller Function to add a like to a message
        this.like = function(id){
               
                
            console.log(id + " is the DB ID of the message LIKED by : "+userID)
                 };


        
        

        this.loadMessages();


        /*
        var data = {};
                  data.hashtag = tag; //text in textbox
                  data.id = newMsgId;

                  // Now create the url with the route to talk with the rest API
                  var reqHASHURL = "http://127.0.0.1:5000/kheApp/hashtag
                  console.log("reqURL: " + reqHASHURL);

                  var config = {
                          headers : {
                              'Content-Type': 'application/json;charset=utf-8;'
                              //'Content-Type': 'application/x-www-form-urlencoded;'

                          }
                  }

                  $http.post(reqHASHURL, data, config).then(
                          // Success function
                          function (response) {
                              console.log(JSON.stringify(response.data));
                              // tira un mensaje en un alert
                              //newMsgId = response.data.id
                              //this.user_name = response.data.user_name
                              //this.loggedIn = "TRUE"

                             //LOCAL STORAGE SAVING
                             //$localStorage.id=this.id = response.data.id
                             //$localStorage.user_name= response.data.user_name

                              alert("hashtag added"); //for debugging purposes
                              //$location.url('/home/-1');
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
                  */
}]);
