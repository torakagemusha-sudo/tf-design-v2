import Graph from 'graphology';

export type NodeType = 'system' | 'sensor' | 'actuator' | 'controller';
export type EdgeType = 'plastic' | 'active' | 'adaptive' | 'passive';

export const NODE_COLORS: Record<NodeType, string> = {
  system: '#3b9aed',
  sensor: '#27c686',
  actuator: '#f0a020',
  controller: '#a855f7',
};

export const EDGE_COLORS: Record<EdgeType, string> = {
  plastic: '#e8453c',
  active: '#27c686',
  adaptive: '#f0a020',
  passive: '#6a7d8d',
};

export function createSampleGraph(): Graph {
  const graph = new Graph();

  const nodes: { id: string; type: NodeType; label: string }[] = [
    { id: 'reactor-core', type: 'system', label: 'Reactor Core' },
    { id: 'coolant-pump', type: 'actuator', label: 'Coolant Pump' },
    { id: 'temp-sensor', type: 'sensor', label: 'Temp Sensor' },
    { id: 'pressure-sensor', type: 'sensor', label: 'Pressure Sensor' },
    { id: 'ctrl-rod', type: 'actuator', label: 'Control Rod' },
    { id: 'scram-controller', type: 'controller', label: 'SCRAM Controller' },
    { id: 'power-grid', type: 'system', label: 'Power Grid' },
  ];

  nodes.forEach((n) => {
    graph.addNode(n.id, {
      label: n.label,
      type: n.type,
      size: n.type === 'system' ? 12 : 8,
      color: NODE_COLORS[n.type],
    });
  });

  const edges: [string, string, EdgeType][] = [
    ['reactor-core', 'temp-sensor', 'passive'],
    ['reactor-core', 'pressure-sensor', 'passive'],
    ['scram-controller', 'ctrl-rod', 'active'],
    ['scram-controller', 'coolant-pump', 'active'],
    ['temp-sensor', 'scram-controller', 'adaptive'],
    ['pressure-sensor', 'scram-controller', 'adaptive'],
    ['reactor-core', 'power-grid', 'plastic'],
    ['ctrl-rod', 'reactor-core', 'plastic'],
    ['coolant-pump', 'reactor-core', 'plastic'],
  ];

  edges.forEach(([source, target, type], i) => {
    graph.addEdgeWithKey(`e${i}`, source, target, {
      type,
      color: EDGE_COLORS[type],
      size: type === 'plastic' ? 3 : 1.5,
      label: type,
    });
  });

  return graph;
}

export function exportGraphJSON(graph: Graph): string {
  return JSON.stringify(graph.export());
}

export function importGraphJSON(json: string): Graph {
  const graph = new Graph();
  graph.import(JSON.parse(json));
  return graph;
}
