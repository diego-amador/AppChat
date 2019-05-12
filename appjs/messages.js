angular.module('AppChat').controller('MessageCtrl', ['$stateParams', '$state', '$http', '$log', '$scope','$rootScope', '$location','$localStorage', '$firebaseStorage',  
    function($stateParams, $state, $http, $log, $scope, $rootScope, $location, $localStorage, $firebaseStorage) {
        var thisCtrl = this;
       

        
    
        
       //User Parameters loaded from local storage
        var userID=$localStorage.id;
        var author =$localStorage.user_name;

        var newMsgId="";
        var msg = ""; //not necessary
        this.newMsgId;
        this.isMember = "";
        this.messageList = $localStorage.messageList;
       
        this.messageList = [];
        this.repliesList = [];
        this.replies = [];
        this.counter  = 2;
        this.newText = "";
        this.newTextReply = "";
        this.chatId = $stateParams.id;
        var media = $localStorage.mediaURL;


        $rootScope.prueba = "";
        this.loadMessages = function(){
            // Get the messages from the server through the rest api
            // First set up the url for the route
            var url = "http://127.0.0.1:5000/kheApp/" + $localStorage.rngToken + "/messages/"+$stateParams.id;

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.

                    //console.log("response: " + JSON.stringify(response));
                    thisCtrl.isMember = 1;
                    thisCtrl.chatId = $stateParams.id;
                    thisCtrl.messageList = response.data.Messages;
                    $scope.checkbuttonsLike();
                    $scope.checkbuttonsDisLike();
                    $localStorage.messageList=thisCtrl.messageList;
                    //Need to check if this user has liked a message from the Message List 
                   
                   

                    $rootScope.prueba = "Probando";
            }, // error callback
            function (response){
                // This is the error function
                // If we get here, some error occurred.
                // Verify which was the cause and show an alert.
                //console.log("Err response: " + JSON.stringify(response));

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
        this.liked = function (mid)
        {
         
           
            angular.forEach($localStorage.messageList, function(value, key) {
                 if(value.message_id==mid)
                 {
                     
                 return value.liked;
                 }
                 
              });
            }
        $scope.checkbuttonsLike =function()

            {
                angular.forEach(thisCtrl.messageList, function(value, key) {
                    //onsole.log( JSON.stringify(value.message_id));
                    var url = "http://127.0.0.1:5000/kheApp/dev/messages/likers/"+JSON.stringify(value.message_id);

                    // Now set up the $http object
                    // It has two function call backs, one for success and one for error
                    $http.get(url).then(// success call back
                        function (response){

                        this.likedList=response.data.Likers;

                       
                        angular.forEach(this.likedList, function(valueMessage, key) {
                         if( valueMessage.cid==$localStorage.id)

                         {
                           
                           var messageDisableId= value.message_id;
                          // console.log("DISABLING BUTTON FOR MESSAGE :"+messageDisableId);
                           $scope.disableButtonLike(messageDisableId);
                           //console.log("parameter pass :"+$scope.disableButton(messageDisableId))

                         }
                          });



                        },
                         function (response){
            // This is the error function
            // If we get here, some error occurred.
            // Verify which was the cause and show an alert.
            console.log("LIKERS ERROR " + JSON.stringify(response));

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



                  });
                //Need to check if this user has disliked a message from the Message List 

            }
        
            $scope.checkbuttonsDisLike =function()

            {
                angular.forEach(thisCtrl.messageList, function(value, key) {
                    //onsole.log( JSON.stringify(value.message_id));
                    var url = "http://127.0.0.1:5000/kheApp/dev/messages/dislikers/"+JSON.stringify(value.message_id);
                       
                    // Now set up the $http object
                    // It has two function call backs, one for success and one for error
                    $http.get(url).then(// success call back
                        function (response){

                            
                                var dislikeList=response.data.Dislikers;
                       
                        angular.forEach(dislikeList, function(valueMessage, key) {

                            console.log("CRISTO");
                         if( valueMessage.cid==$localStorage.id)

                         {
                           
                           var messageDisableId= value.message_id;
                           console.log("DISABLING DISLIKE BUTTON FOR MESSAGE :"+ messageDisableId);
                           $scope.disableButtonDisLike(messageDisableId);
                           //console.log("parameter pass :"+$scope.disableButton(messageDisableId))

                         }
                          });



                        },
                         function (response){
            // This is the error function
            // If we get here, some error occurred.
            // Verify which was the cause and show an alert.
            console.log("LIKERS ERROR " + JSON.stringify(response));

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



                  });
                //Need to check if this user has disliked a message from the Message List 

            }



        this.postMsg = function(media){
            var msg = thisCtrl.newText;
            if(!msg && !media){ console.log('Nothing to post.'); } // If no message or media, don't do anything.
            else{
                var pic= '';
                var mediaType="n";


                if (media){
                    console.log('Media: ' + media.name);
                    pic = "media/group_pics/" + media.name; // Only files in this folder allowed for now.
                    if(media.name.includes(".jpg") ||
                        media.name.includes(".jpeg") ||
                            media.name.includes(".png")){
                                 mediaType="p";
                    }
                    else if(media.name.includes(".mp4") ||
                        media.name.includes(".mpeg") ||
                            media.name.includes(".avi")){
                                 mediaType="v";
                    }
                }
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date+' '+time;

                if(!media){
                    //alert($localStorage.mediaURL)
                    thisCtrl.upload();
                }else{
                    thisCtrl.firebaseUploadPost(dateTime, msg, mediaType, media);
                }


               }
        };  
        
        this.firebaseUploadPost = function(dateTime, msg, mediaType, media){
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var fileRef = storageRef.child(media.name);


            console.log("Let's upload a file!");

             var uploadTask = fileRef.put(media).then(snapshot => {
                   return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
               })

               .then(function(downloadURL) {
                  console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                  $localStorage.mediaURL = downloadURL;
                  media= $localStorage.mediaURL;
                 console.log(" MEDIA " +media);
                 thisCtrl.upload(dateTime, msg, mediaType, downloadURL);
                  return downloadURL;
               })

               .catch(error => {
                  // Use to signal error if something goes wrong.
                  console.log(`Failed to upload file and get link - ${error}`);
               });

    };

    this.upload = function(){
        msg = thisCtrl.newText; //not necessary
        //POST MESSAGE QUERY WITH (userID)

        //MSG ID MUST BE TAKEN FROM QUERY RESPONSE
        //var newMsgId="";


    var data = {};
    data.message = this.newText; //text in textbox
    data.media=$localStorage.mediaURL;
    //alert(data.media)
    // Now create the url with the route to talk with the rest API
    var reqURL = "http://127.0.0.1:5000/kheApp/" + $localStorage.rngToken + "/messages/"+this.chatId;
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
              newMsgId= response.data.id;
              $localStorage.newMsgId = response.data.id;
               alert("msg id: " + $localStorage.newMsgId); //for debugging purposes
                thisCtrl.cycleHashtags();
                $localStorage.mediaURL = "";

            thisCtrl.messageList.unshift({"message_id": newMsgId, "text" : msg, "author" : author, "likes" : 0, "dislikes" : 0});
           
        
        
        
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

        
       

        thisCtrl.newText = "";
       
    };


        this.postReply = function(replyMsgId){
        msg = thisCtrl.newTextReply; //not necessary
            //POST MESSAGE QUERY WITH (userID)

            //MSG ID MUST BE TAKEN FROM QUERY RESPONSE
            //var newMsgId="";


        var data = {};
        data.message = this.newTextReply; //text in textbox

        // Now create the url with the route to talk with the rest API
        var reqURL = "http://127.0.0.1:5000/kheApp/" + $localStorage.rngToken + "/messages/"+this.chatId+"/reply/"+replyMsgId;
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
                    newMsgId = response.data.id
                    alert("msg id: " + newMsgId); //for debugging purposes
                    thisCtrl.cycleHashtags();

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

            //var nextId = thisCtrl.counter++;
            //thisCtrl.messageList.unshift({"id": nextId, "text" : msg, "author" : author, "like" : 0, "nolike" : 0});

            thisCtrl.newTextReply = "";
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

        $scope.disableButtonLike = function(mid)
        {
            angular.forEach($localStorage.messageList, function(value, key) {
                if(value.message_id==mid)
                {
                    value.liked=!(value.liked);
                    //console.log("CHANGED VALUE "+value.liked);


                }
              });

        }

        $scope.disableButtonDisLike = function(mid)
        {
            angular.forEach($localStorage.messageList, function(value, key) {
                if(value.message_id==mid)
                {
                    value.disliked=!(value.disliked);
                    console.log("CHANGED VALUE "+value.disliked);


                }
              });

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

//        this.loadReplies = function(){
//            // Get the messages from the server through the rest api
//            // First set up the url for the route
//            var url = "http://127.0.0.1:5000/kheApp/messages/replies";
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
//                    //thisCtrl.isMember = 1;
//                    //thisCtrl.chatId = $stateParams.id;
//                    thisCtrl.repliesList = response.data.Messages;
//                    //alert("heloooo");
//                    $rootScope.prueba = "Probando";
//                    thisCtrl.repliesIdOnly();
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
//                    //thisCtrl.isMember = -1;
//                    alert("No esta autorizado al chat." + this.isMember);
//                }
//                else if (status == 404){
//                    //alert("No se encontro la informacion solicitada."); //esta tecatiao pero sirve
//                }
//                else {
//                    alert("Error interno del sistema.");
//                }
//            });
//
//
//            $log.error("Replies Loaded: ", JSON.stringify(thisCtrl.messageList));
//        };

        //Controller Function to add a dislike to a message
        this.dislike = function(id){


            console.log(id + " is the DB ID of the message DISLIKED by : "+userID)

            var url = "http://127.0.0.1:5000/kheApp/" + $localStorage.rngToken + "/messages/dislike/"+id;

            
            $http.post(url).then(// success call back
                function (response){
               

                    console.log("response: " + JSON.stringify(response));
                    
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
                    //thisCtrl.isMember = -1;
                    alert("No esta autorizado al chat." + this.isMember);
                }
                else if (status == 404){
                    //alert("No se encontro la informacion solicitada."); //esta tecatiao pero sirve
                }
                else {
                    alert("Error interno del sistema.");
                }
            });


            $log.error("Replies Loaded: ", JSON.stringify(thisCtrl.messageList));
        };
        this.dislikeCheck =function(mid)
        {
            angular.forEach($localStorage.messageList, function(value, key) {
                if(value.message_id==mid)
                {
                   if( value.disliked==false || value.dislikes > 0)
                   {
                        value.dislikes=(value.dislikes-1);

                   }


                }
              });

        }

        this.likeCheck =function(mid)
        {
            angular.forEach($localStorage.messageList, function(value, key) {
                if(value.message_id==mid)
                {
                   if( value.liked==false || value.likes > 0)
                   {
                        value.likes=(value.likes-1);

                   }


                }
              });

        }
        //Controller Function to add a like to a message
        this.like = function(id){

            

            var url = "http://127.0.0.1:5000/kheApp/" + $localStorage.rngToken + "/messages/like/"+id;

            
            $http.post(url).then(// success call back
                function (response){
               

                    console.log("response: " + JSON.stringify(response));
                    
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
                    //thisCtrl.isMember = -1;
                    alert("No esta autorizado al chat." + this.isMember);
                }
                else if (status == 404){
                    //alert("No se encontro la informacion solicitada."); //esta tecatiao pero sirve
                }
                else {
                    alert("Error interno del sistema.");
                }
            });


            $log.error("Replies Loaded: ", JSON.stringify(thisCtrl.messageList));

        };

        this.repliesIdOnly = function(){
            //[].push.apply(thisCtrl.replies, thisCtrl.repliesList)
            //alert(thisCtrl.repliesList[r].reply)
            //alert(thisCtrl.replies)
        }

        this.loadMessages();
        //this.loadReplies();


}]);
