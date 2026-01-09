(function plannerClickFallbackMobileSafe(){
  'use strict';

  function isPlannerButtonClick(target) {
    const tabbar = target.closest('.tab-bar');
    if (!tabbar) return false;

    const btn = target.closest('button');
    if (!btn) return false;

    return !!btn.querySelector('svg.lucide-calendar, svg.lucide.lucide-calendar');
  }

  document.addEventListener('click', function(e){
    if (!isPlannerButtonClick(e.target)) return;

    // deixa os handlers do app rodarem primeiro
    setTimeout(() => {
      const dd = document.getElementById('planner-dropdown');
      const isClosed = dd && dd.classList.contains('hidden');

      // Se não existe ou está fechado, força abrir
      if (!dd || isClosed) {
        if (typeof window.openPlannerDropdown === 'function') window.openPlannerDropdown();
      }
    }, 0);
  }, false);
})();
