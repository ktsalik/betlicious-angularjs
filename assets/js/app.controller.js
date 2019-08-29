angular
  .module('BetliciousApp')
  .controller('AppController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    var vm = this;

    vm.view = {
      category: null,
      theme: null,
      themeShowCount: 10,
      search: {
        value: '',
      },
      filter: {
        type: 'categories',
      },
    };

    vm.data = [];
    vm.games = [];
    vm.categories = [];
    vm.themes = [];
    
    vm._data = [];
    $http.get('games').then(function(response) {
      vm.data = response.data;
      window.data = response.data; // TODO: remove on production
      vm.games = vm.data.slice(0, 12);
      vm._data = response.data;
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
    
    $http.get('themes').then(function (response) {
      vm.themes = response.data;
      vm.themes.sort(function (a, b) {
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
        vm.data = vm._data;
      } else {
        vm.category = categoryId;
        vm.data = vm._data.filter(function(game) {
          return game.categories.indexOf(categoryId) > -1;
        });
      }
      vm.games = vm.data.slice(0, 12);
      vm.view.search.value = '';
      vm.theme = null;
    };

    vm.search = function(value) {
      $scope.$apply(function() {
        if (!value.trim().length) {
          vm.data = vm._data;
        } else {
          vm.data = vm._data.filter(function(game) {
            return game.title.toLowerCase().indexOf(value.toLowerCase()) > -1;
          });
          vm.category = null;
          vm.theme = null;
        }
        vm.games = vm.data.slice(0, 12);
      });
    };

    vm.chooseTheme = function (themeId) {
      if (vm.theme == themeId) {
        vm.theme = null;
        vm.data = vm._data;
      } else {
        vm.theme = themeId;
        vm.data = vm._data.filter(function (game) {
          return game.themes.indexOf(themeId) > -1;
        });
      }
      vm.games = vm.data.slice(0, 12);
      vm.view.search.value = '';
      vm.category = null;
    };
  }]);