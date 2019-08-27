angular
  .module('BetliciousApp')
  .directive('searchBar', function () {
    return {
      template: `
        <div class="search-bar">
          <input type="text">
          <div placeholder>Search Games</div>
          <div button>
            <i class="fa fa-search"></i>
          </div>
        </div>
      `,
      replace: true,
      link: function (scope, element, attrs) {
        element[0].style.position = 'relative';

        var inputEl = element[0].querySelector('input');

        var placeholderEl = element[0].querySelector('[placeholder]');

        element[0].addEventListener('click', function () {
          placeholderEl.style.display = 'none';
          inputEl.focus();
        });

        inputEl.addEventListener('blur', function () {
          placeholderEl.style.display = 'inline-flex';
        });

        inputEl.addEventListener('input', function() {
          if (this.value.length) {
            placeholderEl.style.visibility = 'hidden';
          } else {
            placeholderEl.style.visibility = 'visible';
          }
        });
      },
    };
  });