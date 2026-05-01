/**
 * @fileoverview ProcessStats — Process statistics and aggregate view.
 * Shows distribution by state, top consumers, and summary metrics.
 *
 * @module @torafirma/design-system/runtime-trace-console/ProcessStats
 */

import React, { useMemo } from "react";
import type { BaseComponentProps, ProcessInfo } from "./types";

/** Props for ProcessStats. */
export interface ProcessStatsProps extends BaseComponentProps {
  /** Processes to analyze. */
  processes: ProcessInfo[];
  /** Number of top consumers to show. */
  topCount?: number;
}

/**
 * ProcessStats — Aggregate statistics for a process collection.
 *
 * Displays state distribution, CPU/memory histograms, and top consumers.
 *
 * @example
 * ```tsx
 * <ProcessStats processes={allProcs} topCount={10} />
 * ```
 */
export const ProcessStats: React.FC<ProcessStatsProps> = ({
  processes,
  topCount = 5,
  className = "",
  "data-testid": dataTestId = "process-stats",
}) => {
  const stats = useMemo(() => {
    const byState: Record<string, number> = {};
    let totalCpu = 0;
    let totalMem = 0;
    let totalThreads = 0;

    for (const p of processes) {
      byState[p.state] = (byState[p.state] || 0) + 1;
      totalCpu += p.cpuPercent;
      totalMem += p.memoryMb;
      totalThreads += p.threads;
    }

    const topCpu = [...processes]
      .sort((a, b) => b.cpuPercent - a.cpuPercent)
      .slice(0, topCount);

    const topMem = [...processes]
      .sort((a, b) => b.memoryMb - a.memoryMb)
      .slice(0, topCount);

    return { byState, totalCpu, totalMem, totalThreads, topCpu, topMem };
  }, [processes, topCount]);

  return (
    <div
      className={`tf-process-stats ${className}`}
      data-testid={dataTestId}
    >
      {/* Summary */}
      <div className="tf-process-stats__summary">
        <div className="tf-process-stats__stat">
          <span className="tf-process-stats__stat-label">Total</span>
          <span className="tf-process-stats__stat-value">
            {processes.length}
          </span>
        </div>
        <div className="tf-process-stats__stat">
          <span className="tf-process-stats__stat-label">CPU</span>
          <span className="tf-process-stats__stat-value">
            {stats.totalCpu.toFixed(1)}%
          </span>
        </div>
        <div className="tf-process-stats__stat">
          <span className="tf-process-stats__stat-label">Memory</span>
          <span className="tf-process-stats__stat-value">
            {stats.totalMem.toFixed(0)}MB
          </span>
        </div>
        <div className="tf-process-stats__stat">
          <span className="tf-process-stats__stat-label">Threads</span>
          <span className="tf-process-stats__stat-value">
            {stats.totalThreads}
          </span>
        </div>
      </div>

      {/* State Distribution */}
      <div className="tf-process-stats__section">
        <h4 className="tf-process-stats__section-title">State Distribution</h4>
        {Object.entries(stats.byState).map(([state, count]) => (
          <div key={state} className="tf-process-stats__distribution">
            <span className="tf-process-stats__distribution-label">{state}</span>
            <div className="tf-process-stats__distribution-bar">
              <div
                className="tf-process-stats__distribution-fill"
                style={{
                  width: `${(count / processes.length) * 100}%`,
                }}
              />
            </div>
            <span className="tf-process-stats__distribution-value">
              {count}
            </span>
          </div>
        ))}
      </div>

      {/* Top CPU */}
      <div className="tf-process-stats__section">
        <h4 className="tf-process-stats__section-title">
          Top CPU Consumers
        </h4>
        <ol className="tf-process-stats__ranking">
          {stats.topCpu.map((p, i) => (
            <li key={p.pid} className="tf-process-stats__ranking-item">
              <span className="tf-process-stats__rank">{i + 1}</span>
              <span className="tf-process-stats__ranking-name">{p.name}</span>
              <span className="tf-process-stats__ranking-value">
                {p.cpuPercent.toFixed(1)}%
              </span>
              <div className="tf-process-stats__ranking-bar">
                <div
                  className="tf-process-stats__ranking-fill"
                  style={{
                    width: `${Math.min(p.cpuPercent, 100)}%`,
                  }}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Top Memory */}
      <div className="tf-process-stats__section">
        <h4 className="tf-process-stats__section-title">
          Top Memory Consumers
        </h4>
        <ol className="tf-process-stats__ranking">
          {stats.topMem.map((p, i) => (
            <li key={p.pid} className="tf-process-stats__ranking-item">
              <span className="tf-process-stats__rank">{i + 1}</span>
              <span className="tf-process-stats__ranking-name">{p.name}</span>
              <span className="tf-process-stats__ranking-value">
                {p.memoryMb.toFixed(1)}MB
              </span>
              <div className="tf-process-stats__ranking-bar">
                <div
                  className="tf-process-stats__ranking-fill"
                  style={{
                    width: `${Math.min((p.memoryMb / stats.totalMem) * 100, 100)}%`,
                  }}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

ProcessStats.displayName = "ProcessStats";

export default ProcessStats;
