const ARTWORKS_API = window.location.origin + '/api/artworks';

async function initArtworks() {
  try {
    const res = await fetch(ARTWORKS_API);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch {
    return [];
  }
}

async function getArtworks() {
  try {
    const res = await fetch(ARTWORKS_API);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch {
    return [];
  }
}

async function saveArtworks(artworks) {
  localStorage.setItem('lunarveil_artworks', JSON.stringify(artworks));
}

async function getArtworkById(id) {
  const artworks = await getArtworks();
  return artworks.find(a => a.id === id);
}

async function addArtwork(artwork) {
  const res = await fetch(ARTWORKS_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(artwork)
  });
  return await res.json();
}

async function updateArtwork(id, updates) {
  const res = await fetch(`${ARTWORKS_API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  return await res.json();
}

async function deleteArtwork(id) {
  await fetch(`${ARTWORKS_API}/${id}`, { method: 'DELETE' });
}

function generateId() {
  return 'artwork-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
}
