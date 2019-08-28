angular
  .module('BetliciousApp')
  .directive('searchBar', function() {
    return {
      scope: {
        onInput: '=',
        ngModel: '=',
      },
      template: `
        <div class="search-bar">
          <input type="text" ng-model="ngModel">
          <div placeholder>Search Game</div>
          <div button>
            <i class="fa fa-search"></i>
          </div>
        </div>
      `,
      replace: true,
      link: function(scope, element, attrs) {
        element[0].style.position = 'relative';

        var inputEl = element[0].querySelector('input');

        var placeholderEl = element[0].querySelector('[placeholder]');

        element[0].addEventListener('click', function() {
          placeholderEl.style.display = 'none';
          inputEl.focus();
        });

        inputEl.addEventListener('blur', function() {
          placeholderEl.style.display = 'inline-flex';
        });

        var onInputTimeout;
        inputEl.addEventListener('input', function() {
          var value = this.value;
          clearTimeout(onInputTimeout);
          onInputTimeout = setTimeout(function() {
            scope.onInput(value);
          }, 350);
        });

        scope.$watch('ngModel', function(val) {
          if (val) {
            placeholderEl.style.visibility = 'hidden';
          } else {
            placeholderEl.style.visibility = 'visible';
          }
        });
      },
    };
  });