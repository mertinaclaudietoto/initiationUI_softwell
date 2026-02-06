function initSidebar() {

  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const toggleBtn = document.getElementById('toggleSidebar');
  const frontPagesBtn = document.getElementById('frontPagesBtn');
  const frontPagesSubmenu = document.getElementById('frontPagesSubmenu');
  const frontPagesIcon = document.getElementById('frontPagesIcon');
  const aiBtn = document.getElementById('aiBtn');
  const aiIcon = document.getElementById('aiIcon');

  if (!sidebar || !toggleBtn) {
    console.warn("Sidebar non chargée");
    return;
  }

  let isCompact = false;
  let isFrontPagesOpen = true;

  toggleBtn.addEventListener('click', () => {
    isCompact = !isCompact;

    sidebar.classList.toggle('w-64', !isCompact);
    sidebar.classList.toggle('w-20', isCompact);

    if (mainContent) {
      mainContent.classList.toggle('ml-64', !isCompact);
      mainContent.classList.toggle('ml-20', isCompact);
    }

    document.querySelectorAll('.menu-text, #logoText, #homeLabel, #appsLabel')
      .forEach(el => {
        el.style.display = isCompact ? 'none' : '';
        el.style.opacity = isCompact ? '0' : '1';
      });

    frontPagesSubmenu.style.display = isCompact ? 'none' : 'block';
  });

  frontPagesBtn?.addEventListener('click', e => {
    e.preventDefault();
    if (isCompact) return;

    isFrontPagesOpen = !isFrontPagesOpen;
    frontPagesSubmenu.style.display = isFrontPagesOpen ? 'block' : 'none';
    frontPagesIcon.classList.toggle('fa-chevron-up', isFrontPagesOpen);
    frontPagesIcon.classList.toggle('fa-chevron-down', !isFrontPagesOpen);
  });

  aiBtn?.addEventListener('click', e => {
    e.preventDefault();
    aiIcon.classList.toggle('fa-chevron-up');
    aiIcon.classList.toggle('fa-chevron-down');
  });

  ///initNavVertical
    const appsDropdown = document.getElementById('appsDropdown');
    const appsMenu = document.getElementById('appsMenu');
    // Toggle dropdown
    appsDropdown.addEventListener('click', (e) => {
        e.stopPropagation();

        if (appsMenu.classList.contains('hidden')) {
            appsMenu.classList.remove('hidden'); // afficher
            appsMenu.classList.toggle('show');

        } else {
            appsMenu.classList.add('hidden'); // cacher
        }
    });


    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        console.log(e)
        if (!appsDropdown.contains(e.target) && !appsMenu.contains(e.target)) {
            appsMenu.classList.remove('show');
             appsMenu.classList.add('hidden');
        }
    });
    // Prevent dropdown from closing when clicking inside
    appsMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    // Close dropdown on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            appsMenu.classList.remove('show');
        }
    });
  console.log("Sidebar initialisée ✔️");
}

fetch("../navbar/Sidebar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("include-sidebar").innerHTML = html;
});
fetch("../navbar/verticale.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("nav-vertical").innerHTML = html;
    // initNavVertical();
    setTimeout(() => {
      initSidebar();
      // initNavVertical();
    }, 300); 
  });
