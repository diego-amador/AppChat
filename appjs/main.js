(function() {

    var app = angular.module('AppChat',['ui.router','ngStorage']);

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

})();
