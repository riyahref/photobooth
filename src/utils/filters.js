export const applyFilter = (ctx, width, height, filter) => {
  if (filter === 'original') return;

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    switch (filter) {
      case 'warm':
        data[i] = Math.min(255, r + 25);
        data[i + 1] = Math.min(255, g + 10);
        data[i + 2] = Math.max(0, b - 15);
        break;

      case 'cool':
        data[i] = Math.max(0, r - 15);
        data[i + 1] = Math.min(255, g + 5);
        data[i + 2] = Math.min(255, b + 25);
        break;

      case 'matte':
        const matteFactor = 0.85;
        const matteOffset = 20;
        data[i] = r * matteFactor + matteOffset;
        data[i + 1] = g * matteFactor + matteOffset;
        data[i + 2] = b * matteFactor + matteOffset;
        break;

      case 'mono':
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
        break;

      default:
        break;
    }
  }

  ctx.putImageData(imageData, 0, 0);
};

export const applyVibeOverlay = (ctx, width, height, overlayColor) => {
  ctx.fillStyle = overlayColor;
  ctx.fillRect(0, 0, width, height);
};

export const createPhotoStrip = (
  photos,
  filter,
  vibeOverlay,
  borderColor,
  backgroundColor,
  showDate,
  note
) => {
  return new Promise((resolve) => {
    const PHOTO_WIDTH = 280;
    const PHOTO_HEIGHT = 200;
    const PADDING = 20;
    const BORDER_WIDTH = 15;
    const NOTE_HEIGHT = note ? 40 : 0;
    const DATE_HEIGHT = showDate ? 30 : 0;

    const stripWidth = PHOTO_WIDTH + BORDER_WIDTH * 2;
    const stripHeight = 
      photos.length * PHOTO_HEIGHT + 
      (photos.length - 1) * PADDING + 
      BORDER_WIDTH * 2 + 
      NOTE_HEIGHT + 
      DATE_HEIGHT + 
      20;

    const canvas = document.createElement('canvas');
    canvas.width = stripWidth;
    canvas.height = stripHeight;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, stripWidth, stripHeight);

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(5, 5, stripWidth - 10, stripHeight - 10);

    let loadedCount = 0;
    const images = [];

    photos.forEach((photoData, index) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        images[index] = img;

        if (loadedCount === photos.length) {
          images.forEach((image, idx) => {
            const x = BORDER_WIDTH;
            const y = BORDER_WIDTH + idx * (PHOTO_HEIGHT + PADDING);

            ctx.drawImage(image, x, y, PHOTO_WIDTH, PHOTO_HEIGHT);

            if (filter !== 'original') {
              const photoCtx = ctx.getImageData(x, y, PHOTO_WIDTH, PHOTO_HEIGHT);
              const tempCanvas = document.createElement('canvas');
              tempCanvas.width = PHOTO_WIDTH;
              tempCanvas.height = PHOTO_HEIGHT;
              const tempCtx = tempCanvas.getContext('2d');
              tempCtx.putImageData(photoCtx, 0, 0);
              applyFilter(tempCtx, PHOTO_WIDTH, PHOTO_HEIGHT, filter);
              ctx.putImageData(tempCtx.getImageData(0, 0, PHOTO_WIDTH, PHOTO_HEIGHT), x, y);
            }

            if (vibeOverlay) {
              ctx.fillStyle = vibeOverlay;
              ctx.fillRect(x, y, PHOTO_WIDTH, PHOTO_HEIGHT);
            }
          });

          if (showDate) {
            const dateY = stripHeight - BORDER_WIDTH - DATE_HEIGHT - NOTE_HEIGHT;
            ctx.font = 'italic 16px "Dancing Script", cursive';
            ctx.fillStyle = '#6B4423';
            ctx.textAlign = 'center';
            const date = new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            ctx.fillText(date, stripWidth / 2, dateY + 20);
          }

          if (note) {
            const noteY = stripHeight - BORDER_WIDTH - 15;
            ctx.font = '18px "Caveat", cursive';
            ctx.fillStyle = '#6B4423';
            ctx.textAlign = 'center';
            ctx.fillText(note, stripWidth / 2, noteY);
          }

          resolve(canvas.toDataURL('image/png'));
        }
      };
      img.src = photoData;
    });
  });
};
