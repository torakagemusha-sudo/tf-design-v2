import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface PhasePlotProps {
  xData: number[];
  yData: number[];
  xLabel?: string;
  yLabel?: string;
  title?: string;
  height?: number;
}

export default function PhasePlot({ xData, yData, xLabel = 'X', yLabel = 'Y', title = 'Phase Portrait', height = 300 }: PhasePlotProps) {
  const data = useMemo(() => {
    const minLen = Math.min(xData.length, yData.length);
    return Array.from({ length: minLen }, (_, i) => ({ x: xData[i], y: yData[i], t: i }));
  }, [xData, yData]);

  const meanX = useMemo(() => xData.reduce((a, b) => a + b, 0) / xData.length, [xData]);
  const meanY = useMemo(() => yData.reduce((a, b) => a + b, 0) / yData.length, [yData]);

  return (
    <div className="tf-control-chart">
      <div className="tf-mb-3" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--tf-text-primary)' }}>{title}</div>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--tf-border-default)" />
          <XAxis dataKey="x" type="number" tick={{ fontSize: 12, fill: 'var(--tf-text-muted)' }} label={{ value: xLabel, position: 'insideBottomRight', offset: -5, fill: 'var(--tf-text-muted)', fontSize: 11 }} />
          <YAxis dataKey="y" type="number" tick={{ fontSize: 12, fill: 'var(--tf-text-muted)' }} label={{ value: yLabel, angle: -90, position: 'insideLeft', fill: 'var(--tf-text-muted)', fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: 'var(--tf-panel)', border: '1px solid var(--tf-border-strong)', color: 'var(--tf-white)', fontSize: 12 }}
            formatter={(value: number, name: string) => [value.toFixed(3), name]}
            labelFormatter={() => ''}
          />
          <ReferenceLine x={meanX} stroke="var(--tf-blue)" strokeDasharray="4 4" />
          <ReferenceLine y={meanY} stroke="var(--tf-blue)" strokeDasharray="4 4" />
          <Line type="monotone" dataKey="y" stroke="var(--tf-green)" strokeWidth={1.5} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
