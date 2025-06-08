import { useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { getLayoutedElements, getInitialNodes, getInitialEdges } from '../utils/layout';
import HomeNode from './HomeNode';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNotification } from '../hooks/useNotification';
import { useTheme } from '../theme/ThemeContext';
import Button from './common/Button';

const nodeTypes = {
  home: HomeNode,
};

const updateHomeNodeSections = (nodes, homeSections) => {
  return nodes.map(node => {
    if (node.id === 'home') {
      return {
        ...node,
        data: {
          ...node.data,
          sections: homeSections,
          onChange: () => {}
        }
      };
    }
    return node;
  });
};

const getLayoutData = (nodes, edges) => {
  const homeNode = nodes.find(node => node.id === 'home');
  return {
    nodes,
    edges,
    homeSections: homeNode?.data?.sections || []
  };
};

const FlowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { showNotification, NotificationContainer } = useNotification();
  const [savedLayout, setSavedLayout] = useLocalStorage('page-hierarchy', null);
  const { isDark, toggleTheme } = useTheme();

  const handleHomeNodeChange = (newSections) => {
    setNodes(nodes => 
      nodes.map(node => {
        if (node.id === 'home') {
          return {
            ...node,
            data: {
              ...node.data,
              sections: newSections,
              onChange: ({ sections }) => handleHomeNodeChange(sections)
            }
          };
        }
        return node;
      })
    );
  };

  useEffect(() => {
    try {
      if (savedLayout) {
        const { nodes: savedNodes, edges: savedEdges, homeSections } = savedLayout;
        const nodesWithHandlers = updateHomeNodeSections(savedNodes, homeSections).map(node => {
          if (node.id === 'home') {
            return {
              ...node,
              data: {
                ...node.data,
                onChange: ({ sections }) => handleHomeNodeChange(sections)
              }
            };
          }
          return node;
        });
        setNodes(nodesWithHandlers);
        setEdges(savedEdges);
      } else {
        const initialNodes = getInitialNodes();
        const initialEdges = getInitialEdges();
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
          initialNodes,
          initialEdges
        );
        const nodesWithHandlers = layoutedNodes.map(node => {
          if (node.id === 'home') {
            return {
              ...node,
              data: {
                ...node.data,
                onChange: ({ sections }) => handleHomeNodeChange(sections)
              }
            };
          }
          return node;
        });
        setNodes(nodesWithHandlers);
        setEdges(layoutedEdges);
      }
    } catch (error) {
      console.error('Error initializing layout:', error);
      showNotification('Error initializing layout!', 'error');
    }
  }, []);

  const onSave = () => {
    const layoutData = getLayoutData(nodes, edges);
    setSavedLayout(layoutData);
    showNotification('Changes saved successfully!', 'success');
  };

  const onLoad = () => {
    try {
      if (savedLayout) {
        const { nodes: savedNodes, edges: savedEdges, homeSections } = savedLayout;
        const nodesWithHandlers = updateHomeNodeSections(savedNodes, homeSections).map(node => {
          if (node.id === 'home') {
            return {
              ...node,
              data: {
                ...node.data,
                onChange: ({ sections }) => handleHomeNodeChange(sections)
              }
            };
          }
          return node;
        });
        setNodes(nodesWithHandlers);
        setEdges(savedEdges);
        showNotification('Layout loaded successfully!', 'success');
      } else {
        showNotification('No saved layout found!', 'info');
      }
    } catch (error) {
      console.error('Error loading saved layout:', error);
      showNotification('Error loading saved layout!', 'error');
    }
  };

  const onExport = () => {
    const layoutData = getLayoutData(nodes, edges);
    const jsonString = JSON.stringify(layoutData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    let link = null;
    
    try {
      link = document.createElement('a');
      link.href = url;
      link.download = 'page-hierarchy.json';
      document.body.appendChild(link);
      link.click();
      showNotification('Layout exported successfully!', 'success');
    } catch (error) {
      console.error('Error exporting layout:', error);
      showNotification('Error exporting layout!', 'error');
    } finally {
      URL.revokeObjectURL(url);
      if (link && link.parentNode) {
        link.parentNode.removeChild(link);
      }
    }
  };

  const onReset = () => {
    const initialNodes = getInitialNodes();
    const initialEdges = getInitialEdges();
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes,
      initialEdges
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    showNotification('Layout reset to default!', 'info');
  };

  return (
    <div className={`w-screen h-screen overflow-hidden relative ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        className={isDark ? 'bg-gray-900' : 'bg-gray-50'}
      >
        <Background />
        <Controls />
        <Panel position="top-right" className="flex gap-2">
          <Button onClick={toggleTheme} variant="theme" isDark={isDark}>
            {isDark ? '🌞' : '🌙'}
          </Button>
          <Button onClick={onSave} variant="primary">
            Save
          </Button>
          <Button onClick={onLoad} variant="success">
            Load
          </Button>
          <Button onClick={onExport} variant="secondary">
            Export
          </Button>
          <Button onClick={onReset} variant="danger">
            Reset
          </Button>
        </Panel>
      </ReactFlow>
      <NotificationContainer />
    </div>
  );
};

export default FlowEditor; 