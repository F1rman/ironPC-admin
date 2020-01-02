(function () {
    'use strict';
    var storage = window.localStorage;
  // storage.removeItem() // Pass a key name to remove that key from storage.
  // storage.setItem('key',val );
  // storage.setItem('passlvl',16);
  console.log(storage);
  var app =  angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
    app.controller('global', function($scope) {
      $scope.storage  = storage;
      $scope.check_stor = function() {
   storage.getItem('all_orders')?$scope.all_orders=JSON.parse(storage.getItem('all_orders')):$scope.all_orders = new Array();
   window.all_orders = $scope.all_orders;
   console.log($scope.all_orders);
 }
 $scope.check_stor()
console.log($scope.all_orders);
  $scope.addItem = function () {
      $scope.all_orders.push({
        client_name:$scope.all_orders.client_name,
        act:$scope.all_orders.act,
        phone:$scope.all_orders.phone,
        type:$scope.all_orders.type,
        imei:$scope.all_orders.imei,
        brend:$scope.all_orders.brend,
        model:$scope.all_orders.model,
        komplect:$scope.all_orders.komplect,
        stan: $scope.all_orders.stan,
        error:$scope.all_orders.error,
        comment:$scope.all_orders.comment,
        cost:$scope.all_orders.cost,
        terminivo:$scope.all_orders.terminivo,
        prepay:$scope.all_orders.prepay,
      }
      );
      refresh_stor($scope.all_orders);
  }
  $scope.removeItem = function (x) {
      $scope.errortext = "";
      $scope.orders.splice(x, 1);
  }
});
function refresh_stor(a) {
   storage.setItem('all_orders', JSON.stringify(a));
 }
})();
