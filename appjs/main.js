(function() {

    var app = angular.module('AppChat',['ui.router']);

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $location) {
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
                controller: 'RegisterCtrl',
                controllerAs : 'registerCtrl',
                }
            }
        }).state('messages', {
            url: '/home/:id',
            views: {
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

        });
        $urlRouterProvider.otherwise('/login')
    }]);

})();
