import { useCallback, useEffect, useState } from 'react';
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
import { buttons } from '../theme/index';

const nodeTypes = {
  home: HomeNode,
};

const FlowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { showNotification, NotificationContainer } = useNotification();
  const [savedLayout, setSavedLayout] = useLocalStorage('page-hierarchy', null);

  useEffect(() => {
    if (isFirstLoad) {
      const initialNodes = getInitialNodes();
      const initialEdges = getInitialEdges();
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        initialNodes,
        initialEdges
      );
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      setIsFirstLoad(false);

      if (savedLayout) {
        try {
          const { nodes: savedNodes, edges: savedEdges, homeSections } = savedLayout;
          const updatedNodes = savedNodes.map(node => {
            if (node.id === 'home') {
              return {
                ...node,
                data: {
                  ...node.data,
                  sections: homeSections
                }
              };
            }
            return node;
          });
          setNodes(updatedNodes);
          setEdges(savedEdges);
        } catch (error) {
          console.error('Error loading saved layout:', error);
          showNotification('Error loading saved layout!', 'error');
        }
      }
    }
  }, [setNodes, setEdges, isFirstLoad, savedLayout, showNotification]);

  const onSave = useCallback(() => {
    const homeNode = nodes.find(node => node.id === 'home');
    const dataToSave = {
      nodes,
      edges,
      homeSections: homeNode?.data?.sections || []
    };
    setSavedLayout(dataToSave);
    showNotification('Changes saved successfully!', 'success');
  }, [nodes, edges, setSavedLayout, showNotification]);

  const onLoad = useCallback(() => {
    try {
      if (savedLayout) {
        const { nodes: savedNodes, edges: savedEdges, homeSections } = savedLayout;
        
        const updatedNodes = savedNodes.map(node => {
          if (node.id === 'home') {
            return {
              ...node,
              data: {
                ...node.data,
                sections: homeSections
              }
            };
          }
          return node;
        });

        setNodes(updatedNodes);
        setEdges(savedEdges);
        showNotification('Layout loaded successfully!', 'success');
      } else {
        showNotification('No saved layout found!', 'info');
      }
    } catch (error) {
      console.error('Error loading saved layout:', error);
      showNotification('Error loading saved layout!', 'error');
    }
  }, [setNodes, setEdges, savedLayout, showNotification]);

  const onExport = useCallback(() => {
    const homeNode = nodes.find(node => node.id === 'home');
    const exportData = {
      nodes,
      edges,
      homeSections: homeNode?.data?.sections || []
    };
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'page-hierarchy.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification('Layout exported successfully!', 'success');
  }, [nodes, edges, showNotification]);

  const onReset = useCallback(() => {
    const initialNodes = getInitialNodes();
    const initialEdges = getInitialEdges();
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes,
      initialEdges
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    showNotification('Layout reset to default!', 'info');
  }, [setNodes, setEdges, showNotification]);

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
      >
        <Background />
        <Controls />
        <Panel position="top-right" className="flex gap-2">
          <button
            onClick={onSave}
            className={`${buttons.base} ${buttons.primary}`}
          >
            Save
          </button>
          <button
            onClick={onLoad}
            className={`${buttons.base} ${buttons.success}`}
          >
            Load
          </button>
          <button
            onClick={onExport}
            className={`${buttons.base} ${buttons.secondary}`}
          >
            Export
          </button>
          <button
            onClick={onReset}
            className={`${buttons.base} ${buttons.danger}`}
          >
            Reset
          </button>
        </Panel>
      </ReactFlow>
      <NotificationContainer />
    </div>
  );
};

export default FlowEditor; 