import React from 'react';
import { EdgeProps, getSmoothStepPath } from 'reactflow';

const CustomEdge: React.FC<EdgeProps> = (props) => {
  const [edgePath] = getSmoothStepPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  });

  return (
    <>
      <path
        id={props.id}
        style={{
          ...props.style,
          stroke: '#6b7280',
          strokeWidth: 2,
        }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={props.markerEnd}
      />
    </>
  );
};

export default CustomEdge;