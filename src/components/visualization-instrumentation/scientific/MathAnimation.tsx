import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Play, Pause } from 'lucide-react';

interface MathAnimationProps {
  equation: (t: number, x: number) => number;
  xRange?: [number, number];
  tRange?: [number, number];
  title?: string;
  height?: number;
}

export default function MathAnimation({
  equation,
  xRange = [-10, 10],
  tRange = [0, 10],
  title = 'Equation Animation',
  height = 300,
}: MathAnimationProps) {
  const [t, setT] = useState(tRange[0]);
  const [playing, setPlaying] = useState(false);

  const data = useMemo(() => {
    const points = 200;
    const [xMin, xMax] = xRange;
    return Array.from({ length: points }, (_, i) => {
      const x = xMin + (i / (points - 1)) * (xMax - xMin);
      return { x, y: equation(t, x) };
    });
  }, [equation, t, xRange]);

  const handlePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    setPlaying(true);
    const interval = setInterval(() => {
      setT((prev) => {
        const next = prev + 0.05;
        if (next >= tRange[1]) {
          clearInterval(interval);
          setPlaying(false);
          return tRange[0];
        }
        return next;
      });
    }, 50);
  };

  return (
    <div className="tf-control-chart">
      <div className="tf-mb-3 flex items-center justify-between">
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--tf-text-primary)' }}>{title}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--tf-text-muted)', fontFamily: 'var(--tf-font-mono)' }}>t = {t.toFixed(2)}</span>
          <button onClick={handlePlay} className="tf-button tf-button--neutral" style={{ padding: '2px 8px', fontSize: '11px' }}>
            {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--tf-border-default)" />
          <XAxis dataKey="x" type="number" tick={{ fontSize: 12, fill: 'var(--tf-text-muted)' }} />
          <YAxis tick={{ fontSize: 12, fill: 'var(--tf-text-muted)' }} />
          <Tooltip
            contentStyle={{ background: 'var(--tf-panel)', border: '1px solid var(--tf-border-strong)', color: 'var(--tf-white)', fontSize: 12 }}
            formatter={(value: number) => [value.toFixed(4), 'f(x,t)']}
          />
          <ReferenceLine y={0} stroke="var(--tf-border-default)" />
          <Line type="monotone" dataKey="y" stroke="var(--tf-purple)" strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
