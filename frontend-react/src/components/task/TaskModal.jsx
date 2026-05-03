import { useEffect, useRef } from 'react';

export function TaskModal({
  isOpen,
  mode,
  form,
  onChange,
  onSubmit,
  onClose,
  isSubmitting,
  tasks,
  selectedTaskId,
  onSelectTask,
}) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const heading = mode === 'edit' ? 'Edit Task' : 'New Task';

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-md"
      onMouseDown={(event) => {
        if (event.target === overlayRef.current) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg rounded-xl border border-[#2A3441] bg-[#121821] p-lg shadow-2xl">
        <div className="flex items-center justify-between mb-md">
          <h2 className="text-lg font-bold text-slate-100">{heading}</h2>
          <button
            type="button"
            onClick={() => onClose()}
            className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-[#1B2430]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="space-y-md" onSubmit={onSubmit}>
          {mode === 'edit' && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Task</label>
              <select
                value={selectedTaskId}
                onChange={(event) => onSelectTask(event.target.value)}
                className="w-full bg-[#0F1722] border border-[#2A3441] rounded px-md py-sm text-slate-100"
              >
                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1" htmlFor="task-title">Title</label>
            <input
              id="task-title"
              name="title"
              value={form.title}
              onChange={onChange}
              className="w-full bg-[#0F1722] border border-[#2A3441] rounded px-md py-sm text-slate-100"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1" htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              name="description"
              value={form.description}
              onChange={onChange}
              rows={4}
              className="w-full bg-[#0F1722] border border-[#2A3441] rounded px-md py-sm text-slate-100 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1" htmlFor="task-priority">Priority</label>
              <select
                id="task-priority"
                name="priority"
                value={form.priority}
                onChange={onChange}
                className="w-full bg-[#0F1722] border border-[#2A3441] rounded px-md py-sm text-slate-100"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1" htmlFor="task-due-date">Due Date</label>
              <input
                id="task-due-date"
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={onChange}
                className="w-full bg-[#0F1722] border border-[#2A3441] rounded px-md py-sm text-slate-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-sm pt-sm">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-md py-sm rounded border border-[#2A3441] text-slate-200 hover:bg-[#1B2430]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-md py-sm rounded bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400 disabled:opacity-60"
            >
              {isSubmitting ? 'Saving...' : mode === 'edit' ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
