// IGCSE/A-LEVELS Compliant Flowchart Generator

export type FlowchartNodeType =
  | 'start'        // Rounded rectangle (Start)
  | 'end'          // Rounded rectangle (End)
  | 'process'      // Rectangle (assignments, calculations)
  | 'input'        // Parallelogram (INPUT)
  | 'output'       // Parallelogram (OUTPUT)
  | 'decision'     // Diamond (IF, WHILE conditions)
  | 'procedure';   // Rectangle with double lines (FUNCTION/PROCEDURE calls)

export interface FlowchartNode {
  id: string;
  type: FlowchartNodeType;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  branches?: {
    true?: string;   // Next node ID for true branch
    false?: string;  // Next node ID for false branch
  };
  next?: string;     // Next node ID for non-branching nodes
}

export interface FlowchartConnection {
  from: string;
  to: string;
  label?: string;  // For decision branches (Yes/No, True/False)
  fromSide: 'top' | 'bottom' | 'left' | 'right';
  toSide: 'top' | 'bottom' | 'left' | 'right';
}

export interface Flowchart {
  nodes: FlowchartNode[];
  connections: FlowchartConnection[];
  width: number;
  height: number;
}

const NODE_WIDTH = 160;
const NODE_HEIGHT = 60;
const DECISION_SIZE = 120;
const VERTICAL_SPACING = 100;
const HORIZONTAL_SPACING = 200;
const START_X = 400;
const START_Y = 50;

interface ParsedStatement {
  type: FlowchartNodeType;
  content: string;
  indent: number;
  originalLine: string;
  lineNumber: number;
}

function parseCode(code: string): ParsedStatement[] {
  const lines = code.split('\n');
  const statements: ParsedStatement[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('//')) continue;

    const indent = line.search(/\S/);
    let type: FlowchartNodeType;
    let content = trimmed;

    // Determine node type based on keywords
    if (trimmed.startsWith('INPUT')) {
      type = 'input';
      content = trimmed;
    } else if (trimmed.startsWith('OUTPUT') || trimmed.startsWith('PRINT')) {
      type = 'output';
      content = trimmed;
    } else if (trimmed.startsWith('IF') || trimmed.startsWith('WHILE') || trimmed.startsWith('REPEAT')) {
      type = 'decision';
      // Extract condition
      if (trimmed.startsWith('IF')) {
        content = trimmed.replace('IF', '').replace('THEN', '').trim();
      } else if (trimmed.startsWith('WHILE')) {
        content = trimmed.replace('WHILE', '').replace('DO', '').trim();
      } else if (trimmed.startsWith('REPEAT')) {
        content = 'REPEAT';
      }
    } else if (trimmed.startsWith('CALL') || trimmed.includes('FUNCTION') || trimmed.includes('PROCEDURE')) {
      type = 'procedure';
      content = trimmed;
    } else if (trimmed.startsWith('DECLARE')) {
      type = 'process';
      content = trimmed;
    } else if (trimmed.includes('<-') || trimmed.includes(':=')) {
      type = 'process';
      content = trimmed;
    } else {
      // Default to process for other statements
      type = 'process';
      content = trimmed;
    }

    statements.push({
      type,
      content,
      indent,
      originalLine: line,
      lineNumber: i + 1
    });
  }

  return statements;
}

function generateNodes(statements: ParsedStatement[]): FlowchartNode[] {
  const nodes: FlowchartNode[] = [];

  // Add START node
  nodes.push({
    id: 'start',
    type: 'start',
    label: 'START',
    x: START_X,
    y: START_Y,
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  });

  let currentY = START_Y + NODE_HEIGHT + VERTICAL_SPACING;
  let currentX = START_X;

  // Track nesting level for decisions
  const indentStack: number[] = [0];
  const decisionStack: string[] = [];

  statements.forEach((stmt, index) => {
    const nodeId = `node_${index}`;

    // Adjust X position based on indent for nested structures
    if (stmt.indent > indentStack[indentStack.length - 1]) {
      indentStack.push(stmt.indent);
      currentX += HORIZONTAL_SPACING / 2;
    } else if (stmt.indent < indentStack[indentStack.length - 1]) {
      while (indentStack.length > 1 && stmt.indent < indentStack[indentStack.length - 1]) {
        indentStack.pop();
        currentX -= HORIZONTAL_SPACING / 2;
      }
    }

    let width = NODE_WIDTH;
    let height = NODE_HEIGHT;

    // Decisions are diamond-shaped and need more space
    if (stmt.type === 'decision') {
      width = DECISION_SIZE;
      height = DECISION_SIZE;
      decisionStack.push(nodeId);
    }

    // Truncate long labels
    let label = stmt.content;
    if (label.length > 30) {
      label = label.substring(0, 27) + '...';
    }

    nodes.push({
      id: nodeId,
      type: stmt.type,
      label,
      x: currentX,
      y: currentY,
      width,
      height,
      next: index < statements.length - 1 ? `node_${index + 1}` : 'end'
    });

    currentY += height + VERTICAL_SPACING;
  });

  // Add END node
  nodes.push({
    id: 'end',
    type: 'end',
    label: 'END',
    x: START_X,
    y: currentY,
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  });

  return nodes;
}

