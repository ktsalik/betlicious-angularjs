angular
  .module('BetliciousApp')
  .directive('game', function() {
    return {
      scope: {
        thumbnail: '=',
        title: '=',
        provider: '=',
      },
      templateUrl: 'assets/templates/game-component.html',
      link: function(scope, element, attrs) {
        var img = element[0].querySelector('img');
        img.onerror = function() {
          img.src = 'assets/img/coming-soon.png';
        };
      },
    };
  });