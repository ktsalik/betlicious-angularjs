angular
  .module('BetliciousApp', [
    'ngRoute',
  ]).config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'assets/templates/lobby-view.html',
        })
        .when('/play/:gameId', {
          templateUrl: 'assets/templates/game-view.html',
          controller: 'GameController',
          controllerAs: 'vm',
        });
    }
  ]);