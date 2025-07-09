import { Node, Edge } from 'reactflow';

export interface TextMessageNodeData {
  text: string;
  isSelected?: boolean;
}

export type TextMessageNode = Node<TextMessageNodeData, 'textMessage'>;


export type FlowEdge = Edge & { type: 'custom' };

export interface FlowState {
  nodes: TextMessageNode[];
  edges: FlowEdge[];
}

export interface NodeSelectorItem {
  id: string;
  label: string;
  type: string;
  icon: React.ReactNode;
  description: string;
}