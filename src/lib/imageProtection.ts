const blobCache = new Map<string, string>();

export async function protectImage(src: string): Promise<string> {
  if (!src || src.startsWith('data:')) return src;
  if (blobCache.has(src)) return blobCache.get(src)!;

  try {
    const response = await fetch(src);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    blobCache.set(src, blobUrl);
    return blobUrl;
  } catch {
    return src;
  }
}

export function revokeProtectedImage(src: string) {
  if (blobCache.has(src)) {
    URL.revokeObjectURL(blobCache.get(src)!);
    blobCache.delete(src);
  }
}

export function revokeAllProtectedImages() {
  blobCache.forEach((url) => URL.revokeObjectURL(url));
  blobCache.clear();
}
