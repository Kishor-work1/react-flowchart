'use client'
import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Controls,
  ReactFlowProvider,
  ReactFlowInstance,
  ConnectionLineType,
  NodeTypes,
  EdgeTypes,
  NodeMouseHandler,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomEdge from './edges/CustomEdge';
import Header from './header';
import Sidebar from './Sidebar';
import NodeSelector from './NodeSelector';
import { useFlowBuilder } from '../hooks/useFlowBuilder';
import type { TextMessageNode as TextMessageNodeType } from '../types';
import TextMessageNode from './nodes/TextMessageNode'; // React component

// Define proper node types
const nodeTypes: NodeTypes = {
  textMessage: TextMessageNode,
};

// Define proper edge types
const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

const FlowBuilder: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [showNodeSelector, setShowNodeSelector] = useState<boolean>(false);
  const [pendingNodePosition, setPendingNodePosition] = useState<{ x: number; y: number } | null>(null);
  
  const {
    nodes,
    edges,
    selectedNode,
    setSelectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNodeData,
    onNodeClick,
    onPaneClick,
    saveFlow,
  } = useFlowBuilder();

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowBounds || !reactFlowInstance) return;

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      addNode(type, position);
    },
    [reactFlowInstance, addNode]
  );

  const handlePaneDoubleClick = useCallback((event: React.MouseEvent) => {
    const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
    if (!reactFlowBounds || !reactFlowInstance) return;

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    setPendingNodePosition(position);
    setShowNodeSelector(true);
  }, [reactFlowInstance]);

  const handleNodeSelect = useCallback((nodeType: string) => {
    if (pendingNodePosition) {
      addNode(nodeType, pendingNodePosition);
      setPendingNodePosition(null);
    }
    setShowNodeSelector(false);
  }, [addNode, pendingNodePosition]);

  const handleAddNodeFromSidebar = useCallback(() => {
    // Add node at center of viewport
    const position = reactFlowInstance?.project({ x: 250, y: 250 }) || { x: 250, y: 250 };
    addNode('textMessage', position);
  }, [reactFlowInstance, addNode]);

  const handleSave = useCallback(() => {
    saveFlow();
  }, [saveFlow]);

  const handleDeselectNode = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const handleCloseNodeSelector = useCallback(() => {
    setShowNodeSelector(false);
    setPendingNodePosition(null);
  }, []);

  // Properly typed node click handler
  const handleNodeClick: NodeMouseHandler = useCallback((event, node) => {
    if (onNodeClick && node.type === 'textMessage') {
      // Cast node to your specific type
      onNodeClick(event, node as TextMessageNodeType);
    }
  }, [onNodeClick]);

  // Properly typed pane click handler
  const handlePaneClick = useCallback(() => {
    if (onPaneClick) {
      onPaneClick();
    }
  }, [onPaneClick]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header onSave={handleSave} />
      
      <div className="flex flex-1 overflow-hidden">
        <ReactFlowProvider>
          <div className="flex-1 relative" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onPaneClick={handlePaneClick}
              onDoubleClick={handlePaneDoubleClick}
              onNodeClick={handleNodeClick}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              connectionLineType={ConnectionLineType.SmoothStep}
              fitView
              attributionPosition="bottom-left"
            >
             
              <Controls position="bottom-left" />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
        
        <Sidebar
          selectedNode={selectedNode}
          onNodeUpdate={updateNodeData}
          onAddNode={handleAddNodeFromSidebar}
          onDeselectNode={handleDeselectNode}
        />
      </div>
      
      <NodeSelector
        isVisible={showNodeSelector}
        onClose={handleCloseNodeSelector}
        onNodeSelect={handleNodeSelect}
      />
    </div>
  );
};

export default FlowBuilder;