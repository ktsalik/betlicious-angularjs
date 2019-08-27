angular
  .module('BetliciousApp')
  .controller('AppController', ['$scope', '$http', function($scope, $http) {
    var vm = this;

    vm.foo = 'bar';

    vm.data = [];
    $http.get('data').then(function(response) {
      vm.data = response.data;
      window.data = response.data; // TODO: remove on production
    });
  }]);