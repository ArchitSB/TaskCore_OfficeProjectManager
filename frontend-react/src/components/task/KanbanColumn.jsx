import { useEffect, useRef, useState } from 'react';
import { TaskCard } from './TaskCard';

export function KanbanColumn({
  title,
  columnId,
  count,
  tasks,
  status,
  onDropTask,
  onDragStartTask,
  onClearTasks,
  activeDropdownStatus,
  setActiveDropdownStatus,
  badgeColor = 'bg-slate-800 text-slate-400',
  isAdmin = false,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuContainerRef = useRef(null);
  
  // Local state for inline renaming
  const [isEditingColumnName, setIsEditingColumnName] = useState(false);
  const [columnName, setColumnName] = useState(title);
  const [tempName, setTempName] = useState(title);

  const handleDrop = (event) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/task-id');

    if (taskId && typeof onDropTask === 'function') {
      onDropTask(taskId, status);
    }
  };

  useEffect(() => {
    if (activeDropdownStatus !== status && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [activeDropdownStatus, isMenuOpen, status]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleOutsideClick = (event) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        if (typeof setActiveDropdownStatus === 'function') {
          setActiveDropdownStatus(null);
        }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuOpen, setActiveDropdownStatus]);

  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);

    if (typeof setActiveDropdownStatus === 'function') {
      setActiveDropdownStatus(nextState ? status : null);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    if (typeof setActiveDropdownStatus === 'function') {
      setActiveDropdownStatus(null);
    }
  };

  const resolvedColumnId = columnId || status;

  const handleRename = () => {
    setTempName(columnName);
    setIsEditingColumnName(true);
    closeMenu();
  };

  const handleClearTasks = () => {
    console.log('Clear all tasks clicked', resolvedColumnId);
    if (typeof onClearTasks === 'function') {
      onClearTasks(status);
    }
    closeMenu();
  };

  const handleSort = () => {
    console.log('Sort tasks clicked', resolvedColumnId);
    closeMenu();
  };

  return (
    <div
      className={`space-y-lg ${title === 'Done' ? 'opacity-80' : ''}`}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between px-xs">
        <div className="flex items-center gap-sm">
          {isEditingColumnName ? (
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={() => {
                setColumnName(tempName);
                setIsEditingColumnName(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setColumnName(tempName);
                  setIsEditingColumnName(false);
                } else if (e.key === 'Escape') {
                  setTempName(columnName);
                  setIsEditingColumnName(false);
                }
              }}
              autoFocus
              className="font-h3 text-h3 text-slate-100 bg-transparent border-b border-amber-500 outline-none w-full"
            />
          ) : (
            <h3 className="font-h3 text-h3 text-slate-100">{columnName}</h3>
          )}
          <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${badgeColor}`}>
            {count}
          </span>
        </div>
        {isAdmin && (
          <div className="relative" ref={menuContainerRef}>
            <button
              type="button"
              onClick={toggleMenu}
              className="p-1 text-slate-500 hover:text-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined">more_horiz</span>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded border border-[#2A3441] bg-[#121821] shadow-lg z-20 py-1">
                <button
                  type="button"
                  onClick={() => handleRename()}
                  className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-[#1B2430] transition-colors"
                >
                  Rename Column
                </button>
                <button
                  type="button"
                  onClick={() => handleClearTasks()}
                  className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-[#1B2430] transition-colors"
                >
                  Clear All Tasks
                </button>
                <button
                  type="button"
                  onClick={() => handleSort()}
                  className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-[#1B2430] transition-colors"
                >
                  Sort Tasks
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="space-y-md min-h-[80px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDragStartTask={onDragStartTask} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
}
