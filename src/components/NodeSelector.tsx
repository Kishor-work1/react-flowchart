import React from 'react';
import { MessageCircle } from 'lucide-react';
import { NodeSelectorItem } from '../types';

interface NodeSelectorProps {
  isVisible: boolean;
  onClose: () => void;
  onNodeSelect: (nodeType: string) => void;
}

const NodeSelector: React.FC<NodeSelectorProps> = ({ isVisible, onClose, onNodeSelect }) => {
  const nodeTypes: NodeSelectorItem[] = [
    {
      id: 'textMessage',
      label: 'Message',
      type: 'textMessage',
      icon: <MessageCircle className="w-6 h-6" />,
      description: 'Send a text message',
    },
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 max-w-md">
        <h2 className="text-lg font-semibold mb-4">Select Node Type</h2>
        <div className="space-y-3">
          {nodeTypes.map((nodeType) => (
            <button
              key={nodeType.id}
              onClick={() => {
                onNodeSelect(nodeType.type);
                onClose();
              }}
              className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-blue-600">{nodeType.icon}</div>
              <div className="text-left">
                <div className="font-medium">{nodeType.label}</div>
                <div className="text-sm text-gray-500">{nodeType.description}</div>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeSelector;