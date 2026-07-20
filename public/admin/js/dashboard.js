let currentArtworks = [];
let editingId = null;
let currentImageBase64 = null;

async function initDashboard() {
  if (!requireAuth()) return;
  currentArtworks = await initArtworks();
  renderStats();
  renderTable();
  setupEventListeners();
}

function renderStats() {
  const total = currentArtworks.length;
  const available = currentArtworks.filter(a => a.isAvailable).length;
  const sold = total - available;
  const highlights = currentArtworks.filter(a => a.isHighlight).length;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-available').textContent = available;
  document.getElementById('stat-sold').textContent = sold;
  document.getElementById('stat-highlights').textContent = highlights;
}

function renderTable(filter = '') {
  const tbody = document.getElementById('artworks-tbody');
  const filtered = filter
    ? currentArtworks.filter(a =>
        a.title.toLowerCase().includes(filter.toLowerCase()) ||
        a.category.toLowerCase().includes(filter.toLowerCase()) ||
        a.year.includes(filter)
      )
    : currentArtworks;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
            </svg>
            <h5>Tidak Ada Karya</h5>
            <p>Belum ada karya seni yang ditambahkan.</p>
          </div>
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(art => `
    <tr data-id="${art.id}">
      <td>
        <div class="artwork-cell">
          <img src="${art.image}" alt="${art.title}" class="artwork-thumb" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23202940%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%239A8678%22 font-size=%2214%22%3ENo Img%3C/text%3E%3C/svg%3E'">
          <div>
            <div class="artwork-name">${art.title_id || art.title}</div>
            <div class="artwork-category">${art.category}</div>
          </div>
        </div>
      </td>
      <td>${art.medium || '-'}</td>
      <td>${art.year}</td>
      <td>${art.price}</td>
      <td>
        <span class="badge ${art.isAvailable ? 'badge-available' : 'badge-sold'}">
          ${art.isAvailable ? 'Tersedia' : 'Terjual'}
        </span>
        ${art.isHighlight ? '<span class="badge badge-highlight" style="margin-left:4px">Highlight</span>' : ''}
      </td>
      <td>
        <div class="actions-cell">
          <button class="btn-icon" title="Edit" onclick="openEditModal('${art.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
          <button class="btn-icon delete" title="Hapus" onclick="openDeleteConfirm('${art.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function setupEventListeners() {
  document.getElementById('search-input').addEventListener('input', (e) => {
    renderTable(e.target.value);
  });

  document.getElementById('artwork-form').addEventListener('submit', (e) => {
    e.preventDefault();
    saveArtwork();
  });

  document.getElementById('image-file-input').addEventListener('change', handleImageUpload);

  const uploadArea = document.getElementById('upload-area');
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--sand)';
    uploadArea.style.background = 'rgba(202, 170, 152, 0.06)';
  });
  uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '';
    uploadArea.style.background = '';
  });
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '';
    uploadArea.style.background = '';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processImageFile(file);
    }
  });
}

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (file) processImageFile(file);
}

function processImageFile(file) {
  if (file.size > 5 * 1024 * 1024) {
    showToast('Ukuran gambar maksimal 5MB', true);
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    currentImageBase64 = e.target.result;
    const preview = document.getElementById('image-preview');
    preview.innerHTML = `
      <img src="${currentImageBase64}" alt="Preview">
      <button type="button" class="remove-img" onclick="removeImagePreview()">✕</button>
    `;
    preview.style.display = 'inline-block';
  };
  reader.readAsDataURL(file);
}

function removeImagePreview() {
  currentImageBase64 = null;
  document.getElementById('image-preview').innerHTML = '';
  document.getElementById('image-preview').style.display = 'none';
  document.getElementById('image-file-input').value = '';
}

function openAddModal() {
  editingId = null;
  currentImageBase64 = null;
  document.getElementById('modal-title').textContent = 'Tambah Karya Baru';
  document.getElementById('artwork-form').reset();
  document.getElementById('image-preview').innerHTML = '';
  document.getElementById('image-preview').style.display = 'none';
  document.getElementById('artwork-id-display').style.display = 'none';
  openModal('artwork-modal');
}

async function openEditModal(id) {
  const art = await getArtworkById(id);
  if (!art) return;

  editingId = id;
  document.getElementById('modal-title').textContent = 'Edit Karya Seni';
  document.getElementById('artwork-id-display').style.display = 'block';
  document.getElementById('artwork-id-display').textContent = `ID: ${art.id}`;

  document.getElementById('form-title').value = art.title || '';
  document.getElementById('form-title-id').value = art.title_id || '';
  document.getElementById('form-title-en').value = art.title_en || '';
  document.getElementById('form-category').value = art.category || 'Grafit Pensil';
  document.getElementById('form-medium').value = art.medium || '';
  document.getElementById('form-medium-id').value = art.medium_id || '';
  document.getElementById('form-medium-en').value = art.medium_en || '';
  document.getElementById('form-dimension').value = art.dimension || '';
  document.getElementById('form-year').value = art.year || '';
  document.getElementById('form-price').value = art.price || '';
  document.getElementById('form-available').checked = art.isAvailable;
  document.getElementById('form-highlight').checked = art.isHighlight;
  document.getElementById('form-description').value = art.description || '';
  document.getElementById('form-description-id').value = art.description_id || '';
  document.getElementById('form-description-en').value = art.description_en || '';
  document.getElementById('form-story').value = art.story || '';
  document.getElementById('form-story-id').value = art.story_id || '';
  document.getElementById('form-story-en').value = art.story_en || '';

  if (art.image && !art.image.startsWith('data:')) {
    currentImageBase64 = art.image;
    const preview = document.getElementById('image-preview');
    preview.innerHTML = `
      <img src="${art.image}" alt="Preview">
      <button type="button" class="remove-img" onclick="removeImagePreview()">✕</button>
    `;
    preview.style.display = 'inline-block';
  } else if (art.image && art.image.startsWith('data:')) {
    currentImageBase64 = art.image;
    const preview = document.getElementById('image-preview');
    preview.innerHTML = `
      <img src="${art.image}" alt="Preview">
      <button type="button" class="remove-img" onclick="removeImagePreview()">✕</button>
    `;
    preview.style.display = 'inline-block';
  } else {
    currentImageBase64 = art.image || '';
    document.getElementById('image-preview').innerHTML = '';
    document.getElementById('image-preview').style.display = 'none';
  }

  openModal('artwork-modal');
}

async function saveArtwork() {
  const formData = {
    title: document.getElementById('form-title').value.trim(),
    title_id: document.getElementById('form-title-id').value.trim(),
    title_en: document.getElementById('form-title-en').value.trim(),
    category: document.getElementById('form-category').value,
    medium: document.getElementById('form-medium').value.trim(),
    medium_id: document.getElementById('form-medium-id').value.trim(),
    medium_en: document.getElementById('form-medium-en').value.trim(),
    dimension: document.getElementById('form-dimension').value.trim(),
    year: document.getElementById('form-year').value.trim(),
    price: document.getElementById('form-price').value.trim(),
    isAvailable: document.getElementById('form-available').checked,
    isHighlight: document.getElementById('form-highlight').checked,
    description: document.getElementById('form-description').value.trim(),
    description_id: document.getElementById('form-description-id').value.trim(),
    description_en: document.getElementById('form-description-en').value.trim(),
    story: document.getElementById('form-story').value.trim(),
    story_id: document.getElementById('form-story-id').value.trim(),
    story_en: document.getElementById('form-story-en').value.trim(),
    image: currentImageBase64 || '/src/assets/images/gambarabdil.jpeg'
  };

  if (!formData.title) {
    showToast('Judul karya harus diisi', true);
    return;
  }

  try {
    if (editingId) {
      await updateArtwork(editingId, formData);
      showToast('Karya berhasil diperbarui!');
    } else {
      await addArtwork(formData);
      showToast('Karya baru berhasil ditambahkan!');
    }

    currentArtworks = await getArtworks();
    renderStats();
    renderTable(document.getElementById('search-input').value);
    closeModal('artwork-modal');
  } catch (err) {
    showToast('Gagal menyimpan karya', true);
  }
}

let pendingDeleteId = null;

async function openDeleteConfirm(id) {
  pendingDeleteId = id;
  const art = await getArtworkById(id);
  document.getElementById('delete-art-name').textContent = art ? art.title : '';
  openModal('delete-modal');
}

async function confirmDelete() {
  if (pendingDeleteId) {
    try {
      await deleteArtwork(pendingDeleteId);
      currentArtworks = await getArtworks();
      renderStats();
      renderTable(document.getElementById('search-input').value);
      showToast('Karya berhasil dihapus!');
    } catch (err) {
      showToast('Gagal menghapus karya', true);
    }
    pendingDeleteId = null;
  }
  closeModal('delete-modal');
}

function openModal(id) {
  document.getElementById(id).classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('show');
  document.body.style.overflow = '';
}

function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  const toastMsg = toast.querySelector('.toast-msg');
  const toastIcon = toast.querySelector('svg');
  toastMsg.textContent = msg;
  toast.className = isError ? 'toast error show' : 'toast show';
  if (isError) {
    toastIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />';
  } else {
    toastIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />';
  }
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

function exportData() {
  const data = JSON.stringify(currentArtworks, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'lunarveil-artworks-backup.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Data berhasil diexport!');
}

async function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        for (const art of imported) {
          await addArtwork(art);
        }
        currentArtworks = await getArtworks();
        renderStats();
        renderTable();
        showToast(`${imported.length} karya berhasil diimport!`);
      } else {
        showToast('Format file tidak valid', true);
      }
    } catch {
      showToast('Gagal membaca file', true);
    }
  };
  reader.readAsText(file);
}
