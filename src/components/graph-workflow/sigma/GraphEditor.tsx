import { useState, useCallback, useRef } from 'react';
import Graph from 'graphology';
import { Download, Upload, Undo2, Redo2, Plus, Trash2, MousePointer, GitBranch } from 'lucide-react';
import GraphViewer, { type GraphSelection } from './GraphViewer';
import {
  type NodeType,
  type EdgeType,
  NODE_COLORS,
  EDGE_COLORS,
  exportGraphJSON,
  importGraphJSON,
} from './graphUtils';

type EditorMode = 'select' | 'addNode' | 'addEdge';

interface HistoryEntry {
  json: string;
}

export default function GraphEditor() {
  const [graph, setGraph] = useState<Graph>(() => {
    const g = new Graph();
    // Seed with empty graph so user can build from scratch
    return g;
  });
  const [mode, setMode] = useState<EditorMode>('select');
  const [selectedNodeType, setSelectedNodeType] = useState<NodeType>('system');
  const [selectedEdgeType, setSelectedEdgeType] = useState<EdgeType>('passive');
  const [selection, setSelection] = useState<GraphSelection>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const edgeSourceRef = useRef<string | null>(null);

  const pushHistory = useCallback(
    (g: Graph) => {
      const json = exportGraphJSON(g);
      const next = history.slice(0, historyIndex + 1);
      next.push({ json });
      if (next.length > 50) next.shift();
      setHistory(next);
      setHistoryIndex(next.length - 1);
    },
    [history, historyIndex]
  );

  const undo = useCallback(() => {
    if (historyIndex <= 0) return;
    const idx = historyIndex - 1;
    const g = importGraphJSON(history[idx].json);
    setGraph(g);
    setHistoryIndex(idx);
    setSelection(null);
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;
    const idx = historyIndex + 1;
    const g = importGraphJSON(history[idx].json);
    setGraph(g);
    setHistoryIndex(idx);
    setSelection(null);
  }, [history, historyIndex]);

  const addNode = useCallback(
    (label?: string) => {
      const id = `n-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const g = graph.copy();
      g.addNode(id, {
        label: label || `${selectedNodeType}-${id.slice(-4)}`,
        type: selectedNodeType,
        size: selectedNodeType === 'system' ? 12 : 8,
        color: NODE_COLORS[selectedNodeType],
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
      });
      setGraph(g);
      pushHistory(g);
    },
    [graph, selectedNodeType, pushHistory]
  );

  const handleSelect = useCallback(
    (sel: GraphSelection) => {
      setSelection(sel);
      if (mode === 'addEdge' && sel?.kind === 'node') {
        if (!edgeSourceRef.current) {
          edgeSourceRef.current = sel.id;
        } else if (edgeSourceRef.current !== sel.id) {
          const g = graph.copy();
          const edgeId = `e-${Date.now()}`;
          if (!g.hasEdge(edgeSourceRef.current, sel.id)) {
            g.addEdgeWithKey(edgeId, edgeSourceRef.current, sel.id, {
              type: selectedEdgeType,
              color: EDGE_COLORS[selectedEdgeType],
              size: selectedEdgeType === 'plastic' ? 3 : 1.5,
              label: selectedEdgeType,
            });
            setGraph(g);
            pushHistory(g);
          }
          edgeSourceRef.current = null;
        }
      }
    },
    [mode, graph, selectedEdgeType, pushHistory]
  );

  const deleteSelection = useCallback(() => {
    if (!selection) return;
    const g = graph.copy();
    if (selection.kind === 'node') {
      g.dropNode(selection.id);
    } else {
      g.dropEdge(selection.id);
    }
    setGraph(g);
    pushHistory(g);
    setSelection(null);
  }, [selection, graph, pushHistory]);

  const handleImport = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        try {
          const g = importGraphJSON(text);
          setGraph(g);
          pushHistory(g);
          setSelection(null);
        } catch {
          alert('Invalid graph JSON');
        }
      };
      reader.readAsText(file);
    },
    [pushHistory]
  );

  const handleExport = useCallback(() => {
    const blob = new Blob([exportGraphJSON(graph)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'graph.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [graph]);

  const selectedAttrs = selection
    ? selection.kind === 'node'
      ? graph.getNodeAttributes(selection.id)
      : graph.getEdgeAttributes(selection.id)
    : null;

  return (
    <div className="flex flex-col h-full w-full" style={{ background: 'var(--tf-black)' }}>
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: '1px solid var(--tf-border-subtle)', background: 'var(--tf-void)' }}
      >
        <button
          onClick={() => setMode('select')}
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${mode === 'select' ? 'font-semibold' : ''}`}
          style={{
            background: mode === 'select' ? 'var(--tf-panel)' : 'transparent',
            color: mode === 'select' ? 'var(--tf-green)' : 'var(--tf-steel500)',
            border: '1px solid var(--tf-border-subtle)',
          }}
        >
          <MousePointer className="w-3 h-3" /> Select
        </button>
        <button
          onClick={() => { setMode('addNode'); addNode(); }}
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${mode === 'addNode' ? 'font-semibold' : ''}`}
          style={{
            background: mode === 'addNode' ? 'var(--tf-panel)' : 'transparent',
            color: mode === 'addNode' ? 'var(--tf-green)' : 'var(--tf-steel500)',
            border: '1px solid var(--tf-border-subtle)',
          }}
        >
          <Plus className="w-3 h-3" /> Node
        </button>
        <button
          onClick={() => { setMode('addEdge'); edgeSourceRef.current = null; }}
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${mode === 'addEdge' ? 'font-semibold' : ''}`}
          style={{
            background: mode === 'addEdge' ? 'var(--tf-panel)' : 'transparent',
            color: mode === 'addEdge' ? 'var(--tf-green)' : 'var(--tf-steel500)',
            border: '1px solid var(--tf-border-subtle)',
          }}
        >
          <GitBranch className="w-3 h-3" /> Edge
        </button>

        <div className="w-px h-4 mx-1" style={{ background: 'var(--tf-border-subtle)' }} />

        <button onClick={undo} disabled={historyIndex <= 0} className="p-1 rounded text-xs" style={{ color: historyIndex <= 0 ? '#3a4d5d' : 'var(--tf-steel500)' }}>
          <Undo2 className="w-3 h-3" />
        </button>
        <button onClick={redo} disabled={historyIndex >= history.length - 1} className="p-1 rounded text-xs" style={{ color: historyIndex >= history.length - 1 ? '#3a4d5d' : 'var(--tf-steel500)' }}>
          <Redo2 className="w-3 h-3" />
        </button>

        <div className="w-px h-4 mx-1" style={{ background: 'var(--tf-border-subtle)' }} />

        <button onClick={deleteSelection} disabled={!selection} className="flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ color: selection ? 'var(--tf-red)' : '#3a4d5d', border: '1px solid var(--tf-border-subtle)' }}>
          <Trash2 className="w-3 h-3" /> Delete
        </button>

        <div className="flex-1" />

        <button onClick={handleExport} className="flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ color: 'var(--tf-steel500)', border: '1px solid var(--tf-border-subtle)' }}>
          <Download className="w-3 h-3" /> Export
        </button>
        <label className="flex items-center gap-1 px-2 py-1 rounded text-xs cursor-pointer" style={{ color: 'var(--tf-steel500)', border: '1px solid var(--tf-border-subtle)' }}>
          <Upload className="w-3 h-3" /> Import
          <input type="file" accept=".json" className="hidden" onChange={(e) => e.target.files?.[0] && handleImport(e.target.files[0])} />
        </label>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Canvas */}
        <div className="flex-1 relative">
          <GraphViewer graph={graph} selection={selection} onSelect={handleSelect} />
          {mode === 'addEdge' && (
            <div className="absolute top-2 left-2 px-2 py-1 rounded text-xs" style={{ background: 'var(--tf-panel)', color: 'var(--tf-amber)', border: '1px solid var(--tf-border-subtle)' }}>
              {edgeSourceRef.current ? 'Select target node' : 'Select source node'}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div
          className="w-64 flex-shrink-0 overflow-auto"
          style={{ borderLeft: '1px solid var(--tf-border-subtle)', background: 'var(--tf-void)' }}
        >
          {/* Node type palette */}
          <div className="px-3 py-3" style={{ borderBottom: '1px solid var(--tf-border-subtle)' }}>
            <h4 className="text-xs font-semibold mb-2" style={{ color: 'var(--tf-steel500)', fontFamily: 'var(--tf-font-mono)' }}>NODE TYPE</h4>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(NODE_COLORS) as NodeType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedNodeType(t)}
                  className="px-2 py-1 rounded text-xs capitalize"
                  style={{
                    background: selectedNodeType === t ? NODE_COLORS[t] : 'var(--tf-panel)',
                    color: selectedNodeType === t ? '#050608' : 'var(--tf-white)',
                    border: '1px solid var(--tf-border-subtle)',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Edge type palette */}
          <div className="px-3 py-3" style={{ borderBottom: '1px solid var(--tf-border-subtle)' }}>
            <h4 className="text-xs font-semibold mb-2" style={{ color: 'var(--tf-steel500)', fontFamily: 'var(--tf-font-mono)' }}>EDGE TYPE</h4>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(EDGE_COLORS) as EdgeType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedEdgeType(t)}
                  className="px-2 py-1 rounded text-xs capitalize"
                  style={{
                    background: selectedEdgeType === t ? EDGE_COLORS[t] : 'var(--tf-panel)',
                    color: selectedEdgeType === t ? '#050608' : 'var(--tf-white)',
                    border: '1px solid var(--tf-border-subtle)',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Properties */}
          {selection && selectedAttrs && (
            <div className="px-3 py-3">
              <h4 className="text-xs font-semibold mb-2" style={{ color: 'var(--tf-steel500)', fontFamily: 'var(--tf-font-mono)' }}>
                {selection.kind.toUpperCase()} PROPERTIES
              </h4>
              <div className="space-y-2">
                {Object.entries(selectedAttrs).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span style={{ color: 'var(--tf-steel500)' }}>{key}</span>
                    <span style={{ color: 'var(--tf-white)', fontFamily: 'var(--tf-font-mono)' }}>
                      {typeof value === 'string' ? value : JSON.stringify(value).slice(0, 30)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!selection && (
            <div className="px-3 py-3 text-xs" style={{ color: 'var(--tf-steel500)' }}>
              Click a node or edge to inspect properties.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
