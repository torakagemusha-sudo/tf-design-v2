import { useMemo } from 'react';

interface SpectrogramProps {
  data: number[][];
  width?: number;
  height?: number;
}

export default function Spectrogram({ data, width = 600, height = 200 }: SpectrogramProps) {
  const canvasData = useMemo(() => {
    const rows = data.length;
    const cols = data[0]?.length ?? 0;
    const flat = data.flat();
    const min = Math.min(...flat);
    const max = Math.max(...flat);
    const range = max - min || 1;

    const canvas = document.createElement('canvas');
    canvas.width = cols;
    canvas.height = rows;
    const ctx = canvas.getContext('2d')!;
    const imageData = ctx.createImageData(cols, rows);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const val = (data[y][x] - min) / range;
        const idx = (y * cols + x) * 4;
        // Viridis-like colormap
        const r = Math.floor(68 + val * (253 - 68));
        const g = Math.floor(1 + val * (231 - 1));
        const b = Math.floor(84 + val * (37 - 84));
        imageData.data[idx] = r;
        imageData.data[idx + 1] = g;
        imageData.data[idx + 2] = b;
        imageData.data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  }, [data]);

  return (
    <div className="tf-control-chart">
      <div className="tf-mb-3" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--tf-text-primary)' }}>Spectrogram</div>
      <img src={canvasData} alt="Spectrogram" style={{ width, height, imageRendering: 'pixelated', borderRadius: 'var(--tf-radius-md)' }} />
    </div>
  );
}
