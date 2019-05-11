(function() {

    var app = angular.module('AppChat',['ngFileUpload', 'ui.router','ngStorage']);

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $location,$localStorage) {
        $stateProvider.state('/login', {
            url: '/login',
            views: {
            'login':{
                templateUrl: 'pages/login.html',
                controller: 'LoginCtrl',
                controllerAs : 'loginCtrl',
                }
            }
        }).state('register', {
            url: '/register',
            views: {
            'register':{
                templateUrl: 'pages/registr.html',
                controller: 'RegCtrl',
                controllerAs : 'regCtrl',
                }
            }
        }).state('messages', {
            url: '/home/:id',
            views: {
                'logout':{
                    templateUrl: 'pages/logout.html',
                    controller: 'LogoutCtrl',
                    controllerAs : 'logoutCtrl',
                },
                'chats':{
                    templateUrl: 'pages/chats.html',
                    controller: 'ChatCtrl',
                    controllerAs : 'ChatCtrl',
                },
                'messages':{
                    templateUrl: 'pages/messages.html',
                    controller: 'MessageCtrl',
                    controllerAs : 'MessageCtrl',
                }
            }

        }).state('manageChats', {
            url: '/chat/:id',
            views: {
                'logout':{
                    templateUrl: 'pages/logout.html',
                    controller: 'LogoutCtrl',
                    controllerAs : 'logoutCtrl',
                },
                'chats':{
                    templateUrl: 'pages/chats.html',
                    controller: 'ChatCtrl',
                    controllerAs : 'ChatCtrl',
                },
                'manageCh':{
                    templateUrl: 'pages/manageChats.html',
                    controller: 'ChatSettingCtrl',
                    controllerAs : 'ChatSettingCtrl',
                }
            }
        }).state('addMembers', {
            url: '/chatMembers/:id',
            views: {
                'logout':{
                    templateUrl: 'pages/logout.html',
                    controller: 'LogoutCtrl',
                    controllerAs : 'logoutCtrl',
                },
                'chats':{
                    templateUrl: 'pages/chats.html',
                    controller: 'ChatCtrl',
                    controllerAs : 'ChatCtrl',
                },
                'addMember':{
                    templateUrl: 'pages/addMembers.html',
                    controller: 'ChatSettingCtrl',
                    controllerAs : 'ChatSettingCtrl',
                }
            }

        }).state('contacts', {
            url: '/contacts',
            views: {
                'logout':{
                    templateUrl: 'pages/logout.html',
                    controller: 'LogoutCtrl',
                    controllerAs : 'logoutCtrl',
                },
                'chats':{
                    templateUrl: 'pages/chats.html',
                    controller: 'ChatCtrl',
                    controllerAs : 'ChatCtrl',
                },
                'contacts':{
                    templateUrl: 'pages/contacts.html',
                    controller: 'ContactCtrl',
                    controllerAs : 'ContactCtrl',
                }
            }

        });
        $urlRouterProvider.otherwise('/login')
    }]);
    
    app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
        $scope.uploadFiles = function(file, errFiles) {
            console.log('File: ' + file);
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: {file: file}
                });
    
                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * 
                                             evt.loaded / evt.total));
                });
            }   
        }
    }]);
})();
