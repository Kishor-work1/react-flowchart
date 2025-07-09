import React from 'react';
import { Handle, Position } from 'reactflow';
import { MessageCircle } from 'lucide-react';
import { TextMessageNodeData } from '../../types';

interface TextMessageNodeProps {
  data: TextMessageNodeData;
  isConnectable: boolean;
}

const TextMessageNode: React.FC<TextMessageNodeProps> = ({ data, isConnectable }) => {
  return (
    <div className={`
      bg-white border-2 rounded-lg shadow-md min-w-[200px] max-w-[250px]
      ${data.isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-200'}
      transition-all duration-200 hover:shadow-lg
    `}>
      {/* Header */}
      <div className="bg-teal-100 px-3 py-2 rounded-t-lg flex items-center gap-2">
        <MessageCircle className="w-4 h-4 text-teal-600" />
        <span className="text-sm font-medium text-teal-800">Send Message</span>
      </div>
      
      {/* Content */}
      <div className="p-3">
        <p className="text-sm text-gray-700 line-clamp-3">
          {data.text}
        </p>
      </div>
      
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
    </div>
  );
};

export default TextMessageNode;