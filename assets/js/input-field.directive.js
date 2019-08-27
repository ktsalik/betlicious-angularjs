angular
  .module('BetliciousApp')
  .directive('inputField', function() {
    return {
      scope: {
        placeholder: '@',
      },
      template: `
        <div class="input-field">
          <input type="text">
          <div placeholder>{{placeholder}}</div>
        </div>
      `,
      replace: true,
      link: function(scope, element, attrs) {
        element[0].style.position = 'relative';

        var inputEl = element[0].querySelector('input');
        
        var placeholderEl = element[0].querySelector('[placeholder]');
        var ph = placeholderEl;
        ph.style.position = 'absolute';
        ph.style.left = 0;
        ph.style.top = 0;
        
        element[0].addEventListener('click', function() {
          ph.style.display = 'none';
          inputEl.focus();
        });

        inputEl.addEventListener('blur', function() {
          ph.style.display = 'initial';
        });
      },
    };
  });