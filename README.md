![image](https://github.com/user-attachments/assets/1e269eb8-1bcd-4246-a4c5-329d4b5396f7)

# Chatbot Flow Builder

A modern, extensible chatbot flow builder built with Next.js, TypeScript, and React Flow. This application allows users to create, edit, and manage chatbot conversation flows through an intuitive drag-and-drop interface.

## Features

### Core Features
- **Drag & Drop Interface**: Easily add and arrange message nodes on the canvas
- **Node Connections**: Connect nodes to define conversation flow paths
- **Real-time Editing**: Click on nodes to edit their content inline
- **Visual Flow Design**: Clean, modern interface with smooth animations
- **Flow Validation**: Comprehensive validation to ensure flow integrity
- **Save/Export**: Save flow configurations for later use

### Technical Features
- **TypeScript**: Full type safety and better development experience
- **React Flow**: Professional-grade flow visualization library
- **Tailwind CSS**: Modern, responsive styling
- **Custom Components**: Extensible node and edge types
- **State Management**: Efficient state handling with React hooks
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, or pnpm package manager

### Installation

1. **Clone or create the project:**
```bash
npx create-next-app@latest chatbot-flow-builder --typescript --tailwind --eslint --app --src-dir
cd chatbot-flow-builder
```

2. **Install dependencies:**
```bash
npm install reactflow lucide-react
```

3. **Copy the source files** from the provided code artifacts to your project directory

4. **Start the development server:**
```bash
npm run dev
```

5. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and React Flow styling
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main page component
├── components/
│   ├── edges/
│   │   └── CustomEdge.tsx  # Custom edge component
│   ├── nodes/
│   │   └── TextMessageNode.tsx  # Text message node component
│   ├── FlowBuilder.tsx     # Main flow builder component
│   ├── Header.tsx          # Application header
│   ├── NodeSelector.tsx    # Node type selector modal
│   └── Sidebar.tsx         # Sidebar with node panel and editor
├── hooks/
│   └── useFlowBuilder.ts   # Custom hook for flow management
├── types/
│   └── index.ts           # TypeScript type definitions
├── utils/
│   └── flowUtils.ts       # Utility functions for flow operations
└── constants/
    └── index.ts           # Application constants
```

## Usage

### Creating a Flow

1. **Add Nodes**: 
   - Click the "Message" button in the sidebar to add a new text node
   - Or double-click on the canvas to open the node selector

2. **Edit Messages**: 
   - Click on any node to select it
   - Edit the message content in the sidebar
   - Press Ctrl+Enter or click outside to save

3. **Connect Nodes**: 
   - Drag from the bottom handle of one node to the top handle of another
   - This creates a connection defining the conversation flow

4. **Save Flow**: 
   - Click the "Save Changes" button in the header
   - The system will validate your flow and save it if valid

### Flow Validation Rules

- **At least one node**: Flow must contain at least one message node
- **Non-empty messages**: All nodes must have message content
- **Single outgoing connection**: Each node can only have one outgoing connection
- **Connected flow**: All nodes should be part of the conversation flow

### Keyboard Shortcuts

- **Ctrl+Enter**: Save current node text (in editor)
- **Delete**: Delete selected node or edge
- **Ctrl+S**: Save flow
- **Double-click**: Add new node at cursor position

## Customization

### Adding New Node Types

1. **Create the node component** in `src/components/nodes/`:
```typescript
const CustomNode: React.FC<NodeProps> = ({ data }) => {
  // Your node implementation
  return <div>Custom Node</div>;
};
```

2. **Register the node type** in `FlowBuilder.tsx`:
```typescript
const nodeTypes = {
  textMessage: TextMessageNode,
  customNode: CustomNode,
};
```

3. **Add to node selector** in `NodeSelector.tsx`:
```typescript
const nodeTypes = [
  // ... existing nodes
  {
    id: 'customNode',
    label: 'Custom Node',
    type: 'customNode',
    icon: <CustomIcon />,
    description: 'Custom node description',
  },
];
```

### Styling Customization

The application uses Tailwind CSS for styling. You can customize:

- **Colors**: Edit the color palette in `tailwind.config.js`
- **Node styles**: Modify styles in `TextMessageNode.tsx`
- **Global styles**: Update `globals.css` for React Flow customizations
- **Animations**: Customize transitions and animations in the component files

### Adding Custom Edges

1. **Create edge component** in `src/components/edges/`:
```typescript
const CustomEdge: React.FC<EdgeProps> = (props) => {
  // Your edge implementation
  return <BaseEdge {...props} />;
};
```

2. **Register edge type** in `FlowBuilder.tsx`:
```typescript
const edgeTypes = {
  custom: CustomEdge,
  newEdgeType: NewCustomEdge,
};
```

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Dependencies

- **React Flow**: Flow visualization and interaction
- **Lucide React**: Modern icon library
- **Tailwind CSS**: Utility-first CSS framework
- **Next.js**: React framework with TypeScript support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is created for educational purposes and as a demonstration of modern React/Next.js development practices.

## Support

For questions or issues, please:
1. Check the existing documentation
2. Look at the code comments for implementation details
3. Review the React Flow documentation for advanced features
4. Create an issue with detailed information about your problem

## Acknowledgments

- Built with React Flow for professional flow visualization
- Inspired by modern chatbot builder interfaces
- Uses Tailwind CSS for responsive design
- Icons provided by Lucide React
