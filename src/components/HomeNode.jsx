import { memo, useState, useEffect, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { nodes } from '../theme/index';
import { useTheme } from '../theme/ThemeContext';

const initialSections = [
  { id: 'hero', title: 'Hero' },
  { id: 'features', title: 'Features' },
  { id: 'testimonials', title: 'Testimonials' },
  { id: 'cta', title: 'CTA' },
  { id: 'footer', title: 'Footer' },
];

const SortableItem = memo(({ id, title, isDark }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative',
    zIndex: isDragging ? 999 : 0,
    touchAction: 'none',
    userSelect: 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-2 mb-2 rounded shadow-md transition-colors duration-200 ${
        isDark 
          ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' 
          : 'bg-white hover:bg-gray-50 text-gray-900'
      }`}
      {...attributes}
      {...listeners}
    >
      {title}
    </div>
  );
});

const HomeNode = ({ data, id }) => {
  const [activeId, setActiveId] = useState(null);
  const [localSections, setLocalSections] = useState(data?.sections || initialSections);
  const nodeRef = useRef(null);
  const { isDark } = useTheme();
  const theme = nodes.home[isDark ? 'dark' : 'light'];

  useEffect(() => {
    if (data?.sections) {
      setLocalSections(data.sections);
    }
  }, [data?.sections]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = localSections.findIndex((item) => item.id === active.id);
      const newIndex = localSections.findIndex((item) => item.id === over.id);
      
      const newSections = arrayMove([...localSections], oldIndex, newIndex);
      setLocalSections(newSections);
      if (typeof data?.onChange === 'function') {
        data.onChange({ sections: newSections });
      }
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleNodeClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      ref={nodeRef}
      className={`px-4 py-2 rounded-md border-2 min-w-[200px] ${theme.bg} ${theme.border} ${theme.shadow}`}
      onClick={handleNodeClick}
    >
      <Handle type="target" position={Position.Top} className="w-16 !bg-blue-500" />
      <div className={`font-bold text-lg mb-2 ${theme.text}`}>Home</div>
      <div className={`text-sm mb-2 ${theme.text} opacity-80`}>Drag to reorder sections:</div>
      <div className="sortable-container" onClick={(e) => e.stopPropagation()}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={localSections.map(s => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="sortable-section">
              {localSections.map((section) => (
                <SortableItem 
                  key={section.id} 
                  {...section}
                  isDark={isDark}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <div className={`p-2 rounded shadow-lg border-2 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-gray-100' 
                  : 'bg-white border-blue-500 text-gray-900'
              }`}>
                {localSections.find(section => section.id === activeId)?.title}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-blue-500" />
    </div>
  );
};

export default memo(HomeNode); 