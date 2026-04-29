(function () {
  var STORAGE_KEY = 'ise-theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }

  // Apply before first paint to prevent flash
  var saved = localStorage.getItem(STORAGE_KEY) || 'dark';
  applyTheme(saved);

  function injectButton() {
    var btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.title = 'Toggle light / dark mode';

    function syncIcon() {
      btn.textContent = document.documentElement.classList.contains('light') ? '☽' : '☀';
    }
    syncIcon();

    btn.addEventListener('click', function () {
      var isLight = document.documentElement.classList.contains('light');
      var next = isLight ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
      syncIcon();
    });

    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectButton);
  } else {
    injectButton();
  }
})();
