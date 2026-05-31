import { useState, useRef } from 'react';
import { useResume } from '@/context/ResumeContext';
import type { ModuleKey } from '@/types/resume';
import { GripVertical, Eye, EyeOff, Scissors } from 'lucide-react';

export default function ModuleTabs() {
  const { data, activeModule, setActiveModule, renameModule, toggleModuleVisibility, updateModuleOrder, togglePageBreak } = useResume();
  const [editingKey, setEditingKey] = useState<ModuleKey | null>(null);
  const [editValue, setEditValue] = useState('');
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleDoubleClick = (key: ModuleKey, currentName: string) => {
    setEditingKey(key);
    setEditValue(currentName);
  };

  const handleRenameSubmit = () => {
    if (editingKey && editValue.trim()) {
      renameModule(editingKey, editValue.trim());
    }
    setEditingKey(null);
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    setDropIndex(index);
  };

  const handleDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null);
      setDropIndex(null);
      return;
    }
    const newOrder = [...data.moduleOrder];
    const [removed] = newOrder.splice(dragIndex, 1);
    newOrder.splice(index, 0, removed);
    updateModuleOrder(newOrder);
    setDragIndex(null);
    setDropIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDropIndex(null);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="text-[10px] text-[#555] font-mono uppercase tracking-wider px-1 mb-1">模块（拖拽排序）</div>
      <div ref={tabsRef} className="flex flex-col gap-1">
        {data.moduleOrder.map((module, index) => {
          const isActive = module.key === activeModule;
          const isEditing = editingKey === module.key;
          const isDragging = dragIndex === index;

          return (
            <div
              key={module.key}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={`
                group flex items-center gap-1.5 rounded cursor-pointer select-none
                transition-all duration-150 text-xs h-8 px-2 relative
                ${isDragging ? 'opacity-40' : ''}
                ${isActive && !isDragging ? 'bg-[#1a1a1a] text-[#f0f0f0]' : 'text-[#808080] hover:bg-[#141414] hover:text-[#ccc]'}
              `}
              onClick={() => module.visible && setActiveModule(module.key)}
            >
              {dropIndex === index && dragIndex !== null && dragIndex !== index && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white rounded-full" />
              )}

              <GripVertical className="w-3 h-3 opacity-30 group-hover:opacity-60 cursor-grab shrink-0" />

              <span className="w-4 h-4 rounded bg-[#2a2a2a] flex items-center justify-center text-[9px] font-mono shrink-0 uppercase">
                {module.key[0]}
              </span>

              {isEditing ? (
                <input
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={handleRenameSubmit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRenameSubmit();
                    if (e.key === 'Escape') setEditingKey(null);
                  }}
                  className="bg-transparent border border-[#fff] rounded px-1 py-0.5 text-xs text-[#f0f0f0] outline-none flex-1 min-w-0"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <span
                  className="flex-1 min-w-0 truncate"
                  onDoubleClick={() => handleDoubleClick(module.key, module.name)}
                  title="双击重命名"
                >
                  {module.name}
                </span>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePageBreak(module.key);
                }}
                className={`opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:text-[#f0f0f0] ${module.pageBreakBefore ? 'text-[#f0a030] opacity-100' : ''}`}
                title={module.pageBreakBefore ? '取消在此模块前分页' : '在此模块前分页'}
              >
                <Scissors className="w-3 h-3" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleModuleVisibility(module.key);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:text-[#f0f0f0]"
                title={module.visible ? '隐藏模块' : '显示模块'}
              >
                {module.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