function generateConnections(nodes: FlowchartNode[]): FlowchartConnection[] {
  const connections: FlowchartConnection[] = [];

  nodes.forEach((node) => {
    if (node.next) {
      connections.push({
        from: node.id,
        to: node.next,
        fromSide: 'bottom',
        toSide: 'top'
      });
    }

    if (node.branches) {
      if (node.branches.true) {
        connections.push({
          from: node.id,
          to: node.branches.true,
          label: 'Yes',
          fromSide: 'right',
          toSide: 'left'
        });
      }
      if (node.branches.false) {
        connections.push({
          from: node.id,
          to: node.branches.false,
          label: 'No',
          fromSide: 'bottom',
          toSide: 'top'
        });
      }
    }
  });

  return connections;
}

export function generateFlowchart(code: string): Flowchart {
  const statements = parseCode(code);
  const nodes = generateNodes(statements);
  const connections = generateConnections(nodes);

  // Calculate flowchart dimensions
  let maxX = 0;
  let maxY = 0;

  nodes.forEach(node => {
    maxX = Math.max(maxX, node.x + node.width);
    maxY = Math.max(maxY, node.y + node.height);
  });

  return {
    nodes,
    connections,
    width: maxX + 100,
    height: maxY + 100
  };
}

export function renderNodePath(node: FlowchartNode): string {
  const { x, y, width, height, type } = node;
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  switch (type) {
    case 'start':
    case 'end':
      // Rounded rectangle (stadium shape)
      const rx = height / 2;
      return `M ${x + rx} ${y}
              L ${x + width - rx} ${y}
              A ${rx} ${rx} 0 0 1 ${x + width - rx} ${y + height}
              L ${x + rx} ${y + height}
              A ${rx} ${rx} 0 0 1 ${x + rx} ${y}
              Z`;

    case 'input':
    case 'output':
      // Parallelogram
      const offset = 20;
      return `M ${x + offset} ${y}
              L ${x + width} ${y}
              L ${x + width - offset} ${y + height}
              L ${x} ${y + height}
              Z`;

    case 'decision':
      // Diamond
      return `M ${centerX} ${y}
              L ${x + width} ${centerY}
              L ${centerX} ${y + height}
              L ${x} ${centerY}
              Z`;

    case 'process':
      // Rectangle
      return `M ${x} ${y}
              L ${x + width} ${y}
              L ${x + width} ${y + height}
              L ${x} ${y + height}
              Z`;

    case 'procedure':
      // Rectangle with double vertical lines
      return `M ${x} ${y}
              L ${x + width} ${y}
              L ${x + width} ${y + height}
              L ${x} ${y + height}
              Z`;

    default:
      return '';
  }
}

export function getConnectionPoints(node: FlowchartNode, side: 'top' | 'bottom' | 'left' | 'right'): [number, number] {
  const centerX = node.x + node.width / 2;
  const centerY = node.y + node.height / 2;

  if (node.type === 'decision') {
    // Diamond connection points
    switch (side) {
      case 'top':
        return [centerX, node.y];
      case 'bottom':
        return [centerX, node.y + node.height];
      case 'left':
        return [node.x, centerY];
      case 'right':
        return [node.x + node.width, centerY];
    }
  } else {
    // Rectangle-based shapes
    switch (side) {
      case 'top':
        return [centerX, node.y];
      case 'bottom':
        return [centerX, node.y + node.height];
      case 'left':
        return [node.x, centerY];
      case 'right':
        return [node.x + node.width, centerY];
    }
  }
}

export function renderConnection(connection: FlowchartConnection, nodes: FlowchartNode[]): string {
  const fromNode = nodes.find(n => n.id === connection.from);
  const toNode = nodes.find(n => n.id === connection.to);

  if (!fromNode || !toNode) return '';

  const [x1, y1] = getConnectionPoints(fromNode, connection.fromSide);
  const [x2, y2] = getConnectionPoints(toNode, connection.toSide);

  // Simple straight line or right-angle line
  if (connection.fromSide === 'bottom' && connection.toSide === 'top') {
    // Straight down
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  } else if (connection.fromSide === 'right' && connection.toSide === 'left') {
    // Straight right
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  } else {
    // Right-angle connection
    const midY = (y1 + y2) / 2;
    return `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
  }
}
