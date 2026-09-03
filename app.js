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
  const role = page.includes('piket') ? 'piket' : page.includes('admin') ? 'admin' : page.includes('sekretaris') ? 'sekretaris' : 'guru';
  const home = role === 'admin' ? 'dashboard_admin' : role === 'sekretaris' ? 'dashboard_sekretaris' : role === 'piket' ? 'dashboard_piket' : 'dashboard_guru';
  const paths = {
    dashboard: home,
    jurnal: role === 'guru' ? 'tambah_jurnal_guru' : role === 'sekretaris' ? 'verifikasi_jurnal' : 'data_jurnal_admin',
    guru: 'data_guru',
    sekretaris: 'data_sekretaris',
    kelas: 'data_kelas_mata_pelajaran',
    rekapitulasi: 'rekapitulasi_jurnal',
    detail: 'detail_jurnal_guru',
    piket: 'dashboard_piket',
    pengaturan: 'pengaturan_jam',
    login: role === 'admin' ? 'login_admin' : role === 'sekretaris' ? 'login_sekretaris' : role === 'piket' ? 'login_piket' : 'login_guru'
  };

  const defaultSchedule = [
    ['1', '07:00', '07:45'], ['2', '07:45', '08:30'], ['3', '08:30', '09:15'],
    ['4', '09:15', '10:00'], ['5', '10:15', '11:00'], ['6', '11:00', '11:45'],
    ['7', '11:45', '12:30'], ['8', '13:00', '13:45']
  ];

  function getSchedule() {
    return JSON.parse(localStorage.getItem('jamPelajaran') || 'null') || defaultSchedule.map(([jam, mulai, selesai]) => ({ jam, mulai, selesai }));
  }

  function saveJournal(form) {
    const value = (id) => form.querySelector(`#${id}`)?.value?.trim() || '';
    const journals = JSON.parse(localStorage.getItem('jurnalMengajar') || '[]');
    journals.unshift({
      id: Date.now(), tanggal: value('tanggal'), jam: value('jam_mulai'), jamSelesai: value('jam_selesai'),
      guru: value('guru') || 'Guru aktif', kelas: value('kelas'), mapel: value('mapel'), materi: value('materi'), kegiatan: value('kegiatan'),
      tugas: value('tugas'), statusGuru: value('status_guru') || 'Hadir', statusSiswa: value('status_siswa') || 'Hadir',
      hadir: value('hadir'), sakit: value('sakit'), izin: value('izin'), alpa: value('alpa'),
      namaTidakHadir: value('nama_tidak_hadir'), status: 'Menunggu'
    });
    localStorage.setItem('jurnalMengajar', JSON.stringify(journals));
  }

  function initJournalForm(form) {
    const dateInput = form.querySelector('#tanggal');
    if (dateInput && !dateInput.value) dateInput.value = new Intl.DateTimeFormat('en-CA').format(new Date());
    getSchedule().forEach((item) => ['jam_mulai', 'jam_selesai'].forEach((id) => {
      const input = form.querySelector(`#${id}`);
      if (!input || input.tagName === 'SELECT') return;
      const select = document.createElement('select');
      select.id = id; select.name = id; select.required = true; select.className = input.className;
      select.innerHTML = `<option value="">Pilih jam</option>${getSchedule().map((slot) => `<option value="${slot[id === 'jam_mulai' ? 'mulai' : 'selesai']}">Jam ke-${slot.jam}: ${slot.mulai}-${slot.selesai}</option>`).join('')}`;
      input.replaceWith(select);
    }));
    const classSelect = form.querySelector('#kelas');
    const hadir = form.querySelector('#hadir');
    const statusSiswa = form.querySelector('#status_siswa');
    const classSizes = { '10a': 32, '10b': 30, '11a': 31, '11b': 29 };
    const updateAttendance = () => { if (statusSiswa?.value === 'Hadir' && hadir && classSelect?.value) hadir.value = classSizes[classSelect.value] || ''; };
    classSelect?.addEventListener('change', updateAttendance); statusSiswa?.addEventListener('change', updateAttendance); updateAttendance();
    const guruStatus = form.querySelector('#status_guru');
    const task = form.querySelector('#tugas');
    guruStatus?.addEventListener('change', () => { const absent = guruStatus.value !== 'Hadir'; if (task) { task.required = absent; task.placeholder = absent ? 'Wajib diisi jika guru berhalangan hadir' : 'Detail tugas (opsional)'; } });
  }

  function initPiketDashboard() {
    const dateInput = document.querySelector('#tanggal-piket');
    const table = document.querySelector('#rekap-piket');
    if (!dateInput || !table) return;
    dateInput.value = new Intl.DateTimeFormat('en-CA').format(new Date());
    const teachers = ['Sutrisno, S.Kom', 'Rahmawati, S.Kom', 'Yusuf Hidayat, S.Kom', 'Dewi Anjani, S.Pd', 'Bambang Wijaya, S.Pd', 'Siti Nurhaliza, S.Pd'];
    const render = () => { const date = dateInput.value; const journals = JSON.parse(localStorage.getItem('jurnalMengajar') || '[]').filter((journal) => journal.tanggal === date); table.innerHTML = teachers.map((teacher) => { const journal = journals.find((item) => item.guru === teacher); const hadir = journal ? journal.statusGuru === 'Hadir' : false; return `<tr class="border-b border-slate-200"><td class="p-3">${teacher}</td><td class="p-3">${hadir ? '<span class="text-green-600 font-semibold">Masuk</span>' : '<span class="text-red-600 font-semibold">Tidak masuk</span>'}</td><td class="p-3">${journal?.tugas || (journal ? journal.statusGuru : 'Belum mengisi jurnal')}</td></tr>`; }).join(''); };
    dateInput.addEventListener('change', render); render();
  }

  function targetFor(label) {
    const text = label.toLowerCase().replace(/\s+/g, ' ').trim();
    if (text.includes('logout')) return '../index.html';
    if (text.includes('dashboard')) return `../${paths.dashboard}/code.html`;
    if (text.includes('jurnal') || text.includes('daftar jurnal')) return `../${paths.jurnal}/code.html`;
    if (text.includes('guru')) return `../${paths.guru}/code.html`;
    if (text.includes('sekretaris')) return `../${paths.sekretaris}/code.html`;
    if (text.includes('kelas') || text.includes('mata pelajaran')) return `../${paths.kelas}/code.html`;
    if (text.includes('rekap')) return `../${paths.rekapitulasi}/code.html`;
    if (text.includes('piket') || text.includes('kehadiran guru')) return `../${paths.piket}/code.html`;
    if (text.includes('pengaturan')) return `../${paths.pengaturan}/code.html`;
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
    if (form.querySelector('#tanggal') && form.querySelector('#jam_mulai')) initJournalForm(form);
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
      if (form.id === 'verifikasi-form') {
        const decision = form.querySelector('input[name="keputusan"]:checked');
        if (!decision || (decision.value === 'tolak' && !form.querySelector('#catatan').value.trim())) { alert('Pilih keputusan dan isi catatan jika jurnal ditolak.'); return; }
        localStorage.setItem('verifikasiTerakhir', JSON.stringify({ keputusan: decision.value, catatan: form.querySelector('#catatan').value.trim(), waktu: new Date().toISOString() }));
        alert('Keputusan berhasil dikonfirmasi.'); return;
      }
      if (form.querySelector('#tanggal') && form.querySelector('#jam_mulai')) {
        saveJournal(form);
        alert('Jurnal berhasil dikonfirmasi dan menunggu verifikasi.');
        form.reset(); initJournalForm(form); return;
      }
      const destination = form.closest('body') && page.includes('login_') ? `../${paths.dashboard}/code.html` : null;
      if (destination) window.location.href = destination;
    });
  });

  const scheduleForm = document.querySelector('#pengaturan-jam-form');
  if (scheduleForm) {
    const list = document.querySelector('#daftar-jam');
    const renderSchedule = () => { list.innerHTML = getSchedule().map((item) => `<tr><td class="p-2">${item.jam}</td><td class="p-2"><input required name="mulai-${item.jam}" value="${item.mulai}" type="time" class="border rounded p-1" /></td><td class="p-2"><input required name="selesai-${item.jam}" value="${item.selesai}" type="time" class="border rounded p-1" /></td></tr>`).join(''); };
    renderSchedule();
    scheduleForm.addEventListener('submit', (event) => { event.preventDefault(); const schedule = getSchedule().map((item) => ({ jam: item.jam, mulai: scheduleForm[`mulai-${item.jam}`].value, selesai: scheduleForm[`selesai-${item.jam}`].value })); localStorage.setItem('jamPelajaran', JSON.stringify(schedule)); alert('Jam pelajaran berhasil dikonfirmasi.'); });
  }
  initPiketDashboard();

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