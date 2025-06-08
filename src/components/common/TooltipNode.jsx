import { memo, useState } from 'react';
import { Handle, Position, NodeToolbar } from '@xyflow/react';
import { useTheme } from '../../theme/ThemeContext';
import { nodes as nodeStyles } from '../../theme/index';

const TooltipNode = ({ data, selected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isDark } = useTheme();
  const theme = nodeStyles.child[isDark ? 'dark' : 'light'];

  return (
    <>
      <NodeToolbar
        isVisible={isHovered}
        position={Position.Top}
        className="px-2 py-1 text-sm text-white bg-gray-800 rounded shadow-lg"
      >
        {data.label}
      </NodeToolbar>

      <div 
        className={`px-4 py-2 rounded-md border-2 ${theme.bg} ${theme.border} ${theme.shadow}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Handle type="target" position={Position.Top} className="w-16 !bg-blue-500" />
        <div className={`font-bold text-lg ${theme.text}`}>{data.label}</div>
        <Handle type="source" position={Position.Bottom} className="w-16 !bg-blue-500" />
      </div>
    </>
  );
};

export default memo(TooltipNode); 