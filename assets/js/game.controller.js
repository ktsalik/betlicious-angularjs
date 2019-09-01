angular
  .module('BetliciousApp')
  .controller('GameController', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {
    var vm = this;

    vm.view = {
      name: '',
      background: null,
      backgroundLoaded: false,
      moreGamesSelector: '',
      moreGamesSelectorType: '',
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

    var categorySelected = $scope.$parent.vm.category;
    var themeSelected = $scope.$parent.vm.theme;
    if (categorySelected) {
      vm.games = $scope.$parent.vm._data
        .filter(g => g.categories.indexOf(categorySelected) > -1)
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
      vm.view.moreGamesSelector = $scope.$parent.vm.categories.find(c => c.id == categorySelected).title; // lobby selected category
      vm.moreGamesSelectorType = 'category';
    } else if (themeSelected) {
      vm.games = $scope.$parent.vm._data
        .filter(g => g.themes.indexOf(themeSelected) > -1)
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
      vm.view.moreGamesSelector = $scope.$parent.vm.themes.find(c => c.id == themeSelected).title; // lobby selected theme
      vm.moreGamesSelectorType = 'theme';
    } else if ($scope.$parent.vm._data.length) {
      var provider = $scope.$parent.vm._data.find(g => g.title == $routeParams.gameId).provider; // current (playing) game provider
      vm.view.moreGamesSelector = provider;
      vm.games = $scope.$parent.vm._data
        .filter(g => g.provider == provider)
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
    }

    vm.play = function(game) {
      $location.path('play/' + game.title);
    };
  }]);