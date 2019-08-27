angular
  .module('BetliciousApp')
  .controller('AppController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    var vm = this;

    vm.view = {
      category: null,
    };

    vm.data = [];
    vm.games = [];
    vm.categories = [];
    
    var data = [];
    $http.get('games').then(function(response) {
      vm.data = response.data;
      window.data = response.data; // TODO: remove on production
      vm.games = vm.data.slice(0, 12);
      data = response.data;
    });

    $http.get('categories').then(function(response) {
      vm.categories = response.data;
      vm.categories.sort(function(a, b) {
        if (a.title > b.title) {
          return 1;
        } else {
          return -1;
        }
      })
    });

    vm.play = function(game) {
      $location.path('play/' + game.title);
    };

    vm.loadMore = function() {
      if (vm.games.length < vm.data.length) {
        vm.games = vm.games.concat(vm.data.slice(vm.games.length, vm.games.length + 12));
      }
    };

    vm.chooseCategory = function(categoryId) {
      if (vm.category == categoryId) {
        vm.category = null;
        vm.data = data;
      } else {
        vm.category = categoryId;
        vm.data = data.filter(function(game) {
          return game.categories.indexOf(categoryId) > -1;
        });
      }
      vm.games = vm.data.slice(0, 12);
      document.querySelector('.search-bar input').value = ''; // FIXME: temporary hack to prevent injecting a model to search-bar component for now...
    };

    vm.search = function(value) {
      $scope.$apply(function() {
        if (!value.trim().length) {
          vm.data = data;
        } else {
          vm.data = data.filter(function (game) {
            return game.title.toLowerCase().indexOf(value.toLowerCase()) > -1;
          });
        }
        vm.games = vm.data.slice(0, 12);
      });
    };
  }]);