import { useEffect, useRef, useState, useCallback } from 'react';
import DOMPurify from 'dompurify';
import { FadeIn } from '../../layout-shell/motion/MotionWrapper';

interface PyodideMatplotlibProps {
  code: string;
  height?: number;
}

let pyodideInstance: any = null;
let pyodideLoading: Promise<any> | null = null;

async function getPyodide() {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideLoading) return pyodideLoading;

  pyodideLoading = (async () => {
    const { loadPyodide } = await import('pyodide');
    pyodideInstance = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full',
    });
    await pyodideInstance.loadPackage(['matplotlib', 'numpy']);

    // Setup matplotlib backend
    pyodideInstance.runPython(`
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt
import numpy as np
import io
import base64

def render_plot():
    buf = io.BytesIO()
    plt.savefig(buf, format='svg', bbox_inches='tight', facecolor='#0f1724', edgecolor='none')
    buf.seek(0)
    svg = buf.read().decode('utf-8')
    plt.close()
    return svg
`);
    return pyodideInstance;
  })();

  return pyodideLoading;
}

export default function PyodideMatplotlib({ code, height = 400 }: PyodideMatplotlibProps) {
  const [svg, setSvg] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const py = await getPyodide();
      py.globals.set('__user_code', code);
      py.runPython(`
exec(__user_code)
svg_output = render_plot()
`);
      const result = py.globals.get('svg_output') as string;
      setSvg(result);
    } catch (e: any) {
      setError(e.message || 'Python execution error');
    } finally {
      setLoading(false);
    }
  }, [code]);

  useEffect(() => {
    run();
  }, [run]);

  return (
    <FadeIn>
      <div
        ref={containerRef}
        className="rounded overflow-hidden"
        style={{ background: '#0f1724', border: '1px solid var(--tf-border-default)', minHeight: height }}
      >
        <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: '1px solid var(--tf-border-subtle)', background: 'var(--tf-panel)' }}>
          <span className="text-xs font-medium" style={{ color: 'var(--tf-white)' }}>Pyodide — Matplotlib</span>
          <button onClick={run} className="tf-button tf-button--neutral" style={{ padding: '2px 8px', fontSize: '11px' }}>
            {loading ? 'Running...' : 'Rerun'}
          </button>
        </div>
        {error && (
          <div className="p-4 text-xs" style={{ color: 'var(--tf-red)' }}>
            {error}
          </div>
        )}
        {svg && !error && (
          <div
            className="p-2"
            style={{ color: 'var(--tf-white)' }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(svg) }}
          />
        )}
        {!svg && !error && loading && (
          <div className="flex items-center justify-center p-8 text-xs" style={{ color: 'var(--tf-text-muted)', height }}>
            Loading Python runtime...
          </div>
        )}
      </div>
    </FadeIn>
  );
}
