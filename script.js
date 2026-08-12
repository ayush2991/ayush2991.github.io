(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  const SUN =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  const MOON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    // Icon shown is the action, not the current state — clicking it switches to that mode.
    toggle.innerHTML = theme === 'dark' ? SUN : MOON;
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(stored || (prefersDark ? 'dark' : 'light'));

  toggle.addEventListener('click', function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
})();

/* Career accordion: click a role to expand its highlights inline. */
(function () {
  const heads = document.querySelectorAll('.role-head');

  heads.forEach(function (head) {
    const role = head.closest('.role');
    role.dataset.open = 'false';

    head.addEventListener('click', function () {
      const open = head.getAttribute('aria-expanded') === 'true';
      head.setAttribute('aria-expanded', String(!open));
      role.dataset.open = String(!open);
    });
  });
})();

/* Mobile menu: the nav links, behind the header's hamburger. */
(function () {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.addEventListener('click', function (event) {
    // Jumping to a section should close the menu behind it.
    if (event.target.closest('a')) setOpen(false);
  });
})();
