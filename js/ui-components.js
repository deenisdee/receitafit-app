/* ============================================
   ui-components.js — Tab bar + Premium (centralizado)
   - Tab bar: Início | Busca | Planner | Premium
   - Planner abre/fecha dropdown existente (.planner-dropdown)
   - Busca foca o input da busca
   - Premium chama openPremium('tab')
   - Suporte a hash: #rf-search / #rf-planner (quando vem de outra página)
   ============================================ */

(function () {
  'use strict';

  // --------- HELPERS ---------
  function $(sel, root = document) {
    return root.querySelector(sel);
  }

  function findSearchInput() {
    return (
      document.getElementById('search-input') ||
      document.querySelector('.search-input') ||
      document.querySelector('input[type="search"]')
    );
  }

  function focusSearch() {
    const input = findSearchInput();
    if (!input) return;

    try {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (_) {}

    input.focus();
  }

  function getPlannerDropdown() {
    return document.querySelector('.planner-dropdown');
  }

  function openPlannerDropdown() {
    const dd = getPlannerDropdown();
    if (!dd) return;
    dd.classList.remove('hidden');
  }

  function togglePlannerDropdown() {
    const dd = getPlannerDropdown();
    if (!dd) return;
    dd.classList.toggle('hidden');
  }

  // --------- PREMIUM OPEN (centralizado) ---------
  // OBS: você já tem a openPremiumModal() e ela está ok.
  // Aqui a gente cria um wrapper único (com "source") e chama ela.
  window.openPremium = function (source) {
    // marca de onde abriu (header/tab/hamburger etc.) — útil pro seu controle de badges
    try {
      window.__premium_open_source = source || 'unknown';
    } catch (_) {}

    if (typeof window.openPremiumModal === 'function') {
      window.openPremiumModal();
      return;
    }

    // fallback: abre pelo id direto
    const premiumModal = document.getElementById('premium-modal');
    if (premiumModal) {
      premiumModal.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
  };

  // --------- TAB BAR RENDER ---------
  function renderTabbar(root) {
    if (!root) return;
    if (root.dataset.mounted === '1') return;
    root.dataset.mounted = '1';

    root.innerHTML = `
      <div class="tab-bar" id="rf-tabbar">
        <button class="tab-item" type="button" aria-label="Início" data-tab="home">
          <i data-lucide="home" class="tab-icon"></i>
          <span class="tab-label">Início</span>
        </button>

        <button class="tab-item" type="button" aria-label="Busca" data-tab="search">
          <i data-lucide="search" class="tab-icon"></i>
          <span class="tab-label">Busca</span>
        </button>

        <button class="tab-item" type="button" aria-label="Planner" data-tab="planner">
          <i data-lucide="calendar" class="tab-icon"></i>
          <span class="tab-label">Planner</span>
        </button>

        <button class="tab-item tab-premium" type="button" aria-label="Premium" data-open-premium="tab">
          <i data-lucide="star" class="tab-icon"></i>
          <span class="tab-label">Premium</span>
        </button>
      </div>
    `;

    // clique
    root.addEventListener('click', (e) => {
      const btnHome = e.target.closest('[data-tab="home"]');
      if (btnHome) {
        window.location.href = 'index.html';
        return;
      }

      const btnSearch = e.target.closest('[data-tab="search"]');
      if (btnSearch) {
        // se não estiver na index, volta pra index e abre busca via hash
        if (!/index\.html/i.test(location.pathname)) {
          window.location.href = 'index.html#rf-search';
          return;
        }
        focusSearch();
        return;
      }

      const btnPlanner = e.target.closest('[data-tab="planner"]');
      if (btnPlanner) {
        // se não estiver na index, volta pra index e abre planner via hash
        if (!/index\.html/i.test(location.pathname)) {
          window.location.href = 'index.html#rf-planner';
          return;
        }
        togglePlannerDropdown();
        return;
      }

      const btnPremium = e.target.closest('[data-open-premium]');
      if (btnPremium) {
        window.openPremium('tab');
        return;
      }
    });
  }

  // --------- MOUNT ---------
  function mount() {
    // 1) Tab bar (se existir placeholder)
    // Você pode ter um container tipo <div id="tabbar-root"></div>
    // OU a própria tab bar já no HTML. Aqui tentamos ambos.
    const root =
      document.getElementById('tabbar-root') ||
      document.querySelector('[data-component="tabbar"]') ||
      document.querySelector('.tabbar-root');

    if (root) renderTabbar(root);

    // 2) Hash actions quando veio de outra página
    const hash = (location.hash || '').toLowerCase();

    if (hash === '#rf-search') {
      // garante que está na index, mas se estiver, foca
      focusSearch();
    }

    if (hash === '#rf-planner') {
      openPlannerDropdown();
    }

    // 3) Se lucide existir, re-render icons
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    } else if (typeof window.lucide?.createIcons === 'function') {
      window.lucide.createIcons();
    } else if (typeof window.createLucideIcons === 'function') {
      window.createLucideIcons();
    }
  }

  // inicia
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
