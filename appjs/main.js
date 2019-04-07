(function() {

    var app = angular.module('AppChat',['ui.router']);

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $location) {
        $stateProvider.state('/login', {
            templateUrl: 'pages/login.html',
            controller: 'LoginController',
            controllerAs : 'logingCtrl'
        }).state('messages', {
            url: '/home',
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
        $urlRouterProvider.otherwise('/home')
    }]);

})();
