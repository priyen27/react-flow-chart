import { memo, useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
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

const initialSections = [
  { id: 'hero', title: 'Hero' },
  { id: 'features', title: 'Features' },
  { id: 'testimonials', title: 'Testimonials' },
  { id: 'cta', title: 'CTA' },
  { id: 'footer', title: 'Footer' },
];

const SortableItem = memo(({ id, title }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-2 mb-2 rounded shadow-md cursor-move hover:bg-gray-50 transition-colors duration-200"
      {...attributes}
      {...listeners}
    >
      {title}
    </div>
  );
});

const HomeNode = ({ data, id }) => {
  const [sections, setSections] = useState(data?.sections || initialSections);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Update data when sections change
  useEffect(() => {
    if (data) {
      data.sections = sections;
    }
  }, [sections, data]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id && over) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragStart = (event) => {
    const isDraggingSection = sections.some(section => section.id === event.active.id);
    if (isDraggingSection) {
      event.stopPropagation();
    }
  };

  return (
    <div 
      className={`px-4 py-2 rounded-md border-2 min-w-[200px] ${nodes.home.bg} ${nodes.home.border} ${nodes.home.shadow}`}
      onPointerDown={(e) => {
        if (e.target.closest('.sortable-section')) {
          e.stopPropagation();
        }
      }}
    >
      <Handle type="target" position={Position.Top} className="w-16 !bg-blue-500" />
      <div className="font-bold text-lg mb-2 cursor-move text-blue-900">Home</div>
      <div className="text-sm text-gray-600 mb-2">Drag to reorder sections:</div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="sortable-section">
            {sections.map((section) => (
              <SortableItem key={section.id} {...section} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-blue-500" />
    </div>
  );
};

export default memo(HomeNode); 