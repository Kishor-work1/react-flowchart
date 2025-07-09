import { useState, useCallback } from 'react';
import { 
  useNodesState, 
  useEdgesState, 
  addEdge, 
  Connection,
  MarkerType,
  Edge 
} from 'reactflow';
import { TextMessageNode, TextMessageNodeData, FlowEdge } from '../types';


export const useFlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<TextMessageNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNode, setSelectedNode] = useState<TextMessageNode | null>(null);
  const [nodeIdCounter, setNodeIdCounter] = useState(1);

  const onConnect = useCallback((params: Connection) => {
    if (!params.source || !params.target) return; // Prevent invalid edges

    const newEdge: FlowEdge = {
      id: `edge-${params.source}-${params.target}`,
      source: params.source, // explicitly string
      target: params.target, // explicitly string
      sourceHandle: params.sourceHandle,
      targetHandle: params.targetHandle,
      type: 'custom',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
      },
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }, [setEdges]);

  const addNode = useCallback((type: string, position: { x: number; y: number }) => {
    const id = `node-${nodeIdCounter}`;
    const newNode: TextMessageNode = {
      id,
      type: 'textMessage',
      position,
      data: {
        text: 'New message',
        isSelected: false,
      },
    };
    
    setNodes((nds) => [...nds, newNode]);
    setNodeIdCounter((counter) => counter + 1);
    return newNode;
  }, [nodeIdCounter, setNodes]);

  const updateNodeData = useCallback((nodeId: string, data: Partial<TextMessageNodeData>) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...data } };
        }
        return node;
      })
    );
  }, [setNodes]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: TextMessageNode) => {
    // Clear previous selection
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: { ...n.data, isSelected: false },
      }))
    );
    
    // Set new selection
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === node.id) {
          return { ...n, data: { ...n.data, isSelected: true } };
        }
        return n;
      })
    );
    
    setSelectedNode(node);
  }, [setNodes]);

  const onPaneClick = useCallback(() => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: { ...n.data, isSelected: false },
      }))
    );
    setSelectedNode(null);
  }, [setNodes]);

  const validateFlow = useCallback((): { isValid: boolean; error?: string } => {
    if (nodes.length === 0) {
      return { isValid: false, error: 'Flow must have at least one node' };
    }

    // Check for nodes with empty messages
    const emptyNodes = nodes.filter(node => !node.data.text.trim());
    if (emptyNodes.length > 0) {
      return { isValid: false, error: 'All nodes must have a message' };
    }

    // Check for nodes with more than one outgoing edge
    const nodeOutgoingEdges = nodes.map(node => ({
      nodeId: node.id,
      outgoing: edges.filter(edge => edge.source === node.id).length
    }));

    const invalidNodes = nodeOutgoingEdges.filter(node => node.outgoing > 1);
    if (invalidNodes.length > 0) {
      return { isValid: false, error: 'A node can only have one outgoing edge' };
    }

    return { isValid: true };
  }, [nodes, edges]);

  const saveFlow = useCallback(() => {
    const validation = validateFlow();
    if (!validation.isValid) {
      alert(validation.error);
      return false;
    }
    
    const flowData = {
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: { text: node.data.text }
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type
      }))
    };
    
    console.log('Flow saved:', flowData);
    alert('Flow saved successfully!');
    return true;
  }, [nodes, edges, validateFlow]);

  return {
    nodes,
    edges,
    selectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNodeData,
    setSelectedNode,
    onNodeClick,
    onPaneClick,
    saveFlow,
    validateFlow,
  };
};