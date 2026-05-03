import { useEffect, useRef, useState, useCallback } from 'react';
import Sigma from 'sigma';
import Graph from 'graphology';
import forceAtlas2 from 'graphology-layout-forceatlas2';
import type { EdgeType, NodeType } from './graphUtils';
import { NODE_COLORS, EDGE_COLORS } from './graphUtils';

type GraphInstance = InstanceType<typeof Graph>;
type SigmaInstance = InstanceType<typeof Sigma>;
export type GraphSelection =
  | { kind: 'node'; id: string; attrs: Record<string, unknown> }
  | { kind: 'edge'; id: string; attrs: Record<string, unknown> }
  | null;

interface GraphViewerProps {
  graph: GraphInstance;
  selection?: GraphSelection;
  onSelect?: (sel: GraphSelection) => void;
}

export default function GraphViewer({ graph, onSelect }: GraphViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sigmaRef = useRef<SigmaInstance | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);
  const [initError, setInitError] = useState<string>('');

  const handleNodeClick = useCallback(
    (node: string) => {
      onSelect?.({ kind: 'node', id: node, attrs: graph.getNodeAttributes(node) });
    },
    [graph, onSelect]
  );

  const handleEdgeClick = useCallback(
    (edge: string) => {
      onSelect?.({ kind: 'edge', id: edge, attrs: graph.getEdgeAttributes(edge) });
    },
    [graph, onSelect]
  );

  useEffect(() => {
    if (!containerRef.current) return;
    setInitError('');

    try {
      // Work on a copy so we don't mutate the caller's graph
      const displayGraph = graph.copy() as GraphInstance;

      // Initialise node positions if missing
      displayGraph.forEachNode((node, attr) => {
        if (typeof attr.x !== 'number' || typeof attr.y !== 'number') {
          displayGraph.setNodeAttribute(node, 'x', Math.random() * 100);
          displayGraph.setNodeAttribute(node, 'y', Math.random() * 100);
        }
      });

      // Run force-directed layout
      if (displayGraph.order > 0) {
        forceAtlas2.assign(displayGraph, {
          iterations: 120,
          settings: {
            gravity: 0.05,
            scalingRatio: 8,
            barnesHutOptimize: true,
          },
        });
      }

      const renderer = new Sigma(displayGraph, containerRef.current, {
        defaultEdgeType: 'line',
        defaultEdgeColor: '#6a7d8d',
        defaultNodeColor: '#3b9aed',
        labelSize: 12,
        labelWeight: 'bold',
        labelColor: { color: '#e8ebed' },
        edgeLabelSize: 10,
        edgeLabelColor: { color: '#9aa8b8' },
        enableEdgeEvents: true,
        minCameraRatio: 0.1,
        maxCameraRatio: 10,
        nodeReducer: (node, data) => {
          const res: Record<string, unknown> = { ...data };
          if (hoveredNode) {
            if (node !== hoveredNode && !displayGraph.hasExtremity(node, hoveredNode)) {
              res.color = '#1a2332';
              res.label = '';
            }
          }
          return res;
        },
        edgeReducer: (edge, data) => {
          const res: Record<string, unknown> = { ...data };
          if (hoveredNode && !displayGraph.hasExtremity(edge, hoveredNode)) {
            res.color = '#0f1724';
            res.label = '';
          }
          if (hoveredEdge && edge !== hoveredEdge) {
            res.color = '#0f1724';
          }
          return res;
        },
      });

      sigmaRef.current = renderer;

      renderer.on('clickNode', ({ node }) => handleNodeClick(node));
      renderer.on('clickEdge', ({ edge }) => handleEdgeClick(edge));
      renderer.on('enterNode', ({ node }) => setHoveredNode(node));
      renderer.on('leaveNode', () => setHoveredNode(null));
      renderer.on('enterEdge', ({ edge }) => setHoveredEdge(edge));
      renderer.on('leaveEdge', () => setHoveredEdge(null));

      // ResizeObserver for responsive canvas
      const ro = new ResizeObserver(() => {
        renderer.resize();
        renderer.scheduleRender();
      });
      ro.observe(containerRef.current);

      return () => {
        ro.disconnect();
        renderer.kill();
        sigmaRef.current = null;
      };
    } catch (e: any) {
      setInitError(e?.message || 'Failed to initialise graph renderer');
      return;
    }
  }, [graph, handleNodeClick, handleEdgeClick]);

  // Update reducers when hover state changes
  useEffect(() => {
    sigmaRef.current?.refresh();
  }, [hoveredNode, hoveredEdge]);

  if (initError) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-xs text-center" style={{ color: 'var(--tf-red)' }}>
          {initError}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded"
      style={{ background: '#050608' }}
    />
  );
}
