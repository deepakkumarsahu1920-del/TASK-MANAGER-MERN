import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const emptyForm = { title: '', description: '', priority: 'Medium', dueDate: '', completed: false };

const TaskModal = ({ task, onClose, onSave }) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'Medium',
        dueDate: task.dueDate ? task.dueDate.substring(0, 10) : '',
        completed: task.completed || false
      });
    } else {
      setForm(emptyForm);
    }
  }, [task]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <FiX size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4">{task ? 'Edit Task' : 'New Task'}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
          />

          <div className="flex gap-3">
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="flex-1 border rounded-md px-3 py-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="flex-1 border rounded-md px-3 py-2"
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.completed}
              onChange={(e) => setForm({ ...form, completed: e.target.checked })}
            />
            Completed
          </label>

          <button type="submit" className="bg-primary text-white rounded-md py-2 mt-2 hover:opacity-90">
            {task ? 'Update Task' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
