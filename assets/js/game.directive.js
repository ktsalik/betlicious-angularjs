angular
  .module('BetliciousApp')
  .directive('game', function() {
    return {
      scope: {
        thumbnail: '=',
        ttitle: '=',
        provider: '=',
        features: '=',
      },
      templateUrl: 'assets/templates/game-component.html',
      link: function(scope, element, attrs) {
        scope.title = scope.ttitle; // TODO: find a better way to prevent default title-attribute behavior
        var img = element[0].querySelector('img');
        img.style.visibility = 'hidden';
        img.style.opacity = 0;

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
          img.style.transition = 'opacity 300ms';
          img.style.opacity = 1;
        };
        img.onerror = function() {
          img.src = 'assets/img/coming-soon.png';
          img.width = 150;
          loader.remove();
          img.style.visibility = 'visible';
          img.style.opacity = 1;
        };

        var overlayVisible = false;
        element[0].addEventListener('mouseover', function(e) {
          if (!e.target.parentNode.classList.contains('game-item') &&
            !e.target.parentNode.parentNode.classList.contains('game-item')) {
            return;
          }
          if (overlayVisible) {
            return;
          }
          element[0].querySelector('.overlay').style.display = 'initial';
          element[0].querySelector('.details').style.display = 'inline-flex';
          var detailsEl = element[0].querySelector('.details');
          detailsEl.innerHTML = '';
          scope.features.forEach(function(feature) {
            feature = feature.slice(0, 1).toUpperCase() + feature.slice(1).toLowerCase();
            var featureEl = document.createElement('div');
            feature.split('').forEach(function(char) {
              var charEl = document.createElement('span');
              charEl.innerText = char;
              charEl.style.opacity = 0;
              featureEl.appendChild(charEl);
            });
            detailsEl.appendChild(featureEl);
            anime({
              targets: featureEl.children,
              opacity: 1,
              duration: 400,
              easing: 'linear',
              delay: function(el, index) {
                return index * 15;
              }
            });
          });
          overlayVisible = true;
        });

        element[0].addEventListener('mouseleave', function () {
          element[0].querySelector('.overlay').style.display = 'none';
          element[0].querySelector('.details').style.display = 'none';
          overlayVisible = false;
        });
      },
    };
  });