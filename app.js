(function () {
  const themeStyle = document.createElement('style');
  themeStyle.textContent = `
    :root {
      --brand-primary: #F97316;
      --brand-primary-dark: #C2410C;
      --brand-accent: #F59E0B;
      --brand-soft: #FED7C3;
      --brand-background: #FFF7ED;
      --brand-card: #FFFFFF;
      --brand-text: #1E293B;
      --brand-muted: #64748B;
      --brand-success: #16A34A;
      --brand-error: #DC2626;
    }
    body.bg-background { background-color: var(--brand-background) !important; }
    .bg-background { background-color: var(--brand-background) !important; }
    .bg-surface { background-color: var(--brand-card) !important; }
    .bg-surface-container-low, .bg-surface-container, .bg-surface-container-high,
    .bg-surface-container-highest, .bg-surface-variant { background-color: var(--brand-soft) !important; }
    .bg-surface-container-lowest { background-color: var(--brand-card) !important; }
    .bg-primary, .bg-primary-container { background-color: var(--brand-primary) !important; }
    .bg-on-background, .bg-on-primary-fixed-variant { background-color: var(--brand-primary-dark) !important; }
    .bg-secondary-fixed, .bg-secondary-container { background-color: var(--brand-accent) !important; }
    .bg-error { background-color: var(--brand-error) !important; }
    .text-on-background, .text-on-surface { color: var(--brand-text) !important; }
    .text-on-surface-variant, .text-secondary, .text-outline { color: var(--brand-muted) !important; }
    .text-primary, .text-primary-container, .text-on-primary-fixed-variant { color: var(--brand-primary) !important; }
    .text-on-primary, .text-on-primary-container { color: #FFFFFF !important; }
    .text-brand-success-text { color: var(--brand-success) !important; }
    .border-primary, .focus\\:border-primary:focus { border-color: var(--brand-primary) !important; }
    .border-outline-variant, .thin-frame { border-color: #FED7C3 !important; }
    .focus\\:ring-primary:focus, .focus\\:ring-primary\\/20:focus { --tw-ring-color: rgba(249, 115, 22, .2) !important; }
    .hover\\:bg-primary-container:hover, .hover\\:bg-on-primary-fixed-variant:hover { background-color: var(--brand-primary-dark) !important; }
    .hover\\:text-primary:hover, .hover\\:text-on-surface:hover { color: var(--brand-primary-dark) !important; }
  `;
  document.head.appendChild(themeStyle);

  const page = window.location.pathname;
  const role = page.includes('admin') ? 'admin' : page.includes('sekretaris') ? 'sekretaris' : 'guru';
  const home = role === 'admin' ? 'dashboard_admin' : role === 'sekretaris' ? 'dashboard_sekretaris' : 'dashboard_guru';
  const paths = {
    dashboard: home,
    jurnal: role === 'guru' ? 'tambah_jurnal_guru' : role === 'sekretaris' ? 'verifikasi_jurnal' : 'data_jurnal_admin',
    guru: 'data_guru',
    sekretaris: 'data_sekretaris',
    kelas: 'data_kelas_mata_pelajaran',
    rekapitulasi: 'rekapitulasi_jurnal',
    detail: 'detail_jurnal_guru',
    login: role === 'admin' ? 'login_admin' : role === 'sekretaris' ? 'login_sekretaris' : 'login_guru'
  };

  function targetFor(label) {
    const text = label.toLowerCase().replace(/\s+/g, ' ').trim();
    if (text.includes('logout')) return '../index.html';
    if (text.includes('dashboard')) return `../${paths.dashboard}/code.html`;
    if (text.includes('jurnal') || text.includes('daftar jurnal')) return `../${paths.jurnal}/code.html`;
    if (text.includes('guru')) return `../${paths.guru}/code.html`;
    if (text.includes('sekretaris')) return `../${paths.sekretaris}/code.html`;
    if (text.includes('kelas') || text.includes('mata pelajaran')) return `../${paths.kelas}/code.html`;
    if (text.includes('rekap')) return `../${paths.rekapitulasi}/code.html`;
    if (text.includes('detail')) return `../${paths.detail}/code.html`;
    if (text.includes('admin')) return '../login_admin/code.html';
    return null;
  }

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    const target = targetFor(link.textContent);
    if (target) {
      link.href = target;
    } else {
      link.addEventListener('click', (event) => event.preventDefault());
    }
  });

  document.querySelectorAll('form').forEach((form) => {
    if (page.includes('login_')) {
      form.querySelectorAll('input:not([type="checkbox"])').forEach((input) => {
        input.required = true;
      });
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const destination = form.closest('body') && page.includes('login_')
        ? `../${paths.dashboard}/code.html`
        : null;
      if (destination) window.location.href = destination;
    });
  });

  document.querySelectorAll('button[type="button"]').forEach((button) => {
    const icon = button.querySelector('.material-symbols-outlined');
    const input = button.closest('.relative')?.querySelector('input[type="password"], input[type="text"]');
    if (input && icon && /visibility/.test(icon.textContent) && !button.hasAttribute('onclick')) {
      button.addEventListener('click', () => {
        const hidden = input.type === 'password';
        input.type = hidden ? 'text' : 'password';
        icon.textContent = hidden ? 'visibility_off' : 'visibility';
      });
    }
  });
})();