angular
  .module('BetliciousApp')
  .controller('GameController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    var vm = this;

    vm.view = {
      name: '',
      background: null,
      backgroundLoaded: false,
    };

    $http.get('games/' + encodeURI($routeParams.gameId.trim())).then(function(response) {
      vm.view.name = response.data.name;

      var backgroundImg = new Image();
      var bg = backgroundImg;
      bg.src = response.data.background;
      bg.onload = function() {
        $scope.$apply(function() {
          vm.view.backgroundLoaded = true;
          vm.view.background = bg.src;
        });
      };
      bg.onerror = function() {
        $scope.$apply(function() {
          vm.view.backgroundLoaded = true;
        });
      };
    });
  }]);