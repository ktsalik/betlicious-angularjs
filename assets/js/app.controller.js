angular
  .module('BetliciousApp')
  .controller('AppController', ['$scope', '$http', function($scope, $http) {
    var vm = this;

    vm.foo = 'bar';

    vm.data = [];
    $http.get('data').then(function(response) {
      vm.data = response.data;
      window.data = response.data; // TODO: remove on production
      vm.games = vm.data.slice(0, 12);
    });

    vm.games = [];

    vm.loadMore = function() {
      if (vm.games.length < vm.data.length) {
        vm.games = vm.games.concat(vm.data.slice(vm.games.length, vm.games.length + 12));
      }
    };
  }]);