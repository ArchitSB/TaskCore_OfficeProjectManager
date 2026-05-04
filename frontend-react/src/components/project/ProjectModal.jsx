import { useEffect, useRef } from 'react';

export function ProjectModal({
  isOpen,
  title,
  fields, // Array of { name, label, type, required }
  form,
  onChange,
  onSubmit,
  onClose,
  isSubmitting,
  submitLabel = 'Submit',
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
          <h2 className="text-lg font-bold text-slate-100">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-[#1B2430]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="space-y-md" onSubmit={onSubmit}>
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1" htmlFor={`field-${field.name}`}>
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={`field-${field.name}`}
                  name={field.name}
                  value={form[field.name] || ''}
                  onChange={onChange}
                  rows={4}
                  className="w-full bg-[#0F1722] border border-[#2A3441] rounded px-md py-sm text-slate-100 resize-none"
                  required={field.required}
                />
              ) : field.type === 'select' ? (
                <select
                  id={`field-${field.name}`}
                  name={field.name}
                  value={form[field.name] || ''}
                  onChange={onChange}
                  className="w-full bg-[#0F1722] border border-[#2A3441] rounded px-md py-sm text-slate-100"
                  required={field.required}
                >
                  <option value="">Select...</option>
                  {(field.options || []).map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={`field-${field.name}`}
                  type={field.type || 'text'}
                  name={field.name}
                  value={form[field.name] || ''}
                  onChange={onChange}
                  className="w-full bg-[#0F1722] border border-[#2A3441] rounded px-md py-sm text-slate-100"
                  required={field.required}
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-sm pt-sm">
            <button
              type="button"
              onClick={onClose}
              className="px-md py-sm rounded border border-[#2A3441] text-slate-200 hover:bg-[#1B2430]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-md py-sm rounded bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400 disabled:opacity-60"
            >
              {isSubmitting ? 'Saving...' : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
