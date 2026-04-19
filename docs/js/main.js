/* READ MORE */
function toggleReadMore(btn, id) {
  const full = document.getElementById(id);
  const preview = btn.closest('.assessment-block').querySelector('.preview-text');
  const isOpen = full.classList.contains('open');
  full.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
  btn.childNodes[0].textContent = isOpen ? 'Read more ' : 'Read less ';
  // hide preview text when expanded so full text takes over
  preview.style.display = isOpen ? '' : 'none';
}

/* MODALS */
function openModal(id) {
  const overlay = document.getElementById(id);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  // load YouTube iframe lazily on first open
  const iframe = overlay.querySelector('iframe[data-src]');
  if (iframe && !iframe.getAttribute('src')) iframe.src = iframe.dataset.src;
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

function closeReviewModal(id) {
  const overlay = document.getElementById(id);
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  // reset src to stop video playback on close
  const iframe = overlay.querySelector('iframe[data-src]');
  if (iframe) iframe.src = '';
}

function handleOverlayClick(e, id) {
  if (e.target === document.getElementById(id)) {
    id.startsWith('review-modal') ? closeReviewModal(id) : closeModal(id);
  }
}

/* TABS */
function switchTab(btn, tabId) {
  const modal = btn.closest('.modal');
  modal.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  modal.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

/* KEYBOARD */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.id.startsWith('review-modal') ? closeReviewModal(m.id) : closeModal(m.id);
    });
  }
});
