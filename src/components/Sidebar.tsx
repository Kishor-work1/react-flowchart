import React, { useState } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { TextMessageNode, TextMessageNodeData } from '../types';

interface SidebarProps {
  selectedNode: TextMessageNode | null;
  onNodeUpdate: (nodeId: string, data: Partial<TextMessageNodeData>) => void;
  onAddNode: () => void;
  onDeselectNode: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedNode, onNodeUpdate, onAddNode }) => {
  const [editingText, setEditingText] = useState('');

  React.useEffect(() => {
    if (selectedNode) {
      setEditingText(selectedNode.data.text);
    }
  }, [selectedNode]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditingText(e.target.value);
  };

  const handleTextSave = () => {
    if (selectedNode) {
      onNodeUpdate(selectedNode.id, { text: editingText });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleTextSave();
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {selectedNode ? (
        // Node Editor
        <div className="flex-1 p-4">
          <div className="flex items-center gap-2 mb-4">
            <ArrowLeft className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-800">Message</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text
              </label>
              <textarea
                value={editingText}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                onBlur={handleTextSave}
                className="
                  w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  text-black
                  dark:text-white
                  bg-white
                  dark:bg-gray-800
                "
                rows={4}
                placeholder="Enter your message here..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Press Ctrl+Enter to save
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Node Selector
        <div className="flex-1 p-4">
          <h3 className="text-lg font-semibold mb-4">Nodes Panel</h3>
          <div className="space-y-3">
            <div
              onClick={onAddNode}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <div className="flex flex-col items-center gap-2">
                <MessageCircle className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Message</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Instructions</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Drag nodes to the canvas</li>
              <li>• Connect nodes by dragging from handles</li>
              <li>• Click nodes to edit their content</li>
              <li>• Save your flow when ready</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;