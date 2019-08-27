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
        img.style.visibility = 'hidden';

        // `<i class="fas fa-circle-notch fa-spin" style="color:#FFF"></i>`
        var loader = document.createElement('i');
        loader.classList.add('fas');
        loader.classList.add('fa-circle-notch');
        loader.classList.add('fa-spin');
        loader.style.color = '#FFF';
        loader.style.position = 'absolute';
        loader.style.top = '5px';
        loader.style.left = '5px';
        img.parentNode.appendChild(loader);
        
        img.onload = function() {
          loader.remove();
          img.style.visibility = 'visible';
        };
        img.onerror = function() {
          img.src = 'assets/img/coming-soon.png';
          loader.remove();
          img.style.visibility = 'visible';
        };
      },
    };
  });