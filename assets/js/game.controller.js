angular
  .module('BetliciousApp')
  .controller('GameController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    var vm = this;

    vm.view = {
      name: '',
      background: null,
    };

    $http.get('games/' + $routeParams.gameId).then(function(response) {
      vm.view.name = response.data.name;
      vm.view.background = response.data.background;
    });
  }]);